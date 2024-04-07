const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const { decompress } = require('@mongodb-js/zstd');
const { Buffer } = require('buffer');
const crypto = require('crypto');
const fs = require('fs');

// Initialize Supabase client
const SUPABASE_URL = 'https://x.supabase.co';
const SUPABASE_KEY = 'your-key-here'; // Ensure to replace 'your-key-here' with your actual Supabase key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GRAPHQL_ENDPOINT = 'https://mainnet.hedera.api.hgraph.dev/v1/graphql';

// Main function to fetch and update NFTs
async function fetchAndUpdateNFTs() {
  try {
    console.log("Process initiated");
    let { data: lastInscription, error: lastInscriptionError } = await fetchLastInscription();

    if (lastInscriptionError) throw lastInscriptionError;

    let { lastTimestamp, lastInscriptionNumber } = extractInscriptionDetails(lastInscription);
    let allFilteredMetadata = await fetchAllFilteredMetadata(lastTimestamp);

    // Sort metadata by timestamp and serial number for processing
    sortFilteredMetadata(allFilteredMetadata);

    // Process each NFT metadata
    await processNFTMetadata(allFilteredMetadata, lastInscriptionNumber);

    console.log('Data upload complete');
  } catch (error) {
    console.error('Error in fetching and updating NFTs:', error);
  }
}

// Fetches the last inscription details from the database
async function fetchLastInscription() {
  return supabase
    .from('validated_inscription_numbers')
    .select('created_timestamp, inscription_number')
    .order('created_timestamp', { ascending: false })
    .order('inscription_number', { ascending: false })
    .limit(1);
}

// Extracts the timestamp and inscription number from the last inscription
function extractInscriptionDetails(lastInscription) {
  let lastTimestamp = lastInscription.length > 0 ? lastInscription[0].created_timestamp : "1708752400000000000";
  let lastInscriptionNumber = lastInscription.length > 0 ? lastInscription[0].inscription_number : 0;
  return { lastTimestamp, lastInscriptionNumber };
}

// Fetches all NFT metadata filtered by a timestamp
async function fetchAllFilteredMetadata(lastTimestamp) {
  let hasMore = true;
  let allFilteredMetadata = [];
  let lastTimestampUpdated = parseInt(lastTimestamp) + 4000;

  while (hasMore) {
    const response = await fetchNFTs(lastTimestampUpdated);
    const nfts = response.data.data.nft || [];
    hasMore = nfts.length === 1000;
    if (hasMore) {
      lastTimestampUpdated = nfts[nfts.length - 1].created_timestamp;
    }

    const filteredNFTs = filterAndFormatNFTs(nfts);
    allFilteredMetadata.push(...filteredNFTs);
  }

  return allFilteredMetadata;
}

// Fetches NFTs filtered by a specific timestamp
async function fetchNFTs(lastTimestampUpdated) {
  const query = `
    query MyQuery {
      nft(where: {created_timestamp: {_gt: "${lastTimestampUpdated}"}}, limit: 1000, order_by: {created_timestamp: asc}) {
        token_id
        account_id
        metadata
        created_timestamp
        serial_number
      }
    }`;

  return axios.post(GRAPHQL_ENDPOINT, { query }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer your-auth-token` // Replace 'your-auth-token' with your actual token
    }
  });
}

// Filters and formats NFT metadata
function filterAndFormatNFTs(nfts) {
  return nfts.map(nft => {
    const asciiMetadata = nft.metadata.startsWith('\\x') ? Buffer.from(nft.metadata.substring(2), 'hex').toString() : nft.metadata;
    nft.created_timestamp = String(nft.created_timestamp);
    return { ...nft, metadata: asciiMetadata };
  }).filter(nft => nft.metadata.startsWith('hcs://1/'));
}

// Sorts filtered metadata by created_timestamp and serial_number
function sortFilteredMetadata(allFilteredMetadata) {
  allFilteredMetadata.sort((a, b) => {
    const timestampA = a.created_timestamp;
    const timestampB = b.created_timestamp;
    return timestampA !== timestampB ? timestampA - timestampB : parseInt(a.serial_number) - parseInt(b.serial_number);
  });
}

// Processes each NFT metadata for uploading
async function processNFTMetadata(allFilteredMetadata, lastInscriptionNumber) {
  for (let index = 0; index < allFilteredMetadata.length; index++) {
    const nft = allFilteredMetadata[index];
    const memoInfo = await fetchMemo(nft.metadata);

    if (!memoInfo) {
      console.log('Invalid memo', nft);
      continue;
    }

    const { fileData, mimetype, json, image } = await fetchAndCombineChunks(nft.metadata);
    if (isValidFileData(memoInfo, fileData) && image !== 'invalid') {
      await uploadFormattedData(nft, lastInscriptionNumber, index, json, image, mimetype);
    }
  }
}

// Uploads formatted data to Supabase
async function uploadFormattedData(nft, lastInscriptionNumber, index, json, image, mimetype) {
  const formattedData = {
    p: "hcs-5",
    op: "register",
    t_id: nft.metadata.split("hcs://1/")[1],
    sn: nft.serial_number,
    ht_id: nft.token_id,
    json: json,
    image: image,
    mimetype: mimetype,
    account_id: nft.account_id,
    created_timestamp: nft.created_timestamp,
    inscription_number: lastInscriptionNumber + index + 1
  };

  const { error: uploadError } = await supabase.from('validated_inscription_numbers').upsert(formattedData);
  if (uploadError) throw uploadError;
}


// Function to fetch memo from the blockchain
async function fetchMemo(tokenId) {
  const topicId = tokenId.split('hcs://1/0.0.')[1]; // Assuming tokenId is in the format hcs://1/0.0.12345

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
              'Authorization': `Bearer X`,
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

// Initial execution and periodic update setup
fetchAndUpdateNFTs().catch(console.error);
setInterval(() => {
    fetchAndUpdateNFTs().catch(console.error);
}, 600000); // 10 minutes
