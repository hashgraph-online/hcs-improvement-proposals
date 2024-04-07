
const axios = require('axios');
const fs = require('fs');
const {decompress} = require('@mongodb-js/zstd');
const { Buffer } = require('buffer');
const crypto = require('crypto');

const GRAPHQL_ENDPOINT = 'https://mainnet.hedera.api.hgraph.dev/v1/graphql';

// Function to fetch memo from the blockchain
async function fetchMemo(tokenId) {
    const topicId = tokenId.split('hcs://1/0.0.')[1]; // Assuming topicId is in the format hcs://1/0.0.12345

    const query = `
    query {
        entity(where: {id: {_eq: "${topicId}"}}) {
            memo
        }
    }`;

    try {
        const response = await axios.post(
            GRAPHQL_ENDPOINT,
            { query },
            {
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer x`,
            },
            }
        );
        const memo = response.data.data.entity[0]?.memo;
        if (memo) {
            return memo.split(':');
        }
        return null;
    } catch (error) {
        console.error('Error fetching memo:', error);
        return null;
    }
}

// Validate file data against memo information
function isValidFileData(memoInfo, fileData) {
    if (memoInfo[1] !== 'zstd' || memoInfo[2] !== 'base64') {
        return false; // Unsupported compression or encoding
    }
    const hash = crypto.createHash('sha256').update(fileData).digest('hex');
    return memoInfo[0] === hash;
}

function hex2a(hexx) {
    let hex = hexx.toString();//force conversion
    hex = hex.split('\\x')[1]
    let str = '';
    for (let i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
// Main function to perform NFT queries and validate them
async function queryAndValidateNFTs() {
    let allValidNFTs = [];
    let allInvalidNFTs = [];
    let lastTimestamp = "1709654845655072003";
    let hasMore = true;
    let queries = 0

    while (hasMore) {
        queries++
        console.log(queries)
        const query = `
        query NftQuery {
            nft(where: {created_timestamp: {_gte: "${lastTimestamp}"}}, limit: 1000,
            order_by: {created_timestamp: asc}) {
                token_id
                account_id
                metadata
                created_timestamp
                serial_number
            }
        }`;

        try {
            const response = await axios.post(GRAPHQL_ENDPOINT, { query }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer x`,
                },
            });

            const nfts = response.data.data.nft || [];
            hasMore = nfts.length === 1000

            if (hasMore) {
                lastTimestamp = nfts[nfts.length - 1].created_timestamp;
            }
            for (let index = 0; index < nfts.length; index++) {
                const nft = nfts[index];
                
                nft.metadata = hex2a(nft.metadata)
                if (!nft.metadata.startsWith('hcs://1/')) {
                    continue; // Skip NFTs not following the specific metadata pattern
                } 

                const memoInfo = await fetchMemo(nft.metadata);
                if (!memoInfo) {
                    allInvalidNFTs.push({...nft, reason: 'Invalid memo'});
                    continue;
                }

                // Assume fetchAndCombineChunks is a function you implement to get and combine message chunks from HCS
                const {fileData, mimetype, json, image} = await fetchAndCombineChunks(nft.metadata); // Implement this based on your application's logic
                if (isValidFileData(memoInfo, fileData) && image !== 'invalid') {
                    console.log("valid")
                    allValidNFTs.push({...nft, mimetype, json, image});
                    fs.writeFileSync('./filteredNFTs.json', JSON.stringify(allValidNFTs, null, 2));
                } else {
                    console.log("invalid", nft)
                    allInvalidNFTs.push({...nft, mimetype, json, image, reason: 'Data mismatch'});
                    fs.writeFileSync('./filteredIncorrectNFTs.json', JSON.stringify(allInvalidNFTs, null, 2));
                }
            }
        } catch (error) {
            console.error('Error querying or validating NFTs:', error);
            break;
        }
    }
    // Save the valid and invalid NFT metadata to separate files
    fs.writeFileSync('./filteredNFTs.json', JSON.stringify(allValidNFTs, null, 2));
    fs.writeFileSync('./filteredIncorrectNFTs.json', JSON.stringify(allInvalidNFTs, null, 2));
    console.log(`Filtered NFT metadata saved to ./filteredNFTs.json and ./filteredIncorrectNFTs.json`);
}

// Execute the function
queryAndValidateNFTs();


// Function to fetch, combine, and decode message chunks from HCS
async function fetchAndCombineChunks(metadata) {
    // Extract topicId from metadata, assuming metadata is like 'hcs://1/0.0.12345'
    const topicId = metadata.split('hcs://1/0.0.')[1];

    // Fetch all chunks from the HCS topic
    const base64Data = await fetchHCSMessages(topicId);

    // Ensure the combined data is Base64 decoded to a Buffer before decompression
    const combinedData = Buffer.from(base64Data.split('base64,')[1], 'base64');
    
    // Decompress the combined data using zstd
    try {
        const decompressedData = await decompress(combinedData);        
        
        const json = JSON.parse(decompressedData.toString());
        const image = json.image || 'invalid'; 
        
        // Set mimetype based on the decoded JSON's attribute of type, if present
        const mimetype = json.type || 'unknown'; // Default to 'unknown' if type is not present
        
        return {fileData:decompressedData, mimetype, json, image}; // This is a Buffer containing the decompressed data
    } catch (error) {
        console.error('Error decompressing data:', error);
        throw new Error('Failed to decompress data');
    }
}



async function fetchHCSMessages(topicId) {
    let lastSequenceNumber = 0; // Start with no sequence number
    let allMessages = [];
    let hasMore = true;

    while (hasMore) {
        const query = `
        query MyQuery {
            topic_message(
                where: {topic_id: {_eq: "${topicId}"}, sequence_number: {_gte: "${lastSequenceNumber}"}}
                order_by: {sequence_number: asc}
                limit: 10000
            ) {
                message
                sequence_number
            }
        }`;

        try {
            const response = await axios.post(
                GRAPHQL_ENDPOINT,
                { query: query },
                {  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer x`,
                }}
            );

            const messages = response.data.data.topic_message;

            // Check if we received less than the limit, indicating we've reached the end
            hasMore = messages.length === 10000;

            // Process each message and add to the allMessages array
            messages.forEach(item => {
                const messageAscii = Buffer.from(item.message.substring(2), 'hex').toString(); // Convert hex to ASCII
                const messageJson = JSON.parse(messageAscii); // Parse ASCII string to JSON
                allMessages.push(messageJson);
            });

            // Update lastSequenceNumber for next iteration
            if (messages.length > 0) {
                lastSequenceNumber = messages[messages.length - 1].sequence_number + 1; // +1 to move to the next sequence
            }

        } catch (error) {
            console.error('Error fetching HCS messages:', error);
            throw error;
        }
    }

    // Sort allMessages by their 'o' (order index) property
    allMessages.sort((a, b) => a.o - b.o);

    // Concatenate the 'c' (content) of each message into a single string
    const combinedData = allMessages.reduce((acc, message) => acc + message.c, '');
    
    return combinedData;
}