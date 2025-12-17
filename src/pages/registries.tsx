import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaProjectDiagram, FaDatabase, FaCodeBranch, FaSearch, FaHistory, FaClock, FaArrowRight, FaNetworkWired, FaSitemap, FaGlobe, FaServer, FaCogs, FaArrowDown } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import CodeSnippet from '../components/CodeSnippet';
import Terminal from '../components/ui/Terminal';

// --- VISUAL COMPONENTS ---

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#a679f0] origin-left z-[100]" style={{ scaleX }} />;
};

const RegistryNode = ({ x, y, size, delay, color }: { x: number, y: number, size: number, delay: number, color: string }) => (
    <motion.div
        className="absolute rounded-full flex items-center justify-center z-10 shadow-2xl"
        style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, border: `2px solid ${color}` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "backOut" }}
    >
        <div className="absolute inset-0 bg-white dark:bg-[#0a0b14] rounded-full opacity-90 backdrop-blur-sm" />
        <motion.div 
            className="w-[40%] h-[40%] rounded-full relative z-20"
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        />
        <motion.div 
            className="absolute inset-[-10px] border border-dashed rounded-full"
            style={{ borderColor: color, opacity: 0.3 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
        />
    </motion.div>
);

const ConnectionLine = ({ x1, y1, x2, y2, color, delay }: { x1: number, y1: number, x2: number, y2: number, color: string, delay: number }) => {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.line
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke={color}
                strokeWidth="2"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay, ease: "easeInOut" }}
            />
        </svg>
    )
}

const RegistriesHeroVisual = () => {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center overflow-visible perspective-[1000px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(166,121,240,0.1),transparent_70%)] blur-3xl" />
      
      {/* 3D Container */}
      <motion.div 
        animate={{ rotateY: [0, 10, 0], rotateX: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[800px] h-[600px] [transform-style:preserve-3d]"
      >
          <RegistryNode x={50} y={50} size={100} delay={0} color="#a679f0" /> 
          
          <RegistryNode x={20} y={30} size={60} delay={0.5} color="#5599fe" />
          <RegistryNode x={80} y={30} size={60} delay={0.7} color="#5599fe" />
          <RegistryNode x={20} y={70} size={60} delay={0.9} color="#5599fe" />
          <RegistryNode x={80} y={70} size={60} delay={1.1} color="#5599fe" />
          
          <ConnectionLine x1={50} y1={50} x2={20} y2={30} color="#a679f0" delay={0.2} />
          <ConnectionLine x1={50} y1={50} x2={80} y2={30} color="#a679f0" delay={0.4} />
          <ConnectionLine x1={50} y1={50} x2={20} y2={70} color="#a679f0" delay={0.6} />
          <ConnectionLine x1={50} y1={50} x2={80} y2={70} color="#a679f0" delay={0.8} />

          {/* Sub-nodes */}
          {[...Array(8)].map((_, i) => (
              <RegistryNode 
                key={i}
                x={10 + Math.random() * 80} 
                y={10 + Math.random() * 80} 
                size={30} 
                delay={1.5 + i * 0.1} 
                color={i % 2 === 0 ? "#48df7b" : "#5599fe"} 
              />
          ))}
      </motion.div>
    </div>
  );
};

const OpVisual = ({ op, color, desc }: { op: string, color: string, desc: string }) => (
    <div className="relative p-12 bg-white dark:bg-[#0f0f16] rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden group hover:border-opacity-50 transition-all duration-500" style={{ borderColor: `${color}30` }}>
        <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl group-hover:opacity-10 transition-opacity font-bold" style={{ color }}>
            {op[0].toUpperCase()}
        </div>
        <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg mb-8 text-2xl" style={{ backgroundColor: color }}>
                {op[0].toUpperCase()}
            </div>
            <h4 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white capitalize">{op}</h4>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
    </div>
);

const SectionHeader = ({ title, subtitle, color = "purple" }: { title: string, subtitle: string, color?: "blue" | "purple" | "green" }) => {
    const colorHex = color === "blue" ? "#5599fe" : color === "purple" ? "#a679f0" : "#48df7b";
    return (
        <div className="mb-24">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
            >
                <span className="w-16 h-1 rounded-full" style={{ backgroundColor: colorHex }} />
                <span className="text-lg font-mono tracking-[0.2em] font-bold uppercase" style={{ color: colorHex }}>{subtitle}</span>
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-[0.9]"
            >
                {title}
            </motion.h2>
        </div>
    );
};

// --- MAIN PAGE ---

export default function RegistriesPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Layout title="HCS-2 Registries" description="The Nervous System of the Hashgraph.">
      <div className='min-h-screen bg-white dark:bg-[#050505] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#a679f0] selection:text-white transition-colors duration-300'>
        <ScrollProgress />

        {/* Background Effects */}
        <div className='fixed inset-0 pointer-events-none z-0'>
            <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[#a679f0]/5 rounded-full blur-[180px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#5599fe]/5 rounded-full blur-[180px]" />
            <div className='absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-30 brightness-100 contrast-150 mix-blend-overlay' />
        </div>

        {/* 1. HERO SECTION - Full Height */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px] relative z-10">
                 <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* DROPDOWN MENU */}
                        <div className="relative inline-block text-left mb-12 z-50">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#a679f0]/10 border border-[#a679f0]/30 text-[#a679f0] text-sm font-mono font-bold tracking-[0.2em] hover:bg-[#a679f0]/20 transition-colors"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#a679f0] animate-pulse" />
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

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-6">
                            STRUCTURED <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#a679f0] animate-gradient-x">CONSENSUS.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed border-l-4 border-[#a679f0] pl-6">
                            <strong>HCS-2 Registries</strong> turn the consensus stream into structured databases.
                            Build file systems, identity graphs, and recursive applications without smart contracts.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton href="/docs/standards/hcs-2" className="!text-base !px-8 !py-4 shadow-2xl shadow-purple-500/20 rounded-xl flex items-center justify-center gap-2">
                                READ STANDARD <FaArrowRight />
                            </PrimaryButton>
                            <SecondaryButton href="https://hol.org/points" className="!text-base !px-8 !py-4 !border-[#a679f0] !text-[#a679f0] hover:!bg-[#a679f0] hover:!text-white rounded-xl">
                                COLLECT POINTS
                            </SecondaryButton>
                        </div>
                    </motion.div>

                    <div className="relative hidden lg:flex items-center justify-center">
                        <RegistriesHeroVisual />
                    </div>
                 </div>
             </div>

             {/* Scroll Indicator */}
             <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#a679f0] text-3xl opacity-50"
             >
                 <FaArrowDown />
             </motion.div>
        </section>

        {/* 2. THE CONCEPT - Split View */}
        <section className="py-64 relative z-10 bg-white dark:bg-[#050505]/80 backdrop-blur-3xl border-t border-b border-gray-200 dark:border-white/5">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px]">
                 <div className="grid xl:grid-cols-2 gap-48">
                     <div className="sticky top-48 h-fit">
                         <SectionHeader title="The Log is the Database." subtitle="CONCEPT" color="blue" />
                         <p className="text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                             In traditional databases, you update a record and the old state is gone. On Hedera Consensus Service, history is immutable.
                         </p>
                         <div className="p-10 bg-[#a679f0]/10 border border-[#a679f0]/30 rounded-3xl">
                             <p className="text-xl text-gray-900 dark:text-white leading-relaxed font-bold">
                                 HCS-2 defines a standard way to interpret a stream of messages as a coherent state machine. It is the glue that binds disparate HCS topics into logical applications.
                             </p>
                         </div>
                     </div>
                     <div className="space-y-16">
                         {[
                             { title: "Deterministic State", desc: "Anyone replay the log from the beginning arrives at the exact same current state. No central server required." },
                             { title: "Verifiable History", desc: "Every change is timestamped and signed. You can prove exactly when a user updated their profile or deleted a file." },
                             { title: "Lightweight Indexing", desc: "Mirror nodes do the heavy lifting. Clients just query the topic messages and apply the HCS-2 rules." }
                         ].map((item, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="p-16 rounded-[3rem] bg-gray-50 dark:bg-[#0f0f16] border border-gray-200 dark:border-white/5 hover:border-[#a679f0]/50 transition-colors group shadow-xl"
                             >
                                 <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{item.title}</h3>
                                 <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                             </motion.div>
                         ))}
                     </div>
                 </div>
             </div>
        </section>

        {/* 3. SCHEMA DEEP DIVE - Wide */}
        <section className="py-64 relative z-10 overflow-hidden">
             <div className="absolute inset-0 bg-gray-50 dark:bg-[#0a0b10] skew-y-2 transform origin-top-left -z-10 scale-110" />
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px]">
                 <SectionHeader title="Strict Typing." subtitle="SCHEMA" color="purple" />
                 
                 <div className="grid xl:grid-cols-2 gap-32 mt-32">
                     <div>
                         <p className="text-2xl text-gray-600 dark:text-gray-400 mb-16 leading-relaxed">
                             Every message in an HCS-2 registry must follow a precise JSON schema. This ensures interoperability across the entire ecosystem.
                         </p>
                         <div className="bg-white dark:bg-black p-12 rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-2xl">
                             <div className="space-y-8 font-mono text-lg">
                                 <div className="flex gap-8 border-b border-gray-200 dark:border-white/10 pb-4">
                                     <span className="text-[#a679f0] w-24">p</span>
                                     <span className="text-gray-600 dark:text-gray-400">Protocol. Always "hcs-2".</span>
                                 </div>
                                 <div className="flex gap-8 border-b border-gray-200 dark:border-white/10 pb-4">
                                     <span className="text-[#5599fe] w-24">op</span>
                                     <span className="text-gray-600 dark:text-gray-400">Operation. register | update | delete.</span>
                                 </div>
                                 <div className="flex gap-8 border-b border-gray-200 dark:border-white/10 pb-4">
                                     <span className="text-[#a679f0] w-24">t_id</span>
                                     <span className="text-gray-600 dark:text-gray-400">Target Topic ID (The Pointer).</span>
                                 </div>
                                 <div className="flex gap-8 pb-4">
                                     <span className="text-[#5599fe] w-24">uid</span>
                                     <span className="text-gray-600 dark:text-gray-400">Unique Identifier for updates.</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className="relative">
                         <div className="absolute -top-12 -left-12 text-gray-200 dark:text-white/5 text-9xl z-0"><FaCodeBranch /></div>
                         <div className="relative z-10">
                             <CodeSnippet code={`{
  "p": "hcs-2",
  "op": "register",
  "t_id": "0.0.123456",
  "metadata": "hcs://1/0.0.987654",
  "m": "User Profile v1"
}`} language="json" />
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* 4. CRUD OPERATIONS */}
        <section className="py-64 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px]">
                 <SectionHeader title="CRUD on Consensus." subtitle="OPERATIONS" color="green" />
                 
                 <div className="grid xl:grid-cols-3 gap-16 mt-24">
                     <OpVisual 
                        op="register" 
                        color="#48df7b" 
                        desc="Adds a new entry. Think of this like adding a row to a database table or a file to a folder. The t_id points to content."
                     />
                     <OpVisual 
                        op="update" 
                        color="#5599fe" 
                        desc="Modifies an existing entry by referencing its uid. The history remains, but the current state points to the new topic."
                     />
                     <OpVisual 
                        op="delete" 
                        color="#a679f0" 
                        desc="Soft delete. Removes an entry from the active set. Indexers stop serving content, but the record remains."
                     />
                 </div>
             </div>
        </section>

        {/* 5. MODES OF OPERATION - Full Width */}
        <section className="py-64 bg-[#0a0b10] text-white">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px]">
                 <div className="grid lg:grid-cols-2 gap-32 items-center">
                     <div>
                         <h2 className="text-6xl md:text-8xl font-bold mb-12 text-white">Two Modes.</h2>
                         <p className="text-2xl text-gray-400 leading-relaxed mb-16">
                             Defined by the Topic Memo Enum, HCS-2 registries can behave in two distinct ways to suit different use cases.
                         </p>
                         <div className="flex gap-4">
                             <div className="px-6 py-3 bg-[#5599fe]/20 rounded-full text-[#5599fe] font-mono">ENUM 0</div>
                             <div className="px-6 py-3 bg-[#a679f0]/20 rounded-full text-[#a679f0] font-mono">ENUM 1</div>
                         </div>
                     </div>
                     <div className="grid gap-12">
                         <div className="p-12 border border-[#5599fe]/30 bg-[#5599fe]/5 rounded-[3rem]">
                             <h4 className="text-3xl font-bold mb-4 text-[#5599fe]">Indexed (Accumulator)</h4>
                             <p className="text-xl text-gray-400">All messages matter. Order matters. Use for chat logs, activity feeds, and audit trails.</p>
                         </div>
                         <div className="p-12 border border-[#a679f0]/30 bg-[#a679f0]/5 rounded-[3rem]">
                             <h4 className="text-3xl font-bold mb-4 text-[#a679f0]">Non-Indexed (Pointer)</h4>
                             <p className="text-xl text-gray-400">Only the last message matters. Use for mutable configurations, Dynamic NFTs (HCS-6), and current status.</p>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* 6. RECURSIVE ARCHITECTURE */}
        <section className="py-64 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px]">
                 <div className="grid lg:grid-cols-2 gap-32 items-center">
                     <div className="order-2 lg:order-1">
                         <SectionHeader title="Infinite Depth." subtitle="RECURSION" color="blue" />
                         <p className="text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                             The power of HCS-2 lies in its ability to nest. A registry can contain a topic ID that is <em>also</em> a registry.
                         </p>
                         <p className="text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                             This creates a <strong>Merkle-like DAG (Directed Acyclic Graph)</strong> on the consensus layer. You can build entire folder structures, social graphs, or organizational hierarchies.
                         </p>
                         
                         {/* Practical Example */}
                         <div className="bg-white dark:bg-black p-12 rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-2xl mt-12">
                             <h4 className="text-xl font-bold mb-6 text-[#a679f0] uppercase tracking-widest">Practical Example: Organization Tree</h4>
                             <div className="flex flex-col gap-6 font-mono text-lg">
                                 <div className="flex items-center gap-4 text-[#a679f0]">
                                     <FaSitemap /> 
                                     <span>Root Registry (Company)</span>
                                     <span className="text-sm text-gray-500 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">0.0.100</span>
                                 </div>
                                 <div className="pl-12 border-l-2 border-gray-300 dark:border-white/20 ml-2 space-y-6">
                                     <div className="flex flex-col gap-2">
                                         <div className="flex items-center gap-4">
                                             <FaArrowRight className="text-sm text-gray-400" /> 
                                             <span className="text-[#5599fe]">Engineering Dept</span>
                                             <span className="text-sm text-gray-500 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">0.0.200</span>
                                         </div>
                                         <div className="pl-12 text-sm text-gray-500">
                                             <code>{`{ op: "register", t_id: "0.0.200", m: "Eng Dept" }`}</code> (On Root Topic)
                                         </div>
                                     </div>
                                     
                                     <div className="pl-12 border-l-2 border-gray-300 dark:border-white/20 ml-2 space-y-4">
                                         <div className="flex items-center gap-4">
                                             <div className="w-3 h-3 bg-[#48df7b] rounded-full" /> 
                                             <span>Apollo Project (Docs)</span>
                                             <span className="text-sm text-gray-500 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">0.0.300</span>
                                         </div>
                                         <div className="pl-8 text-sm text-gray-500">
                                             <code>{`{ op: "register", t_id: "0.0.300", m: "Apollo" }`}</code> (On Eng Topic)
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className="order-1 lg:order-2 h-[800px] bg-gray-900 rounded-[4rem] border border-white/10 overflow-hidden relative shadow-2xl flex items-center justify-center">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(85,153,254,0.1),transparent_70%)]" />
                         <FaNetworkWired className="text-[20rem] text-[#5599fe] opacity-20" />
                     </div>
                 </div>
             </div>
        </section>

        {/* 7. MIGRATION */}
        <section className="py-64 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0a0b10]">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px]">
                <h3 className="text-6xl font-bold mb-24 text-center">Migration Paths.</h3>
                <div className="grid xl:grid-cols-3 gap-16">
                    <div className="p-16 bg-white dark:bg-black rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-xl">
                        <FaGlobe className="text-6xl text-[#5599fe] mb-8" />
                        <h4 className="text-3xl font-bold mb-4">Topic Rotation</h4>
                        <p className="text-xl text-gray-500">Keys compromised? Post a <code>migrate</code> op pointing to a new secure topic. Clients follow the breadcrumbs.</p>
                    </div>
                    <div className="p-16 bg-white dark:bg-black rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-xl">
                        <FaServer className="text-6xl text-[#a679f0] mb-8" />
                        <h4 className="text-3xl font-bold mb-4">Snapshotting</h4>
                        <p className="text-xl text-gray-500">Registry too large? Create a new topic with the current state as the genesis message. Link old history.</p>
                    </div>
                    <div className="p-16 bg-white dark:bg-black rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-xl">
                        <FaCogs className="text-6xl text-[#48df7b] mb-8" />
                        <h4 className="text-3xl font-bold mb-4">Forking</h4>
                        <p className="text-xl text-gray-500">Community disagreement? Anyone can read the public topic and create a divergent registry starting from block N.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 8. SDK EXAMPLES */}
        <section className="py-64 relative z-10">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px]">
                <SectionHeader title="Build with the SDK." subtitle="DEVELOPER TOOLS" color="purple" />
                
                <div className="grid xl:grid-cols-2 gap-24 mt-24">
                    <div>
                        <h4 className="text-3xl font-bold mb-8 text-[#a679f0]">Create Registry</h4>
                        <Terminal title="create-registry.ts">
                            <Terminal.Line command="import { HCS2 } from '@hashgraph/standards';" />
                            <Terminal.Line output="" />
                            <Terminal.Line command="const regId = await HCS2.createRegistry(client, {" />
                            <Terminal.Line command="    adminKey: myKey," />
                            <Terminal.Line command="    submitKey: myKey," />
                            <Terminal.Line command='    memo: "My Registry"' />
                            <Terminal.Line command="});" />
                        </Terminal>
                    </div>
                    
                    <div>
                        <h4 className="text-3xl font-bold mb-8 text-[#5599fe]">Register Entry</h4>
                        <Terminal title="register.ts">
                            <Terminal.Line command="await HCS2.register(client, regId, {" />
                            <Terminal.Line command='    t_id: "0.0.12345",' />
                            <Terminal.Line command='    metadata: "hcs://1/0.0.999",' />
                            <Terminal.Line command='    memo: "New Item"' />
                            <Terminal.Line command="});" />
                        </Terminal>
                    </div>
                </div>
            </div>
        </section>

        {/* 9. CTA */}
        <section className="py-64 text-center relative z-10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-white dark:bg-[#0f0f16] p-24 rounded-[4rem] border border-gray-200 dark:border-white/10 shadow-2xl"
                >
                    <h2 className="text-7xl md:text-9xl font-bold mb-12 text-gray-900 dark:text-white">Start Indexing.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-8">
                        <PrimaryButton href="https://hol.org/registry/search" className="!text-2xl !px-16 !py-8 shadow-2xl rounded-2xl">
                            SEARCH REGISTRY
                        </PrimaryButton>
                        <SecondaryButton href="https://hol.org/points" className="!text-2xl !px-16 !py-8 rounded-2xl">
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
