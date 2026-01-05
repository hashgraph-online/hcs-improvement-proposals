import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { Typography, TransformCard, AnimatedBackground } from '../ui';
import { formatNumber } from '../../lib/format';
import { fetchHolProductionMetrics, type HolProductionMetrics } from '../../lib/hol-metrics';

const HashgraphConsensusLazy = lazy(() =>
  import('../HashgraphConsensus').then((m) => ({ default: m.HashgraphConsensus }))
);

const MetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = true;
  const [holMetrics, setHolMetrics] = useState<HolProductionMetrics | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const result = await fetchHolProductionMetrics(controller.signal);
        if (controller.signal.aborted) return;
        setHolMetrics(result);
      } catch {
        if (controller.signal.aborted) return;
        setHolMetrics(null);
      }
    })();

    return () => controller.abort();
  }, []);

  const totalTransactionsLabel = holMetrics ? `${formatNumber(holMetrics.totalOnChainTransactions)}+` : '—';
  const filesStoredLabel = holMetrics ? `${formatNumber(holMetrics.hcs1TopicsCreated)}+` : '—';

  return (
    <section
      ref={sectionRef}
      className='relative py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-black dark:to-gray-900 overflow-hidden'
    >
      <AnimatedBackground
        variant='blobs'
        colors={['brand-blue', 'brand-purple', 'brand-green']}
        intensity='medium'
        opacity={0.15}
      />

      <div className='absolute inset-0 opacity-10 dark:opacity-5'>
        <Suspense fallback={null}>
          <HashgraphConsensusLazy animated={true} />
        </Suspense>
      </div>

      <div className='container mx-auto px-6 lg:px-12 relative z-10'>
        <div
          className='text-center mb-20'
        >
          <div className='text-xs font-mono text-gray-700 dark:text-gray-400 uppercase tracking-[0.3em] mb-4'>
            <span className='text-gray-900 dark:text-gray-400'>//</span> LIVE IN PRODUCTION
          </div>
          <Typography
            variant='h2'
            className='text-4xl lg:text-5xl font-mono font-black text-gray-900 dark:text-white mb-6'
          >
            Production{' '}
            <Typography
              variant='h2'
              gradient='brand'
              as='span'
              className='text-4xl lg:text-5xl font-mono font-black inline-block'
            >
              Metrics_
            </Typography>
          </Typography>
          <Typography
            color='muted'
            className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
          >
            Battle-tested infrastructure powering real applications at internet scale
          </Typography>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16'>
          <div
            className='relative group'
          >
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-700 group-hover:duration-300'></div>
            <TransformCard
              rotation='rotate-[1.5deg]'
              background='bg-white/95 dark:bg-gray-800/95'
              border='border border-gray-200/50 dark:border-gray-700/50'
              shadow='xl'
              rounded='3xl'
              className='relative p-8 lg:p-12 backdrop-blur-sm hover:scale-105 transition-all duration-700 group-hover:-rotate-1'
            >
              <div className='space-y-8'>
                <div className='text-xs font-mono text-gray-800 dark:text-gray-400'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  totalTransactions
                </div>

                <div className='space-y-6'>
                  <div className='relative'>
                    <div className='text-5xl lg:text-6xl font-mono font-black text-blue-600 dark:text-brand-blue leading-none whitespace-nowrap'>
                      {totalTransactionsLabel}
                    </div>
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-brand-green rounded-full animate-pulse'></div>
                  </div>

                  <div className='space-y-3'>
                    <Typography
                      variant='h3'
                      className='text-lg lg:text-xl font-mono font-bold text-gray-900 dark:text-white'
                    >
                      Total Transactions
                    </Typography>
                    <Typography
                      color='muted'
                      className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'
                    >
                      <Typography
                        color='purple'
                        as='span'
                        className='text-purple-600 dark:text-brand-purple'
                      >
                        Processing
                      </Typography>{' '}
                      millions of on-chain operations across all HCS standards —
                      proving our infrastructure works at internet scale.
                    </Typography>
                  </div>
                </div>
              </div>
            </TransformCard>
          </div>

          <div
            className='relative group lg:mt-12'
          >
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-green via-brand-blue to-brand-purple rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-700 group-hover:duration-300'></div>
            <TransformCard
              rotation='rotate-[-1deg]'
              background='bg-white/95 dark:bg-gray-800/95'
              border='border border-gray-200/50 dark:border-gray-700/50'
              shadow='xl'
              rounded='3xl'
              className='relative p-8 lg:p-12 backdrop-blur-sm hover:scale-105 transition-all duration-700 group-hover:rotate-1'
            >
              <div className='space-y-8'>
                <div className='text-xs font-mono text-gray-800 dark:text-gray-400'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  globalInfrastructure
                </div>

                <div className='space-y-6'>
                  <div className='relative'>
                    <div className='text-5xl lg:text-6xl font-mono font-black text-green-600 dark:text-brand-green leading-none'>
                      300K+
                    </div>
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-brand-blue rounded-full animate-pulse delay-300'></div>
                  </div>

                  <div className='space-y-3'>
                    <Typography
                      variant='h3'
                      className='text-lg lg:text-xl font-mono font-bold text-gray-900 dark:text-white'
                    >
                      CDN Requests Daily
                    </Typography>
                    <Typography
                      color='muted'
                      className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'
                    >
                      <Typography
                        color='blue'
                        as='span'
                        className='text-blue-600 dark:text-brand-blue'
                      >
                        Serving
                      </Typography>{' '}
                      on-chain data globally through our infrastructure,
                      enabling seamless access to decentralized content.
                    </Typography>
                  </div>
                </div>
              </div>
            </TransformCard>
          </div>

          <div
            className='relative group lg:mt-6'
          >
            <div className='absolute -inset-1 bg-gradient-to-r from-brand-purple via-brand-green to-brand-blue rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-700 group-hover:duration-300'></div>
            <TransformCard
              rotation='rotate-[2deg]'
              background='bg-white/95 dark:bg-gray-800/95'
              border='border border-gray-200/50 dark:border-gray-700/50'
              shadow='xl'
              rounded='3xl'
              className='relative p-8 lg:p-12 backdrop-blur-sm hover:scale-105 transition-all duration-700 group-hover:-rotate-2'
            >
              <div className='space-y-8'>
                <div className='text-xs font-mono text-gray-800 dark:text-gray-400'>
                  <span className='text-gray-800 dark:text-gray-400'>//</span>{' '}
                  onGraphStorage
                </div>

                <div className='space-y-6'>
                  <div className='relative'>
                    <div className='text-5xl lg:text-6xl font-mono font-black text-purple-600 dark:text-brand-purple leading-none whitespace-nowrap'>
                      {filesStoredLabel}
                    </div>
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-brand-green rounded-full animate-pulse delay-700'></div>
                  </div>

                  <div className='space-y-3'>
                    <Typography
                      variant='h3'
                      className='text-lg lg:text-xl font-mono font-bold text-gray-900 dark:text-white'
                    >
                      Files Stored
                    </Typography>
                    <Typography
                      color='muted'
                      className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'
                    >
                      <Typography
                        color='green'
                        as='span'
                        className='text-green-600 dark:text-brand-green'
                      >
                        On-graph
                      </Typography>{' '}
                      storage via HCS-1, proving our standards work for real
                      applications and creators.
                    </Typography>
                  </div>
                </div>
              </div>
            </TransformCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
