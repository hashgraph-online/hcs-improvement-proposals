// Re-export components for easy use in MDX files
export { HashScanLink } from './HashScanLink';
export { HashScanViewer } from './HashScanViewer';
export { ExternalLink } from './ExternalLink';
export { PrimaryButton } from './ui/primary-button';

// Quick access components for common use cases
import React from 'react';
import { HashScanLink } from './HashScanLink';
import { ExternalLink } from './ExternalLink';

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
  <ExternalLink href={href} type="github" variant="outline" size="sm">
    {children}
  </ExternalLink>
);

export const DiscordLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <ExternalLink href={href} type="discord" variant="outline" size="sm">
    {children}
  </ExternalLink>
);

export const DocsLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <ExternalLink href={href} type="docs" variant="outline" size="sm">
    {children}
  </ExternalLink>
);