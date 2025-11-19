import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Typography from '../components/Typography';
import {
 FaDatabase,
 FaComments,
 FaFingerprint,
 FaUserCircle,
 FaNetworkWired,
 FaArrowRight,
 FaServer,
 FaExchangeAlt,
} from 'react-icons/fa';

type Standard = {
 id: string;
 title: string;
 summary: string;
 bullets: string[];
 icon: React.ReactNode;
 color: string;
 accentColor: string;
};

const standards: Standard[] = [
 {
  id: 'hcs-2',
  title: 'HCS-2 · Registries',
    summary:
      'A basic on-chain primitive for storing and organizing data such as agents, MCP servers, or data lakes.',
    bullets: [
      'Entries are written immutably to HCS topics by trusted organizations or users.',
      'Publishers can be verified through their payer account and optional W3C DID implementations.',
      'Forms the storage layer of the new internet, every directory has a permanent source of truth.',
  ],
  icon: <FaDatabase />,
  color: '#3b82f6',
  accentColor: '#60a5fa',
 },
 {
  id: 'hcs-10',
  title: 'HCS-10 · Agent-to-Agent Communication',
    summary:
      'A communication primitive that lets agents, humans, and any HCS payer account exchange messages directly on-chain.',
  bullets: [
      'Conversations inherit the same verification model as HCS-2, payers are visible and identities can be checked.',
   'Enables trusted, auditable communication for the new internet where messages need to be proven.',
   'Adapters can bridge HCS-10 topics into Google A2A chats or Agent Directed Payment (ADP) flows without losing provenance.',
  ],
  icon: <FaComments />,
  color: '#10b981',
  accentColor: '#34d399',
 },
 {
  id: 'hcs-14',
  title: 'HCS-14 · Universal Agent IDs',
  summary:
   'A chain-agnostic method for generating interoperable agent identifiers (UAIDs) that always resolve to the same value.',
  bullets: [
   'Supports both W3C DID targets and deterministically created AIDs sourced from HCS-2 registry data.',
   'UAIDs reveal which registry an agent was registered to, which communication protocol (HCS-10, A2A, ADP, etc.) they speak, and the skills they expose.',
   'Used across applications like the Hashgraph Online Registry Broker to reference agents anywhere on the internet.',
  ],
  icon: <FaFingerprint />,
  color: '#8b5cf6',
  accentColor: '#a78bfa',
 },
 {
  id: 'hcs-11',
  title: 'HCS-11 · Decentralized Profiles',
    summary:
      'A profile standard that keeps essential information, names, aliases, skills, and more, stored immutably on-chain.',
    bullets: [
      'Agents can publish their own profile to the payer account ID they use for HCS, boosting trust and sovereignty.',
   'Acts as a durable alternative to web URLs for protocols like A2A that expect an agent facts endpoint.',
   'Gives every entity on the new internet a profile that never disappears when DNS or servers go offline.',
  ],
  icon: <FaUserCircle />,
  color: '#f59e0b',
  accentColor: '#fbbf24',
 },
];

const pipeline = [
 {
  title: '1 · Registry',
  description:
    'Agents anchor immutable state in HCS-2 so every network, on-chain, Web2, or payments can reference the same record.',
 },
 {
  title: '2 · Identity',
  description:
   'HCS-14 derives a UAID that resolves to the registry entry, letting Google A2A directories, ADP payment flows, and network-specific smart contracts point at one agent.',
 },
 {
  title: '3 · Profile',
  description:
    'HCS-11 keeps the agent facts (skills, endpoints, payment terms) available even when DNS or hosting goes down, perfect for protocols that expect a stable endpoint.',
 },
 {
  title: '4 · Conversation & payments',
  description:
   'HCS-10 carries verifiable messages. Adapters translate those UAID-stamped messages into A2A chats or ADP requests without losing trust.',
 },
];

const OverviewPage: React.FC = () => {
 const [activeStandard, setActiveStandard] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => {
   setActiveStandard((prev) => (prev + 1) % standards.length);
  }, 4000);
  return () => clearInterval(interval);
 }, []);

 return (
  <Layout
   title='The Standards Stack'
   description='Discover how HCS-2, HCS-10, HCS-11, HCS-14, and Registry Brokers power the new internet.'
  >
   <div className='relative overflow-hidden'>
    {/* Animated Background */}
    <div className='absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
     <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px] animate-pulse'></div>
     <div
      className='absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] animate-pulse'
      style={{ animationDelay: '1s' }}
     ></div>
     <div
      className='absolute bottom-1/4 left-1/2 w-96 h-96 bg-green-500/10 dark:bg-green-500/20 rounded-full blur-[120px] animate-pulse'
      style={{ animationDelay: '2s' }}
     ></div>
    </div>

    <main className='relative z-10'>
     {/* Hero Section */}
     <section className='px-6 py-16 md:py-24'>
      <div className='max-w-4xl mx-auto text-center space-y-6'>
       <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-4'>
        <FaNetworkWired className='text-blue-600 dark:text-blue-400' />
        <span className='text-xs uppercase tracking-wider text-blue-700 dark:text-blue-300 font-semibold'>
         The Standards Stack
        </span>
       </div>

       <Typography variant='h1' className='text-3xl md:text-5xl font-bold tracking-tight'>
        <span className='bg-gradient-to-r from-blue-500 from-20% via-purple-600 via-50% to-green-500 to-80% dark:from-blue-400 dark:from-20% dark:via-purple-400 dark:via-50% dark:to-green-400 dark:to-80% bg-clip-text text-transparent animate-gradient-x'>
         Building blocks for the new internet
        </span>
       </Typography>

       <Typography variant='p' className='text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
        Hashgraph Online's standards stack defines how agents register themselves, prove who they are,
        publish profiles, and hold verifiable conversations. Each specification is simple, auditable, and
        ready for production today, including when those agents appear in Google’s A2A directories, ADP payment
        flows, or network-specific applications.
       </Typography>
      </div>
     </section>

     {/* Standards Grid */}
     <section className='px-6 pb-16 md:pb-20'>
      <div className='max-w-6xl mx-auto'>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {standards.map((standard, index) => (
         <article
          key={standard.id}
          className={`group relative rounded-2xl border-2 transition-all duration-500 ${
           activeStandard === index
            ? 'border-transparent shadow-2xl scale-[1.02]'
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
          style={{
           backgroundColor: activeStandard === index ? `${standard.color}08` : undefined,
           boxShadow:
            activeStandard === index ? `0 20px 60px -15px ${standard.color}40` : undefined,
          }}
          onMouseEnter={() => setActiveStandard(index)}
         >
          {/* Animated Border Gradient */}
          {activeStandard === index && (
           <div
            className='absolute -inset-[2px] rounded-2xl opacity-100 blur-sm'
            style={{
             background: `linear-gradient(45deg, ${standard.color}, ${standard.accentColor}, ${standard.color})`,
             backgroundSize: '200% 200%',
             animation: 'gradient-shift 3s ease infinite',
            }}
           />
          )}

          <div className='relative bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8'>
           {/* Icon Badge and Title */}
           <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
             <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg transition-all duration-500 flex-shrink-0 ${
               activeStandard === index ? 'scale-110' : 'scale-100'
              }`}
              style={{
               backgroundColor: standard.color,
               boxShadow: activeStandard === index ? `0 10px 30px ${standard.color}40` : undefined,
              }}
             >
              {standard.icon}
             </div>

             <h2 className='text-xl font-bold text-slate-900 dark:text-white'>{standard.title}</h2>
            </div>

            {activeStandard === index && (
             <div className='animate-pulse'>
              <div className='w-2 h-2 rounded-full bg-green-500'></div>
             </div>
            )}
           </div>

           <Typography variant='p' className='text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed'>
            {standard.summary}
           </Typography>

           <ul className='space-y-2.5'>
            {standard.bullets.map((bullet, i) => (
             <li
              key={bullet}
              className='flex gap-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed'
              style={{
               animation:
                activeStandard === index ? `fadeInUp 0.5s ease-out ${i * 0.1}s both` : undefined,
              }}
             >
              <span
               className='mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0'
               style={{ backgroundColor: standard.color }}
              ></span>
              <span>{bullet}</span>
             </li>
            ))}
           </ul>
          </div>
         </article>
        ))}
       </div>
      </div>
     </section>

     {/* Integration pipeline */}
     <section className='px-6 pb-16 md:pb-20'>
      <div className='max-w-5xl mx-auto rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 backdrop-blur-sm shadow-sm p-8 md:p-10 space-y-6'>
       <div className='flex items-center gap-3'>
        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-xl shadow-lg'>
         <FaArrowRight />
        </div>
        <div>
         <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-1'>
          How it all ties together
         </h2>
         <p className='text-sm text-slate-600 dark:text-slate-300'>
          One pipeline powers discovery, identity, A2A conversations, and ADP payments.
         </p>
        </div>
       </div>

       <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        {pipeline.map((step) => (
         <div
          key={step.title}
          className='rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 p-6 space-y-2 flex flex-col'
         >
          <p className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
           {step.title}
          </p>
          <p className='text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed flex-grow'>
           {step.description}
          </p>
         </div>
        ))}
       </div>
      </div>
     </section>

     {/* Registry Brokers Section */}
     <section className='px-6 pb-16 md:pb-20'>
      <div className='max-w-5xl mx-auto'>
       <div className='relative rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/30 p-8 md:p-10 overflow-hidden'>
        {/* Animated Background Pattern */}
        <div className='absolute top-0 right-0 w-64 h-64 opacity-10 dark:opacity-5'>
         <FaServer className='w-full h-full text-emerald-600 animate-spin-slow' />
        </div>

        {/* Header */}
        <div className='relative mb-6'>
         <div className='flex items-center gap-3 mb-4'>
          <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xl shadow-lg'>
           <FaNetworkWired />
          </div>
          <Typography variant='h2' className='text-2xl font-bold text-slate-900 dark:text-white'>
           Registry Brokers
          </Typography>
         </div>

         <Typography variant='p' className='text-base text-slate-700 dark:text-slate-300'>
          The Hashgraph Online Registry Broker (
          <a
           href='https://https://hol.org/registry'
           className='text-emerald-600 dark:text-emerald-400 underline font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors'
          >
           https://hol.org/registry
          </a>
          ) turns the standards stack into a discovery network.
         </Typography>
        </div>

        {/* Content Grid */}
        <div className='relative grid md:grid-cols-2 gap-6'>
         {/* How agents enter */}
         <div className='rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 border border-emerald-100 dark:border-emerald-900'>
          <Typography variant='h3' className='text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2'>
           <FaArrowRight className='text-emerald-500' />
           How agents enter the broker
          </Typography>
          <ul className='space-y-3 text-sm text-slate-700 dark:text-slate-300'>
           <li className='flex gap-3'>
            <span className='mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse'></span>
            <span>
             <strong>Indexing:</strong> adapters watch agent protocols and registries across Web2 and Web3,
             then store the discovered agents as UAID-backed records.
            </span>
           </li>
           <li className='flex gap-3'>
            <span
             className='mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse'
             style={{ animationDelay: '0.5s' }}
            ></span>
            <span>
                      <strong>Registration:</strong> agents outside an adapter (or with stale data) can register
                      directly, just like submitting a sitemap to a search engine.
            </span>
           </li>
          </ul>
         </div>

         {/* Why it matters */}
         <div className='rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 border border-emerald-100 dark:border-emerald-900'>
          <Typography variant='h3' className='text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2'>
           <FaExchangeAlt className='text-emerald-500' />
           Why it matters
          </Typography>
          <ul className='space-y-3 text-sm text-slate-700 dark:text-slate-300'>
           <li className='flex gap-3'>
            <span className='mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse'></span>
            <span>
             <strong>Discovery:</strong> a universal API surfaces every indexed or registered agent, and UAIDs
             make it trivial to see how to contact them.
            </span>
           </li>
           <li className='flex gap-3'>
            <span
             className='mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse'
             style={{ animationDelay: '0.5s' }}
            ></span>
            <span>
                      <strong>Chat:</strong> the broker routes conversations through the right adapter, A2A agents use
                      A2A, while HCS-10 agents generate the correct HCS transactions via the Standards SDK.
            </span>
           </li>
          </ul>
         </div>
        </div>

        {/* Looking ahead */}
        <div className='relative mt-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 p-6 border border-emerald-200 dark:border-emerald-800'>
         <Typography variant='h3' className='text-lg font-bold text-slate-900 dark:text-white mb-3'>
          Looking ahead
         </Typography>
         <Typography variant='p' className='text-sm text-slate-700 dark:text-slate-300 leading-relaxed'>
          Registry Brokers will operate as meshnets with 2/3 consensus. Communities will run their own brokers
          dedicated to specific agents, data, or services, while routing keeps users connected to the right hub.
         </Typography>
        </div>
       </div>
      </div>
     </section>

     {/* CTA Section */}
     <section className='px-6 pb-20'>
      <div className='max-w-4xl mx-auto text-center space-y-6'>
       <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
        <span className='bg-gradient-to-r from-blue-600 from-5% via-purple-600 via-45% via-green-600 via-75% to-emerald-500 to-95% dark:from-blue-400 dark:from-5% dark:via-purple-400 dark:via-45% dark:via-green-400 dark:via-75% dark:to-emerald-400 dark:to-95% bg-clip-text text-transparent'>
         Explore the standards
        </span>
       </h2>

       <Typography variant='p' className='text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto'>
        Dive deeper into each specification and start building the next generation of agentic applications.
       </Typography>

       <div className='flex flex-col sm:flex-row justify-center gap-4 pt-4'>
        <a
         href='https://hashgraphonline.com/docs/standards'
         className='group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-blue-600 font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl no-underline hover:no-underline'
        >
         <span className='relative z-10 text-white no-underline'>View Standards Documentation</span>
         <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity'></div>
        </a>
        <a
         href='https://https://hol.org/registry'
         className='inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all hover:scale-105 hover:shadow-xl no-underline hover:no-underline'
        >
         Visit the Registry Broker
        </a>
       </div>
      </div>
     </section>
    </main>
   </div>

   <style jsx>{`
    @keyframes gradient-shift {
     0%,
     100% {
      background-position: 0% 50%;
     }
     50% {
      background-position: 100% 50%;
     }
    }

    @keyframes gradient-x {
     0%,
     100% {
      background-position: 0% 50%;
     }
     50% {
      background-position: 100% 50%;
     }
    }

    @keyframes fadeInUp {
     from {
      opacity: 0;
      transform: translateY(10px);
     }
     to {
      opacity: 1;
      transform: translateY(0);
     }
    }

    @keyframes spin-slow {
     from {
      transform: rotate(0deg);
     }
     to {
      transform: rotate(360deg);
     }
    }

    .animate-gradient-x {
     background-size: 150% 150%;
     animation: gradient-x 6s ease infinite;
    }

    .animate-spin-slow {
     animation: spin-slow 20s linear infinite;
    }
   `}</style>
  </Layout>
 );
};

export default OverviewPage;
