import React from 'react';
import { HashgraphConsensus } from '../HashgraphConsensus';
import { Typography } from '../ui';
import { FaNetworkWired, FaRocket, FaCoins } from 'react-icons/fa';

const AutonomousInfrastructureSection: React.FC = () => {
  return (
    <section className='relative py-24 lg:py-32 text-white overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black'>
      <div className='absolute inset-0 opacity-10'>
        <HashgraphConsensus animated={true} />
      </div>
      <div className='absolute inset-0 opacity-30 blur-3xl bg-gradient-to-br from-brand-blue/20 via-brand-purple/15 to-brand-green/20'></div>

      <div className='container mx-auto px-6 lg:px-12 relative z-10'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <Typography
              color='muted'
              className='text-xs text-gray-400 uppercase tracking-[0.3em] mb-4'
            >
              // PARADIGM SHIFT
            </Typography>
            <Typography
              variant='h2'
              className='text-3xl lg:text-5xl font-black leading-tight tracking-tight text-white mb-4'
            >
              When Infrastructure{' '}
              <Typography
                variant='h2'
                gradient='brand'
                as='span'
                className='text-3xl lg:text-5xl font-black inline-block'
              >
                Becomes Autonomous_
              </Typography>
            </Typography>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Card 1: Websites */}
            <div
              className='relative group'
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" />
              <div className='relative h-full bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-3xl p-8 hover:border-brand-blue/30 transition-colors duration-300 flex flex-col items-center text-center'>
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 flex items-center justify-center border border-brand-blue/20 group-hover:scale-110 transition-transform duration-300">
                  <FaNetworkWired className="text-2xl text-brand-blue" />
                </div>
                
                <Typography color='blue' className='text-sm font-mono uppercase tracking-widest mb-3 font-bold'>
                  // WEBSITES EXIST
                </Typography>
                
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2">
                  without <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">web servers</span>
                </h3>
              </div>
            </div>

            {/* Card 2: AI Agents */}
            <div
              className='relative group'
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" />
              <div className='relative h-full bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-3xl p-8 hover:border-brand-green/30 transition-colors duration-300 flex flex-col items-center text-center'>
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-brand-green/20 to-brand-green/5 flex items-center justify-center border border-brand-green/20 group-hover:scale-110 transition-transform duration-300">
                  <FaRocket className="text-2xl text-brand-green" />
                </div>
                
                <Typography color='green' className='text-sm font-mono uppercase tracking-widest mb-3 font-bold'>
                  // AI AGENTS DISCOVER
                </Typography>
                
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2">
                  each other <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">autonomously</span>
                </h3>
              </div>
            </div>

            {/* Card 3: Economic Systems */}
            <div
              className='relative group'
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" />
              <div className='relative h-full bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-3xl p-8 hover:border-brand-purple/30 transition-colors duration-300 flex flex-col items-center text-center'>
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-purple/5 flex items-center justify-center border border-brand-purple/20 group-hover:scale-110 transition-transform duration-300">
                  <FaCoins className="text-2xl text-brand-purple" />
                </div>
                
                <Typography color='purple' className='text-sm font-mono uppercase tracking-widest mb-3 font-bold'>
                  // ECONOMIES
                </Typography>
                
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2">
                  run <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">themselves</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutonomousInfrastructureSection;
