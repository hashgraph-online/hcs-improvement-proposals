import React from 'react';
import Link from '@docusaurus/Link';

// Simple fallback for HashScanLink
export const HashScanLink = ({ type, id, network = 'mainnet' }: any) => {
  const baseUrl = network === 'mainnet' ? 'https://hashscan.io/mainnet' : 'https://hashscan.io/testnet';
  const path = type === 'token' ? 'token' : type === 'topic' ? 'topic' : 'transaction';
  return <a href={`${baseUrl}/${path}/${id}`} target="_blank" rel="noopener noreferrer">{id}</a>;
};

export const HashScanViewer = () => null;

export const ExternalLink = ({ href, children, ...props }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
);

export { PrimaryButton } from './ui/primary-button';

export const ViewOnHashScan = ({ 
  tokenId, 
  topicId, 
  transactionId,
  network = 'testnet' 
}: {
  tokenId?: string;
  topicId?: string;
  transactionId?: string;
  network?: 'mainnet' | 'testnet';
}) => {
  if (tokenId) {
    return <HashScanLink type="token" id={tokenId} network={network} />;
  }
  if (topicId) {
    return <HashScanLink type="topic" id={topicId} network={network} />;
  }
  if (transactionId) {
    return <HashScanLink type="transaction" id={transactionId} network={network} />;
  }
  return null;
};

export const GitHubLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <ExternalLink href={href}>
    {children}
  </ExternalLink>
);

export const DiscordLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <ExternalLink href={href}>
    {children}
  </ExternalLink>
);

export const DocsLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <ExternalLink href={href}>
    {children}
  </ExternalLink>
);



