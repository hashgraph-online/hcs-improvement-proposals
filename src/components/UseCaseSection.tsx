import React from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Link from '@docusaurus/Link';
import { useCases } from '../pages/use-cases';
import { GradientText, AnimatedBackground, StatusBadge } from './ui';
import { HashgraphConsensus } from './HashgraphConsensus';
import InteractiveShowcase, { ShowcaseItem } from './InteractiveShowcase';
import { Typography } from './ui';

interface UseCase extends ShowcaseItem {
  name: string;
  creator: string;
  description: string;
  tagline: string;
  link: string;
  image: string;
}

interface UseCaseMainContentProps {
  item: UseCase;
  index: number;
}

interface UseCaseSidebarItemProps {
  item: UseCase;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const UseCaseMainContent: React.FC<UseCaseMainContentProps> = ({
  item: useCase,
}) => (
  <div className='relative group'>
    <div className='absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000'></div>
    <div className='relative bg-white/95 dark:bg-gray-800/95 border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-3xl backdrop-blur-sm overflow-hidden'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-3/5 p-8 lg:p-12 space-y-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='text-xs font-mono text-gray-500 dark:text-gray-400'>
              <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
              {useCase.name.toLowerCase().replace(/\s+/g, '_')}
            </div>
            <StatusBadge variant='success'>LIVE</StatusBadge>
          </div>

          <div className='space-y-4'>
            <Typography variant='h3' className='leading-tight'>
              {useCase.name}
            </Typography>

            <div className='text-sm font-mono text-brand-purple'>
              by{' '}
              <span className='text-gray-900 dark:text-white'>
                {useCase.creator}
              </span>
            </div>

            <Typography color='muted' className='leading-relaxed'>
              {useCase.description}
            </Typography>

            <div className='bg-gray-100/80 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/30'>
              <div className='text-sm font-mono text-gray-700 dark:text-gray-300'>
                <div className='text-xs text-gray-500 dark:text-gray-400 mb-2'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  {useCase.tagline}
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <PrimaryButton href={useCase.link}>
              Visit {useCase.name}
            </PrimaryButton>
            <SecondaryButton>Next Application</SecondaryButton>
          </div>
        </div>

        <div className='lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800'>
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent'></div>
          <img
            src={useCase.image}
            alt={useCase.name}
            className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-700'
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/img/placeholder-image.png';
              target.alt = 'Application preview';
            }}
          />
          <div className='absolute bottom-4 left-4 right-4'>
            <div className='bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-lg p-3 border border-white/20 dark:border-gray-700/20'>
              <div className='text-xs font-mono text-white'>
                Created by {useCase.creator}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UseCaseSidebarItem: React.FC<UseCaseSidebarItemProps> = ({
  item: useCase,
  index,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
      isActive
        ? 'bg-brand-blue/10 border-brand-blue/30 dark:bg-brand-blue/20 dark:border-brand-blue/40'
        : 'bg-gray-50/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/30 hover:border-gray-300/70 dark:hover:border-gray-600/50'
    }`}
  >
    <div className='flex items-center justify-between'>
      <div className='space-y-1'>
        <div className='text-sm font-mono font-bold text-gray-900 dark:text-white'>
          {useCase.name}
        </div>
        <div className='text-xs font-mono text-brand-purple'>
          {useCase.creator}
        </div>
      </div>
      <StatusBadge variant='success'>LIVE</StatusBadge>
    </div>
  </button>
);

const UseCaseSection: React.FC = () => {
  const showcaseUseCases: UseCase[] = useCases.map((useCase, index) => ({
    id: `usecase-${index}`,
    name: useCase.name,
    creator: useCase.creator,
    description: useCase.description,
    tagline: useCase.tagline,
    link: useCase.link,
    image: useCase.image,
  }));

  return (
    <section className='relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/20 overflow-hidden'>
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='low'
        opacity={0.1}
      />

      <div className='absolute inset-0 opacity-5 dark:opacity-10'>
        <HashgraphConsensus animated={true} />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-20 lg:mb-32'>
          <div className='mb-12'>
            <div className='text-xs font-mono text-gray-800 dark:text-gray-400 uppercase tracking-[0.4em] mb-6'>
              <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
              REAL_APPLICATIONS
            </div>
            <Typography
              variant='h2'
              className='text-5xl lg:text-7xl xl:text-8xl font-mono font-black text-gray-900 dark:text-white leading-tight tracking-tight'
            >
              <span className='block'>Standards in</span>
              <GradientText
                gradient='brand'
                as='span'
                className='transform inline-block skew-x-[2deg]'
              >
                Production_
              </GradientText>
            </Typography>
            <Typography
              color='muted'
              className='text-lg lg:text-xl text-gray-600 dark:text-gray-300 mt-12 max-w-4xl mx-auto'
            >
              Real companies building real applications.{' '}
              <span className='text-brand-blue'>Live implementations</span> of
              HCS standards.
            </Typography>
          </div>
        </div>

        <InteractiveShowcase
          items={showcaseUseCases}
          title=''
          MainContent={UseCaseMainContent}
          SidebarItem={UseCaseSidebarItem}
          terminalTitle='application-showcase'
          rotationInterval={6000}
          className='p-0 bg-transparent'
        />

        <div className='max-w-4xl mx-auto mt-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white/95 dark:bg-gray-800/95 border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-2xl p-6 backdrop-blur-sm transform rotate-[-1deg]'>
              <div className='space-y-4'>
                <div className='text-xs font-mono text-gray-500 dark:text-gray-400 mb-4'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  ECOSYSTEM_GROWTH
                </div>

                <div className='space-y-3'>
                  <Typography
                    variant='h4'
                    className='text-gray-900 dark:text-white'
                  >
                    Real Applications
                    <br />
                    <span className='text-brand-green'>In Production</span>
                  </Typography>

                  <div className='text-sm font-mono text-gray-700 dark:text-gray-300 space-y-1'>
                    <div>
                      <span className='text-brand-purple'>const</span>{' '}
                      <span className='text-gray-900 dark:text-white'>
                        applications
                      </span>{' '}
                      ={' '}
                      <span className='text-brand-blue'>{useCases.length}</span>
                      ;
                    </div>
                    <div>
                      <span className='text-brand-purple'>const</span>{' '}
                      <span className='text-gray-900 dark:text-white'>
                        companies
                      </span>{' '}
                      ={' '}
                      <span className='text-brand-blue'>
                        {new Set(useCases.map((u) => u.creator)).size}
                      </span>
                      ;
                    </div>
                    <div>
                      <span className='text-brand-purple'>const</span>{' '}
                      <span className='text-gray-900 dark:text-white'>
                        proof
                      </span>{' '}
                      ={' '}
                      <span className='text-brand-green'>"real_adoption"</span>;
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white/95 dark:bg-gray-800/95 border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-2xl p-6 backdrop-blur-sm transform rotate-[1deg]'>
              <div className='space-y-4'>
                <div className='text-xs font-mono text-gray-500 dark:text-gray-400 mb-4'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  EXPLORE_MORE
                </div>

                <Typography
                  variant='h4'
                  className='text-gray-900 dark:text-white mb-4'
                >
                  Browse All
                  <br />
                  <span className='text-brand-blue'>Applications</span>
                </Typography>

                <Link
                  to='/use-cases'
                  className='block w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 text-center'
                >
                  ./explore-all-applications.sh
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;
