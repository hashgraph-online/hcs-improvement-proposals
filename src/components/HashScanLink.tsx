import React from 'react';
import { PrimaryButton } from './ui/primary-button';
import { FaExternalLinkAlt } from 'react-icons/fa';

type HashScanLinkProps = {
  type: 'token' | 'topic' | 'transaction' | 'account';
  id: string;
  network?: 'mainnet' | 'testnet';
  serialNumber?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

export const HashScanLink: React.FC<HashScanLinkProps> = ({
  type,
  id,
  network = 'testnet',
  serialNumber,
  label,
  variant = 'outline',
  size = 'sm',
}) => {
  const getUrl = () => {
    const baseUrl = `https://hashscan.io/${network}`;
    
    switch (type) {
      case 'token':
        return serialNumber 
          ? `${baseUrl}/token/${id}/${serialNumber}`
          : `${baseUrl}/token/${id}`;
      case 'topic':
        return `${baseUrl}/topic/${id}`;
      case 'transaction':
        return `${baseUrl}/transaction/${id}`;
      case 'account':
        return `${baseUrl}/account/${id}`;
      default:
        return baseUrl;
    }
  };

  const getLabel = () => {
    if (label) return label;
    
    switch (type) {
      case 'token':
        return serialNumber ? `View NFT #${serialNumber}` : 'View Token';
      case 'topic':
        return 'View Inscribed Data';
      case 'transaction':
        return 'View Transaction';
      case 'account':
        return 'View Account';
      default:
        return 'View on HashScan';
    }
  };

  return (
    <PrimaryButton
      href={getUrl()}
      isExternal={true}
      variant={variant}
      size={size}
      icon={<FaExternalLinkAlt className="ml-2" />}
    >
      {getLabel()}
    </PrimaryButton>
  );
};