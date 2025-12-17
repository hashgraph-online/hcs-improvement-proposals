import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaSitemap, FaFingerprint, FaExchangeAlt, FaBolt, FaKey, FaShieldAlt, FaVoteYea, FaNetworkWired, FaUsers, FaCoins, FaCheckDouble, FaTrashAlt, FaArrowDown, FaDatabase } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import CodeSnippet from '../components/CodeSnippet';
import Terminal from '../components/ui/Terminal';

// --- VISUAL COMPONENTS ---

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b] origin-left z-[100]" style={{ scaleX }} />;
};

const FloraHeroOrb = () => {
  return (
    <div className="relative w-full h-[450px] flex items-center justify-center perspective-[1000px]">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(85,153,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(85,153,254,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none" />

      {/* CONNECTING LINES (The Network) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
         <defs>
            <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#5599fe" stopOpacity="0" />
               <stop offset="50%" stopColor="#5599fe" stopOpacity="0.5" />
               <stop offset="100%" stopColor="#5599fe" stopOpacity="0" />
            </linearGradient>
         </defs>
         {[0, 120, 240].map((deg, i) => {
            const rad = (deg - 90) * (Math.PI / 180);
            const cx = 50 + 35 * Math.cos(rad); // Center X %
            const cy = 50 + 35 * Math.sin(rad); // Center Y %
            return (
               <g key={i}>
                  <line x1="50%" y1="50%" x2={`${cx}%`} y2={`${cy}%`} stroke="#5599fe" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                  {/* Flowing Data Packet */}
                  <motion.circle r="3" fill="#5599fe"
                     animate={{ 
                        cx: ["50%", `${cx}%`],
                        cy: ["50%", `${cy}%`],
                        opacity: [0, 1, 0]
                     }}
                     transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                  />
                  <motion.circle r="3" fill="#a679f0"
                     animate={{ 
                        cx: [`${cx}%`, "50%"],
                        cy: [`${cy}%`, "50%"],
                        opacity: [0, 1, 0]
                     }}
                     transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 + 1.5, ease: "linear" }}
                  />
               </g>
            );
         })}
      </svg>

      {/* ORBITING PETALS (The Signers) */}
      {[0, 120, 240].map((deg, i) => {
         const rad = (deg - 90) * (Math.PI / 180);
         // Radius = 160px approx
         const x = 160 * Math.cos(rad);
         const y = 160 * Math.sin(rad);
         
         return (
            <motion.div
               key={i}
               className="absolute z-10"
               style={{ x, y }}
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: i * 0.2 }}
            >
               <div className="relative group">
                  <div className="w-16 h-16 bg-white dark:bg-[#0f0f16] rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                     <div className="text-[#5599fe] text-xl mb-1"><FaFingerprint /></div>
                     <div className="text-[8px] font-mono text-gray-400">KEY_{i+1}</div>
                     {/* Status Dot */}
                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#48df7b] border-2 border-white dark:border-[#0f0f16] rounded-full" />
                  </div>
                  {/* Label tooltip */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono whitespace-nowrap bg-gray-900 text-white px-2 py-1 rounded">
                     0.0.{1000 + i}
                  </div>
               </div>
            </motion.div>
         );
      })}

      {/* CENTRAL FLORA CORE (The Network) */}
      <motion.div 
         className="relative z-20"
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ delay: 0.5, duration: 0.8 }}
      >
         {/* Ripples */}
         <div className="absolute inset-0 rounded-full border border-[#5599fe]/20 animate-ping-slow" />
         <div className="absolute -inset-4 rounded-full border border-[#a679f0]/20 animate-ping-slow delay-75" />
         
         {/* Main Hub */}
         <div className="w-40 h-40 bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1b2e] dark:to-gray-900 rounded-full border-2 border-[#5599fe]/30 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(85,153,254,0.2)] backdrop-blur-xl">
             
             {/* Triad Indicators */}
             <div className="flex gap-2 mb-3">
                 <div className="w-1.5 h-8 bg-[#a679f0] rounded-full animate-pulse" title="Communication" />
                 <div className="w-1.5 h-10 bg-[#5599fe] rounded-full animate-pulse delay-75" title="Execution" />
                 <div className="w-1.5 h-8 bg-[#48df7b] rounded-full animate-pulse delay-150" title="State" />
             </div>

             <div className="text-center">
                 <div className="text-[10px] font-mono text-gray-500 tracking-widest mb-0.5">SOVEREIGN</div>
                 <div className="text-2xl font-bold font-mono text-gray-900 dark:text-white tracking-tighter">FLORA</div>
                 <div className="text-[9px] font-mono text-[#5599fe] mt-1 bg-[#5599fe]/10 px-2 py-0.5 rounded-full">
                    NET_ACTIVE
                 </div>
             </div>
         </div>
      </motion.div>

    </div>
  );
};

const KeyArchitectureVisual = () => {
    return (
        <div className="w-full h-full min-h-[600px] bg-white dark:bg-[#0f0f16] rounded-[3rem] border border-gray-200 dark:border-white/10 p-16 relative overflow-hidden flex flex-col justify-center items-center shadow-2xl">
            {/* Base Account */}
            <div className="relative z-20 flex flex-col items-center">
                <div className="w-24 h-24 bg-[#a679f0] rounded-full flex items-center justify-center text-white text-4xl shadow-[0_0_50px_rgba(166,121,240,0.4)] mb-4">
                    <FaKey />
                </div>
                <div className="px-6 py-2 bg-[#a679f0]/10 rounded-full text-[#a679f0] font-mono font-bold mb-2">PRIVATE KEY</div>
                <div className="text-gray-900 dark:text-white font-bold text-xl">Base Account (0.0.123)</div>
            </div>

            {/* Connecting Lines */}
            <div className="w-full max-w-2xl h-24 border-x-2 border-b-2 border-gray-300 dark:border-white/20 rounded-b-3xl mt-4 mb-8 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-white/20" />
            </div>

            {/* Petals */}
            <div className="flex gap-8 justify-center w-full relative z-10">
                {[1, 2, 3].map((i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -10 }}
                        className="flex flex-col items-center p-6 bg-gray-50 dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-white/10"
                    >
                        <div className="w-16 h-16 bg-[#5599fe]/20 rounded-full flex items-center justify-center text-[#5599fe] text-2xl mb-4">
                            <FaFingerprint />
                        </div>
                        <div className="text-sm font-mono text-gray-500">PETAL {i}</div>
                        <div className="text-xs text-gray-400 mt-1">Auth: Base Key</div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

const TriadCard = ({ color, title, code, desc, icon }) => (
    <motion.div 
        whileHover={{ y: -20, rotateX: 5 }}
        className="p-12 h-full bg-white dark:bg-[#0f0f16] rounded-[3rem] border-t-8 shadow-2xl relative overflow-hidden group"
        style={{ borderColor: color }}
    >
        <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl group-hover:opacity-10 transition-opacity" style={{ color }}>
            {icon}
        </div>
        <div className="mb-8 p-6 rounded-3xl w-fit" style={{ backgroundColor: `${color}15` }}>
            <div className="text-4xl" style={{ color }}>{icon}</div>
        </div>
        <h4 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h4>
        <code className="inline-block px-4 py-2 bg-gray-100 dark:bg-black rounded-lg font-mono text-sm text-gray-500 mb-8">{code}</code>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
            {desc}
        </p>
    </motion.div>
);

const SectionHeader = ({ title, subtitle, color = "blue" }: { title: string, subtitle: string, color?: "blue" | "purple" | "green" }) => {
    const colorHex = color === "blue" ? "#5599fe" : color === "purple" ? "#a679f0" : "#48df7b";
    return (
        <div className="mb-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
            >
                <span className="w-12 h-0.5 rounded-full" style={{ backgroundColor: colorHex }} />
                <span className="text-sm font-mono tracking-[0.2em] font-bold uppercase" style={{ color: colorHex }}>{subtitle}</span>
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[0.9]"
            >
                {title}
            </motion.h2>
        </div>
    );
};

// --- MAIN PAGE ---

export default function FlorasPage() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <Layout title="HCS-16 Floras" description="Decentralized AppNet Accounts on Hiero.">
      <div className='min-h-screen bg-white dark:bg-[#050505] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#a679f0] selection:text-white transition-colors duration-300'>
        <ScrollProgress />
        
        {/* Background Noise */}
        <div className='fixed inset-0 pointer-events-none opacity-30 z-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] brightness-100 contrast-150 mix-blend-overlay' />

        {/* 1. HERO SECTION - Top Aligned */}
        <section className="relative min-h-[60vh] flex items-start pt-4 md:pt-8 pb-16 overflow-hidden">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px] relative z-10">
                 <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div 
                        className="pl-4 md:pl-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* DROPDOWN MENU */}
                        <div className="relative inline-block text-left mb-8 z-50">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#5599fe]/10 border border-[#5599fe]/30 text-[#5599fe] text-xs font-mono font-bold tracking-[0.2em] hover:bg-[#5599fe]/20 transition-colors"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#5599fe] animate-pulse" />
                                STANDARDS
                                <FaArrowDown className={`ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl bg-white dark:bg-[#0f0f16] border border-gray-200 dark:border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden origin-top-left animate-fade-in-down">
                                    <div className="py-2">
                                        <Link to="/standards" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Standards Overview</Link>
                                        <Link to="/docs/intro" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Standards Library</Link>
                                        <div className="h-px bg-gray-100 dark:bg-white/5 my-1" />
                                        <Link to="/hashinals" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Files & Hashinals</Link>
                                        <Link to="/registries" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Data Registries</Link>
                                        <Link to="/hcs-14" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Universal Agent Identity</Link>
                                        <Link to="/profiles" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Identity Metadata</Link>
                                        <Link to="/hcs-20" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Auditable Points</Link>
                                        <Link to="/openconvai" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Agent Communication</Link>
                                        <Link to="/floras" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">AppNet Accounts</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-6">
                            SOVEREIGN <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#5599fe] animate-gradient-x">APPNETS.</span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed border-l-4 border-[#a679f0] pl-6">
                            Upgrade standard multisig accounts into programmable data networks.
                            <strong>HCS-16 Floras</strong> unify identity, sovereign state, and localized consensus into a single living organism.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton href="/docs/standards/hcs-16" className="!text-sm !px-6 !py-3 shadow-2xl shadow-purple-500/20 rounded-xl flex items-center justify-center gap-2">
                                READ SPEC <FaBolt />
                            </PrimaryButton>
                            <SecondaryButton href="https://hol.org/points" className="!text-sm !px-6 !py-3 !border-[#48df7b] !text-[#48df7b] hover:!bg-[#48df7b] hover:!text-white rounded-xl">
                                COLLECT POINTS
                            </SecondaryButton>
                        </div>
                    </motion.div>

                    <div className="hidden lg:block relative">
                        <FloraHeroOrb />
                    </div>
                 </div>
             </div>

             {/* Scroll Indicator */}
             <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#a679f0] text-2xl opacity-50"
             >
                 <FaArrowDown />
             </motion.div>
        </section>

        {/* 2. HCS-15: PETALS (The Foundation) */}
        <section className="py-24 relative z-10 bg-gray-50 dark:bg-[#0a0b10] border-t border-b border-gray-200 dark:border-white/5">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid xl:grid-cols-2 gap-16">
                     <div className="sticky top-24 h-fit">
                         <SectionHeader title="Petal Accounts." subtitle="HCS-15" color="blue" />
                         <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                             Before you can form a Flora, you need a Petal.
                             <strong>HCS-15</strong> enables users and agents to create infinite, isolated on-chain identities that share a single ECDSA private key.
                         </p>
                         <p className="text-base text-gray-500 leading-relaxed mb-6">
                             This "Shared Key Architecture" eliminates wallet fatigue. One master key controls your Gaming Petal, your DeFi Petal, and your Social Petal.
                         </p>
                         <PrimaryButton href="/docs/standards/hcs-15" size="medium" className="rounded-xl">READ HCS-15 SPEC</PrimaryButton>
                     </div>
                     
                     <KeyArchitectureVisual />
                 </div>
             </div>
        </section>

        {/* 3. HCS-16: THE TRIAD */}
        <section className="py-24 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <SectionHeader title="The Topic Triad." subtitle="ARCHITECTURE" color="purple" />

                 <div className="grid xl:grid-cols-3 gap-8">
                     <TriadCard
                        title="CTopic"
                        code="hcs-16:ID:0"
                        desc="Communication. Where members chat, propose governance votes, and negotiate off-chain data. Human-readable or LLM-readable."
                        color="#a679f0"
                        icon={<FaSitemap />}
                     />
                     <div className="xl:mt-16">
                        <TriadCard
                            title="TTopic"
                            code="hcs-16:ID:1"
                            desc="Transaction. The execution layer. Only contains pre-signed Scheduled Transaction proposals ready for approval."
                            color="#5599fe"
                            icon={<FaExchangeAlt />}
                        />
                     </div>
                     <div className="xl:mt-32">
                        <TriadCard
                            title="STopic"
                            code="hcs-16:ID:2"
                            desc="State. The memory layer. Cryptographic proofs (HCS-17), membership changes, and epoch transitions."
                            color="#48df7b"
                            icon={<FaDatabase />}
                        />
                     </div>
                 </div>
             </div>
        </section>

        {/* 4. NETWORK FORMATION */}
        <section className="py-24 bg-white dark:bg-[#0a0b10] text-gray-900 dark:text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[#a679f0]/5 skew-y-3 transform origin-top-left" />
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <div className="grid xl:grid-cols-2 gap-16 items-center">
                    <div>
                        <SectionHeader title="Network Formation." subtitle="LIFECYCLE" color="purple" />
                        <div className="space-y-8 border-l-2 border-gray-200 dark:border-white/10 ml-6 pl-8 relative">
                            {[
                                { title: "Discovery", desc: "Agents find each other via HCS-18 or HCS-10 registries." },
                                { title: "Formation", desc: "Initiator creates the Flora account with a KeyList threshold (e.g. 2-of-3)." },
                                { title: "Provisioning", desc: "Three topics are created. Admin key is the Flora threshold key. Submit key is 1-of-N." },
                                { title: "Activation", desc: "Members post `flora_created` to CTopic to confirm participation." }
                            ].map((step, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[52px] top-0 w-8 h-8 bg-[#a679f0] rounded-full flex items-center justify-center font-bold text-black border-2 border-white dark:border-black text-sm">{i + 1}</div>
                                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-base">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-[#0f0f16] p-16 rounded-[4rem] border border-gray-200 dark:border-white/10 shadow-2xl relative">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#a679f0]/20 rounded-full blur-3xl" />
                        <div className="text-gray-500 mb-8 font-mono text-lg uppercase tracking-widest">// FLORA PROFILE (HCS-11 EXTENSION)</div>
                        <Terminal title="flora-profile.json" className="h-full">
                            <Terminal.Line command='cat flora-profile.json | jq .' />
                            <Terminal.Line output='{' type="output" />
                            <Terminal.Line output='  "type": 3,' type="output" />
                            <Terminal.Line output='  "display_name": "DeFi DAO #1",' type="output" />
                            <Terminal.Line output='  "threshold": 2,' type="output" />
                            <Terminal.Line output='  "members": [' type="output" />
                            <Terminal.Line output='    { "accountId": "0.0.111" },' type="output" />
                            <Terminal.Line output='    { "accountId": "0.0.222" },' type="output" />
                            <Terminal.Line output='    { "accountId": "0.0.333" }' type="output" />
                            <Terminal.Line output='  ],' type="output" />
                            <Terminal.Line output='  "topics": {' type="output" />
                            <Terminal.Line output='    "communication": "0.0.888",' type="output" />
                            <Terminal.Line output='    "transaction": "0.0.889",' type="output" />
                            <Terminal.Line output='    "state": "0.0.890"' type="output" />
                            <Terminal.Line output='  },' type="output" />
                            <Terminal.Line output='  "policies": {' type="output" />
                            <Terminal.Line output='    "membership": "2/3"' type="output" />
                            <Terminal.Line output='  }' type="output" />
                            <Terminal.Line output='}' type="output" />
                        </Terminal>
                    </div>
                </div>
            </div>
        </section>

        {/* 5. HCS-17: STATE */}
        <section className="py-24 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <SectionHeader title="Composite State Hash." subtitle="HCS-17" color="green" />
                 <div className="grid xl:grid-cols-2 gap-16">
                     <div>
                         <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                             How do you trust a decentralized organism? You verify its Pulse.
                             <strong>HCS-17</strong> defines a deterministic method for calculating a "State Hash" (SHA-384).
                         </p>
                         <p className="text-base text-gray-500 mb-6">
                             For Floras, this is recursive:
                         </p>
                         <div className="p-6 bg-gray-50 dark:bg-[#0f0f16] rounded-2xl border border-gray-200 dark:border-white/10">
                             <code className="text-base font-mono text-[#48df7b]">SHA384( Σ(Members) | Σ(Topics) | KeyFP )</code>
                         </div>
                     </div>
                     <div>
                         <div className="bg-white dark:bg-black p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl">
                             <h4 className="font-bold mb-6 text-xl">Algorithm Breakdown</h4>
                             <ul className="space-y-4 text-base text-gray-600 dark:text-gray-400">
                                 <li className="flex gap-4"><FaCheckDouble className="text-[#48df7b] mt-1 text-lg" /> 1. Sort & Hash Member States (Petals)</li>
                                 <li className="flex gap-4"><FaCheckDouble className="text-[#48df7b] mt-1 text-lg" /> 2. Sort & Hash Topic Running Hashes</li>
                                 <li className="flex gap-4"><FaCheckDouble className="text-[#48df7b] mt-1 text-lg" /> 3. Combine with Threshold Key Fingerprint</li>
                             </ul>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* 6. GOVERNANCE & VOTING */}
        <section className="py-24 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0a0b10]">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1200px] text-center">
                <FaVoteYea className="text-5xl text-[#a679f0] mx-auto mb-6" />
                <h3 className="text-4xl md:text-5xl font-bold mb-6">On-Chain Governance.</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                    Members vote on proposals (like adding a new member) by posting `flora_join_vote` messages to the CTopic.
                    Everything is transparent. Everything is auditable.
                </p>
                <div className="text-left max-w-3xl mx-auto">
                    <Terminal title="vote-message.json">
                        <Terminal.Line command='cat vote-message.json | jq .' />
                        <Terminal.Line output='{' type="output" />
                        <Terminal.Line output='  "p": "hcs-16",' type="output" />
                        <Terminal.Line output='  "op": "flora_join_vote",' type="output" />
                        <Terminal.Line output='  "account_id": "0.0.999",' type="output" />
                        <Terminal.Line output='  "approve": true,' type="output" />
                        <Terminal.Line output='  "operator_id": "0.0.123@0.0.777",' type="output" />
                        <Terminal.Line output='  "connection_request_id": 51234' type="output" />
                        <Terminal.Line output='}' type="output" />
                    </Terminal>
                </div>
            </div>
        </section>

        {/* 7. TREASURY & DISSOLUTION */}
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <div className="grid xl:grid-cols-2 gap-12">
                    <div className="p-8 bg-gradient-to-br from-[#5599fe]/10 to-transparent rounded-3xl border border-[#5599fe]/20">
                        <FaCoins className="text-4xl text-[#5599fe] mb-6" />
                        <h3 className="text-3xl font-bold mb-4">Shared Treasury.</h3>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                            The Flora account holds HBAR, Tokens, and NFTs. No single member can move funds. All transfers require a <strong>Scheduled Transaction</strong> approved by T members.
                        </p>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl border border-red-500/20">
                        <FaTrashAlt className="text-4xl text-red-500 mb-6" />
                        <h3 className="text-3xl font-bold mb-4">Graceful Exit.</h3>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                            When a Flora's mission is complete, members can vote to dissolve. This involves draining assets, dissociating tokens, and executing an `AccountDeleteTransaction`.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* 8. SDK EXAMPLES */}
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <SectionHeader title="Build with the SDK." subtitle="DEVELOPER TOOLS" color="purple" />

                <div className="grid xl:grid-cols-2 gap-12 mt-12">
                    <div>
                        <h4 className="text-xl font-bold mb-4 text-[#a679f0]">Create Flora</h4>
                        <Terminal title="create-flora.ts">
                            <Terminal.Line command="import { Flora } from '@hashgraph/standards';" />
                            <Terminal.Line output="" />
                            <Terminal.Line command="await Flora.create(client, {" />
                            <Terminal.Line command="    members: [key1, key2, key3]," />
                            <Terminal.Line command="    threshold: 2," />
                            <Terminal.Line command="    initialBalance: 20" />
                            <Terminal.Line command="});" />
                        </Terminal>
                    </div>


                    <div>
                        <h4 className="text-xl font-bold mb-4 text-[#5599fe]">Propose Transaction</h4>
                        <Terminal title="propose-tx.ts">
                            <Terminal.Line command="await Flora.proposeTransaction(client, floraId, {" />
                            <Terminal.Line command="    tx: transferTx," />
                            <Terminal.Line command='    description: "Pay vendor"' />
                            <Terminal.Line command="});" />
                        </Terminal>
                    </div>
                </div>
            </div>
        </section>

        {/* 9. LIVE EXAMPLE */}
        <section className="py-24 relative z-10 bg-gradient-to-br from-[#5599fe]/5 via-transparent to-[#a679f0]/5">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <SectionHeader title="See It In Action." subtitle="LIVE DEMO" color="purple" />

                <div className="grid xl:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#48df7b]/10 border border-[#48df7b]/30 text-[#48df7b] text-xs font-mono font-bold tracking-[0.2em] mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#48df7b] animate-pulse" />
                            WORKING IMPLEMENTATION
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                            Flora Price Oracle
                        </h3>

                        <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            A complete, production-ready Flora implementation that demonstrates HCS-15/16/17 in action.
                            Three Petal nodes reach consensus on HBAR/USD prices using real adapters and HCS-17 state proofs.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#5599fe]/20 flex items-center justify-center text-[#5599fe] flex-shrink-0">
                                    <FaNetworkWired />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base mb-1 text-gray-900 dark:text-white">Full Stack Implementation</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Dockerized setup with Petals, consumer, Postgres, and real-time dashboard</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#a679f0]/20 flex items-center justify-center text-[#a679f0] flex-shrink-0">
                                    <FaBolt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base mb-1 text-gray-900 dark:text-white">Real-Time Consensus</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Watch HCS-17 proofs land on testnet with ~2s cadence</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#48df7b]/20 flex items-center justify-center text-[#48df7b] flex-shrink-0">
                                    <FaDatabase />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base mb-1 text-gray-900 dark:text-white">Production Patterns</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Standards SDK integration, adapter registry, and state verification</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton
                                href="https://github.com/hashgraph-online/flora-price-oracle"
                                className="!text-base !px-8 !py-4 shadow-2xl rounded-xl flex items-center justify-center gap-2"
                            >
                                EXPLORE ON GITHUB <FaBolt />
                            </PrimaryButton>
                            <SecondaryButton
                                href="/docs/tutorials/floras"
                                className="!text-base !px-8 !py-4 rounded-xl"
                            >
                                VIEW TUTORIALS
                            </SecondaryButton>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0f0f16] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl">
                        <div className="text-gray-500 mb-6 font-mono text-sm uppercase tracking-widest">// DEMO ARCHITECTURE</div>
                        <div className="space-y-6">
                            <div className="p-6 bg-gray-50 dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-white/10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-[#5599fe]" />
                                    <span className="font-mono text-sm text-[#5599fe]">3 PETAL NODES</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Binance, CoinGecko, Hedera Rate adapters</p>
                            </div>

                            <div className="p-6 bg-gray-50 dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-white/10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-[#a679f0]" />
                                    <span className="font-mono text-sm text-[#a679f0]">HCS-17 PROOFS</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">State hashes published to consensus topic</p>
                            </div>

                            <div className="p-6 bg-gray-50 dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-white/10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-[#48df7b]" />
                                    <span className="font-mono text-sm text-[#48df7b]">CONSUMER API</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Verifies quorum and serves consensus price</p>
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-br from-[#5599fe]/10 to-[#a679f0]/10 rounded-2xl border border-[#5599fe]/20">
                                <code className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
                                    docker compose up -d
                                    <br />
                                    curl localhost:3000/price/latest
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 10. CTA */}
        <section className="py-24 text-center relative z-10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white dark:bg-[#0f0f16] p-12 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">Form Your Network.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <PrimaryButton href="/docs/libraries/standards-sdk" className="!text-base !px-8 !py-4 shadow-2xl rounded-xl">
                            START BUILDING
                        </PrimaryButton>
                        <SecondaryButton href="https://hol.org/points" className="!text-base !px-8 !py-4 rounded-xl">
                            COLLECT POINTS
                        </SecondaryButton>
                    </div>
                </motion.div>
            </div>
        </section>

      </div>
    </Layout>
  );
}