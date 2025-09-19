import React, { useState } from 'react';
import { HashScanLink } from './HashScanLink';
import { FaCheckCircle, FaExternalLinkAlt, FaCopy } from 'react-icons/fa';
import { cn } from '../lib/utils';

type HashScanViewerProps = {
  tokenId?: string;
  topicId?: string;
  serialNumber?: string;
  network?: 'mainnet' | 'testnet';
};

export const HashScanViewer: React.FC<HashScanViewerProps> = ({
  tokenId,
  topicId,
  serialNumber = '1',
  network = 'testnet',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const getHRL = () => topicId ? `hcs://1/${topicId}` : 'hcs://1/0.0.YOUR_TOPIC_ID';

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 my-6 bg-white dark:bg-gray-900">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        HashScan Quick Links
      </h3>
      
      <div className="space-y-4">
        {/* Token Info */}
        {tokenId && (
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Token ID</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {tokenId}
                </code>
                <button
                  onClick={() => handleCopy(tokenId, 'token')}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {copiedItem === 'token' ? <FaCheckCircle /> : <FaCopy />}
                </button>
              </div>
            </div>
            <HashScanLink
              type="token"
              id={tokenId}
              network={network}
              serialNumber={serialNumber}
              size="sm"
              variant="outline"
            />
          </div>
        )}

        {/* Topic Info */}
        {topicId && (
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">Topic ID (Inscribed Data)</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {topicId}
                </code>
                <button
                  onClick={() => handleCopy(topicId, 'topic')}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {copiedItem === 'topic' ? <FaCheckCircle /> : <FaCopy />}
                </button>
              </div>
            </div>
            <HashScanLink
              type="topic"
              id={topicId}
              network={network}
              size="sm"
              variant="outline"
            />
          </div>
        )}

        {/* HRL Display */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hashinal Reference Locator (HRL)</p>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono bg-white dark:bg-gray-800 px-3 py-2 rounded flex-1">
              {getHRL()}
            </code>
            <button
              onClick={() => handleCopy(getHRL(), 'hrl')}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
            >
              {copiedItem === 'hrl' ? <FaCheckCircle /> : <FaCopy />}
            </button>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            On-Chain Verification
          </p>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>NFT token created on Hedera</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>Image data inscribed on-chain</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>Metadata stored permanently</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>No external dependencies (IPFS-free)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HashScanViewer;