import React from 'react';
import { PrimaryButton } from './ui/primary-button';
import { FaExternalLinkAlt, FaGithub, FaDiscord, FaBook } from 'react-icons/fa';

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  type?: 'default' | 'github' | 'discord' | 'docs';
};

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  variant = 'outline',
  size = 'sm',
  showIcon = true,
  type = 'default',
}) => {
  const getIcon = () => {
    if (!showIcon) return null;
    
    switch (type) {
      case 'github':
        return <FaGithub className="ml-2" />;
      case 'discord':
        return <FaDiscord className="ml-2" />;
      case 'docs':
        return <FaBook className="ml-2" />;
      default:
        return <FaExternalLinkAlt className="ml-2" />;
    }
  };

  return (
    <PrimaryButton
      href={href}
      isExternal={true}
      variant={variant}
      size={size}
      icon={getIcon()}
    >
      {children}
    </PrimaryButton>
  );
};



