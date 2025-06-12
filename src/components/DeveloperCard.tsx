import React from 'react';
import { FaGithub, FaBookOpen, FaDownload } from 'react-icons/fa';
import Typography from './Typography';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

interface DeveloperCardProps {
  title: string;
  description: string;
  language?: string;
  packageName?: string;
  githubUrl?: string;
  docsUrl?: string;
  npmDownloads?: string;
  className?: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  title,
  description,
  language = 'TypeScript',
  packageName,
  githubUrl,
  docsUrl,
  npmDownloads,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className='flex items-start justify-between mb-4'>
        <div>
          <Typography variant='h4' className='mb-2'>
            {title}
          </Typography>
          <div className='flex items-center space-x-2 mb-3'>
            <span className='px-2 py-1 bg-brand-blue bg-opacity-10 text-brand-blue rounded text-xs font-mono'>
              {language}
            </span>
            {npmDownloads && (
              <span className='px-2 py-1 bg-brand-green bg-opacity-10 text-brand-green rounded text-xs font-mono'>
                {npmDownloads} downloads
              </span>
            )}
          </div>
        </div>
      </div>

      <Typography variant='body2' className='text-gray-600 mb-6'>
        {description}
      </Typography>

      {packageName && (
        <div className='mb-6'>
          <Typography variant='caption' className='mb-2 block text-gray-500'>
            Installation:
          </Typography>
          <div className='bg-gray-50 rounded p-3'>
            <code className='text-sm font-mono text-brand-dark'>
              npm install {packageName}
            </code>
          </div>
        </div>
      )}

      <div className='flex flex-wrap gap-3'>
        {docsUrl && (
          <PrimaryButton href={docsUrl} size='small'>
            <FaBookOpen className='mr-2' size={14} />
            Documentation
          </PrimaryButton>
        )}
        {githubUrl && (
          <SecondaryButton href={githubUrl} className='text-sm py-2 px-4'>
            <FaGithub className='mr-2' size={14} />
            GitHub
          </SecondaryButton>
        )}
      </div>
    </div>
  );
};

export default DeveloperCard;
