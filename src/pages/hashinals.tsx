import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaCube, FaLayerGroup, FaBolt, FaFingerprint, FaCode, FaCompressArrowsAlt, FaPuzzlePiece, FaDatabase, FaArrowDown, FaLink, FaHistory, FaArrowRight } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Terminal from '../components/ui/Terminal';
import CodeSnippet from '../components/CodeSnippet';

// --- VISUAL COMPONENTS ---

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#48df7b] via-[#5599fe] to-[#a679f0] origin-left z-[100]" style={{ scaleX }} />;
};

const HeroCube = () => {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center perspective-[2000px] overflow-visible">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 perspective-[1000px] opacity-20 dark:opacity-10">
         <motion.div 
            animate={{ rotateX: [20, 25, 20], translateY: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="w-[200%] h-[200%] -ml-[50%] -mt-[25%] bg-[linear-gradient(to_right,#48df7b_1px,transparent_1px),linear-gradient(to_bottom,#48df7b_1px,transparent_1px)] bg-[size:6rem_6rem] [transform-style:preserve-3d] [transform:rotateX(60deg)]"
         />
      </div>

      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#48df7b]/20 via-transparent to-[#3f4174]/40 blur-[150px] rounded-full mix-blend-screen opacity-60" />

      {/* CUBE */}
      <div className="relative z-10 w-[400px] h-[400px] flex items-center justify-center [transform-style:preserve-3d]">
        <motion.div 
            animate={{ rotateY: 360, rotateZ: 45 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="relative w-64 h-64 [transform-style:preserve-3d]"
        >
            {[...Array(6)].map((_, i) => {
                const rotate = [
                    'rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'
                ][i];
                return (
                    <div key={i} className="absolute inset-0 bg-[#48df7b]/5 border-2 border-[#48df7b]/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(72,223,123,0.2)]" style={{ transform: `${rotate} translateZ(128px)` }}>
                        <div className="w-32 h-32 border border-[#48df7b]/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#48df7b] rounded-full" />
                        </div>
                    </div>
                );
            })}
        </motion.div>
      </div>
    </div>
  );
};

const PipelineVisual = () => {
    return (
        <div className="w-full h-80 bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 rounded-[3rem] flex items-center justify-between px-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(72,223,123,0.05)_50%,transparent_100%)] animate-scan-slow" />
            
            {/* Stage 1: Raw */}
            <div className="relative z-10 flex flex-col items-center gap-6 group">
                <div className="w-40 h-40 bg-gray-50 dark:bg-[#1a1f3a] border-4 border-gray-300 dark:border-white/20 rounded-3xl flex items-center justify-center shadow-xl group-hover:border-[#48df7b] transition-all duration-500 transform group-hover:scale-105">
                    <div className="text-6xl text-gray-400 group-hover:text-[#48df7b] transition-colors font-mono">01</div>
                </div>
                <span className="text-lg font-mono font-bold tracking-widest text-gray-500 group-hover:text-[#48df7b]">RAW.BIN</span>
            </div>

            {/* Pipe 1 */}
            <div className="flex-1 h-3 bg-gray-200 dark:bg-white/10 mx-8 relative overflow-hidden rounded-full">
                <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#48df7b] to-transparent"
                />
            </div>

            {/* Stage 2: Compressed */}
            <div className="relative z-10 flex flex-col items-center gap-6 group">
                <div className="w-32 h-32 bg-[#48df7b]/10 border-4 border-[#48df7b] rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(72,223,123,0.3)] transform group-hover:rotate-12 transition-transform duration-500">
                    <FaCompressArrowsAlt className="text-5xl text-[#48df7b]" />
                </div>
                <span className="text-lg font-mono font-bold tracking-widest text-[#48df7b]">ZSTD / BROTLI</span>
            </div>

            {/* Pipe 2 */}
            <div className="flex-1 h-3 bg-gray-200 dark:bg-white/10 mx-8 relative overflow-hidden rounded-full">
                <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5599fe] to-transparent"
                />
            </div>

            {/* Stage 3: Chunked */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="flex gap-3">
                    {[1,2,3].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                            className="w-10 h-16 bg-[#5599fe]/10 border-2 border-[#5599fe] rounded-lg flex items-center justify-center"
                        >
                            <div className="w-2 h-2 bg-[#5599fe] rounded-full" />
                        </motion.div>
                    ))}
                </div>
                <span className="text-lg font-mono font-bold tracking-widest text-[#5599fe]">CHUNKS</span>
            </div>
        </div>
    )
}

const TokenBindingVisual = () => {
    return (
        <div className="relative w-full max-w-6xl mx-auto py-24">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-white to-gray-100 dark:from-[#1a1b2e] dark:to-black border-4 border-[#48df7b] rounded-3xl flex flex-col items-center justify-center shadow-[0_0_60px_rgba(72,223,123,0.3)]">
                        <div className="w-24 h-24 bg-[#48df7b]/20 rounded-2xl mb-4 flex items-center justify-center">
                            <FaFingerprint className="text-5xl text-[#48df7b]" />
                        </div>
                        <div className="text-xs md:text-sm text-[#48df7b] font-mono font-bold tracking-widest">HCS-1 FILE</div>
                        <div className="mt-2 font-mono text-xs text-gray-500">0.0.456789</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-[#1a1f3a] border-2 border-[#5599fe] flex items-center justify-center shadow-lg">
                        <FaLink className="text-2xl text-[#5599fe]" />
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-mono text-[#5599fe] mb-1">HCS-5 BINDING</div>
                        <div className="text-xs text-gray-500 max-w-[120px]">Permanent on-chain link</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative"
                >
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-white dark:bg-[#1a1f3a] border-4 border-[#5599fe] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(85,153,254,0.4)]">
                        <div className="text-center">
                            <div className="text-xs md:text-sm font-bold text-gray-500 tracking-widest mb-2">HTS TOKEN</div>
                            <div className="text-[#5599fe] font-mono text-3xl md:text-4xl font-bold">#123</div>
                            <div className="mt-2 text-xs text-gray-500">NFT Serial</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-16 text-center max-w-2xl mx-auto"
            >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#5599fe]/10 border border-[#5599fe]/30">
                    <span className="font-mono text-sm">hcs://1/0.0.456789</span>
                    <FaArrowRight className="text-[#5599fe]" />
                    <span className="font-mono text-sm">NFT Metadata</span>
                </div>
            </motion.div>
        </div>
    )
}

const MutablePointerVisual = () => {
    return (
        <div className="w-full h-full min-h-[400px] relative bg-gray-50 dark:bg-[#1a1f3a] rounded-[3rem] border border-gray-200 dark:border-white/10 overflow-hidden p-16 flex flex-col xl:flex-row items-center justify-between gap-16 shadow-inner">
            {/* Token */}
            <div className="w-64 h-64 bg-white dark:bg-[#1a1f3a] border-[4px] border-[#a679f0] rounded-[2rem] flex flex-col items-center justify-center relative z-10 shadow-[0_0_60px_rgba(166,121,240,0.3)]">
                <span className="text-[#a679f0] font-bold mb-4 text-2xl">HCS-6 Token</span>
                <div className="px-6 py-3 bg-[#a679f0]/10 rounded-xl text-lg font-mono font-bold">ptr: 0.0.99</div>
                <div className="absolute -right-16 top-1/2 w-16 h-1.5 bg-[#a679f0]" />
            </div>

            {/* Registry */}
            <div className="flex-1 h-64 bg-white dark:bg-white/5 border-4 border-dashed border-gray-300 dark:border-white/20 rounded-[2rem] flex items-center justify-center relative">
                <div className="absolute -top-6 left-12 px-6 py-2 bg-[#a679f0] text-white font-bold rounded-full shadow-lg">REGISTRY 0.0.99</div>
                
                <div className="flex flex-col gap-6 w-full px-16">
                    <motion.div 
                        initial={{ opacity: 0.3, scale: 0.95 }}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1, 0.95] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-full h-20 bg-[#a679f0]/20 border-2 border-[#a679f0] rounded-2xl flex items-center justify-between px-8"
                    >
                        <span className="text-lg font-bold text-[#a679f0]">LATEST MSG</span>
                        <span className="font-mono text-lg text-gray-900 dark:text-white">t_id: 0.0.555</span>
                    </motion.div>
                    <div className="w-full h-20 bg-gray-200 dark:bg-white/5 border border-transparent rounded-2xl flex items-center justify-between px-8 opacity-40">
                        <span className="text-lg font-bold text-gray-500">HISTORY</span>
                        <span className="font-mono text-lg text-gray-500">t_id: 0.0.444</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-64 h-64 bg-white dark:bg-[#1a1f3a] border-[4px] border-[#48df7b] rounded-[2rem] flex flex-col items-center justify-center relative z-10 shadow-[0_0_60px_rgba(72,223,123,0.3)]">
                <span className="text-[#48df7b] font-bold mb-4 text-2xl">HCS-1 Content</span>
                <div className="px-6 py-3 bg-[#48df7b]/10 rounded-xl text-lg font-mono font-bold">0.0.555</div>
                <div className="absolute -left-16 top-1/2 w-16 h-1.5 bg-[#48df7b]" />
            </div>
        </div>
    )
}

const SectionHeader = ({ title, subtitle, color = "green" }: { title: string, subtitle: string, color?: "blue" | "purple" | "green" }) => {
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

// --- SECTIONS ---

export default function HashinalsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <Layout title="HCS-1/5/6 Hashinals" description="True on-chain artifacts on Hedera.">
      <div className='min-h-screen bg-white dark:bg-[#1a1f3a] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#48df7b] selection:text-[#0a0b14] transition-colors duration-300'>
        <ScrollProgress />
        
        {/* Background Effects */}
        <div className='fixed inset-0 pointer-events-none z-0'>
            <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[#48df7b]/5 rounded-full blur-[180px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#5599fe]/5 rounded-full blur-[180px]" />
            <div className='absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-30 brightness-100 contrast-150 mix-blend-overlay' />
        </div>

        {/* 1. HERO SECTION - Full Height */}
        <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px] relative z-10">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* DROPDOWN MENU */}
                        <div className="relative inline-block text-left mb-6 z-50">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#48df7b]/10 border border-[#48df7b]/30 text-[#48df7b] text-sm font-mono font-bold tracking-[0.2em] hover:bg-[#48df7b]/20 transition-colors"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#48df7b] animate-pulse" />
                                STANDARDS
                                <FaArrowDown className={`ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden origin-top-left animate-fade-in-down">
                                    <div className="py-2">
                                        <Link to="/standards" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Standards Overview</Link>
                                        <Link to="/docs/intro" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Standards Library</Link>
                                        <Link to="/tutorials" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Tutorials</Link>
                                        <div className="h-px bg-gray-100 dark:bg-white/5 my-1" />
                                        <Link to="/hashinals" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Files & Hashinals</Link>
                                        <Link to="/registries" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Data Registries</Link>
                                        <Link to="/hcs-14" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Universal Agent Identity</Link>
                                        <Link to="/profiles" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Identity Metadata</Link>
                                        <Link to="/hcs-20" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Auditable Points</Link>
                                        <Link to="/hcs-21" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Adapter Registry</Link>
                                        <Link to="/openconvai" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Agent Communication</Link>
                                        <Link to="/floras" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">AppNet Accounts</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-6">
                            TRUE <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48df7b] via-[#5599fe] to-[#48df7b] animate-gradient-x">ON-GRAPH.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed border-l-4 border-[#48df7b] pl-6">
                            Data sovereignty on the Hashgraph.
                            <br/><br/>
                            <strong>HCS-1</strong> (Files) and <strong>HCS-5</strong> (Hashinals) enable you to inscribe raw data directly into the immutable ledger of Hedera, forever.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton href="/docs/standards/hcs-5" className="!text-base !px-8 !py-4 shadow-2xl shadow-green-500/20 rounded-xl flex items-center justify-center gap-2">
                                READ SPEC <FaBolt />
                            </PrimaryButton>
                            <SecondaryButton href="https://hol.org/points" className="!text-base !px-8 !py-4 !border-[#48df7b] !text-[#48df7b] hover:!bg-[#48df7b] hover:!text-white rounded-xl">
                                COLLECT POINTS
                            </SecondaryButton>
                        </div>
                    </motion.div>

                    <div className="hidden lg:flex items-center justify-center h-[500px]">
                        <HeroCube />
                    </div>
                 </div>
             </div>

             {/* Scroll Indicator */}
             <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#48df7b] text-2xl opacity-50"
             >
                 <FaArrowDown />
             </motion.div>
        </section>

        {/* 2. THE PHILOSOPHY - Split View */}
        <section className="py-24 relative z-10 bg-white dark:bg-[#1a1f3a]/80 backdrop-blur-3xl border-t border-b border-gray-200 dark:border-white/5">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid xl:grid-cols-2 gap-48">
                     <div className="sticky top-48 h-fit">
                         <SectionHeader title="Permanence." subtitle="PHILOSOPHY" color="green" />
                         <p className="text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                             Most NFTs are just receipts pointing to a URL on a centralized server or an IPFS hash that might disappear if not pinned.
                         </p>
                         <div className="p-10 bg-[#48df7b]/10 border border-[#48df7b]/30 rounded-3xl">
                             <p className="text-xl text-gray-900 dark:text-white leading-relaxed font-bold">
                                 HCS-1 Files utilize the high-throughput ordering of the Hedera Consensus Service. While consensus nodes are ephemeral, the data is etched into the immutable record stream, archived by Mirror Nodes, and will be secured by future Block Nodes. It is a 'store once, serve forever' architecture leveraging the economics of transient consensus with the durability of distributed archival.
                             </p>
                         </div>
                     </div>
                     <div className="grid gap-12">
                         {[
                             { icon: <FaDatabase />, title: "Immutability", desc: "Once submitted to HCS, the message is finalized. It cannot be altered or deleted (if keys are burned). It is carved in digital stone." },
                             { icon: <FaLink />, title: "Accessibility", desc: "Data is retrievable via any Mirror Node using standard REST APIs. No special gateways, no API keys, no walled gardens." },
                             { icon: <FaHistory />, title: "Provenance", desc: "Every chunk has a consensus timestamp. You can prove exactly when a file was uploaded, down to the nanosecond." }
                         ].map((item, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="p-12 rounded-[2rem] bg-gray-50 dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/5 hover:border-[#48df7b]/50 transition-colors group shadow-xl"
                             >
                                 <div className="w-20 h-20 rounded-2xl bg-[#48df7b]/10 text-[#48df7b] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">
                                     {item.icon}
                                 </div>
                                 <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                                 <p className="text-lg text-gray-600 dark:text-gray-400">{item.desc}</p>
                             </motion.div>
                         ))}
                     </div>
                 </div>
             </div>
        </section>

        {/* 3. HCS-1: THE PIPELINE - Wide */}
        <section className="py-24 relative z-10 overflow-hidden">
             <div className="absolute inset-0 bg-gray-50 dark:bg-[#1a1f3a] skew-y-2 transform origin-top-left -z-10 scale-110" />
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <SectionHeader title="The File Pipeline." subtitle="HCS-1 STANDARD" color="blue" />
                 
                 <div className="mb-32">
                     <p className="text-3xl text-gray-600 dark:text-gray-400 max-w-5xl leading-relaxed">
                        HCS-1 solves the problem of storing large files on a high-throughput consensus service. 
                        It is agnostic to the data type, utilizing a strict 3-stage pipeline to ensure cost-effectiveness and data integrity.
                     </p>
                 </div>

                 <PipelineVisual />

                 <div className="grid xl:grid-cols-3 gap-16 mt-32">
                     <div className="p-12 border-t-8 border-[#48df7b] bg-white dark:bg-[#1a1f3a] rounded-[2rem] shadow-2xl">
                         <h4 className="text-3xl font-bold mb-6 text-[#48df7b]">1. Compress</h4>
                         <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Input data (image, JSON, GLB) is compressed using <strong>zstd</strong> or <strong>brotli</strong>. Reduces on-chain footprint by 30-50%.</p>
                         <Terminal title="compression.ts">
                             <Terminal.Line command="zstd.compress(buffer, 10)" />
                         </Terminal>
                     </div>
                     <div className="p-12 border-t-8 border-[#5599fe] bg-white dark:bg-[#1a1f3a] rounded-[2rem] shadow-2xl">
                         <h4 className="text-3xl font-bold mb-6 text-[#5599fe]">2. Encode</h4>
                         <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">The binary compressed blob is converted to a <strong>base64</strong> string. Ensures payload is safe for JSON transport.</p>
                         <Terminal title="encoding.ts">
                             <Terminal.Line command="buffer.toString('base64')" />
                         </Terminal>
                     </div>
                     <div className="p-12 border-t-8 border-[#a679f0] bg-white dark:bg-[#1a1f3a] rounded-[2rem] shadow-2xl">
                         <h4 className="text-3xl font-bold mb-6 text-[#a679f0]">3. Chunk</h4>
                         <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">The string is sliced into <strong>1024-char</strong> segments. Bypasses HCS message size limits for high speed.</p>
                         <Terminal title="chunking.ts">
                             <Terminal.Line command="chunks.map((c, i) => ({o:i, c}))" />
                         </Terminal>
                     </div>
                 </div>
             </div>
        </section>

        {/* 4. HCS-1: THE SCHEMA - Interactive/Visual */}
        <section className="py-24 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid xl:grid-cols-2 gap-32 items-center">
                     <div>
                         <SectionHeader title="The Atom of Data." subtitle="SCHEMA" color="purple" />
                         <p className="text-2xl text-gray-600 dark:text-gray-400 mb-16 leading-relaxed">
                             Every HCS-1 message is a self-contained JSON object. Indexers listen to a topic and aggregate these atoms to reconstruct the original file.
                         </p>
                         <ul className="space-y-12">
                             <li className="flex items-start gap-8">
                                 <div className="w-20 h-20 rounded-3xl bg-[#48df7b]/10 flex items-center justify-center text-[#48df7b] font-mono text-3xl font-bold">o</div>
                                 <div>
                                     <h4 className="text-2xl font-bold mb-3">Order Index</h4>
                                     <p className="text-gray-500 text-lg">The integer index of the chunk. 0, 1, 2... Allows parallel uploading and out-of-order arrival.</p>
                                 </div>
                             </li>
                             <li className="flex items-start gap-8">
                                 <div className="w-20 h-20 rounded-3xl bg-[#5599fe]/10 flex items-center justify-center text-[#5599fe] font-mono text-3xl font-bold">c</div>
                                 <div>
                                     <h4 className="text-2xl font-bold mb-3">Content</h4>
                                     <p className="text-gray-500 text-lg">The substring of the base64 encoded data.</p>
                                 </div>
                             </li>
                             <li className="flex items-start gap-8">
                                 <div className="w-20 h-20 rounded-3xl bg-[#a679f0]/10 flex items-center justify-center text-[#a679f0] font-mono text-3xl font-bold">m</div>
                                 <div>
                                     <h4 className="text-2xl font-bold mb-3">Topic Memo</h4>
                                     <p className="text-gray-500 text-lg">Contains the SHA-256 hash of the original file, plus algo and encoding for validation.</p>
                                 </div>
                             </li>
                         </ul>
                     </div>
                     <div className="bg-[#1a1f3a] p-16 rounded-[4rem] border border-white/10 shadow-2xl font-mono text-base relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-12 opacity-10 text-[10rem] group-hover:opacity-20 transition-opacity">
                             <FaLayerGroup />
                         </div>
                         <div className="text-gray-500 mb-8 uppercase tracking-widest">// Chunk Sequence</div>
                         <div className="space-y-8 relative z-10">
                             <div className="pl-8 border-l-4 border-[#48df7b]">
                                <span className="text-yellow-500">{`{`}</span><br/>
                                &nbsp;&nbsp;<span className="text-blue-400">"o"</span>: <span className="text-purple-400">0</span>,<br/>
                                &nbsp;&nbsp;<span className="text-blue-400">"c"</span>: <span className="text-green-400">"data:image/png;base64,iVBORw0K..."</span><br/>
                                <span className="text-yellow-500">{`}`}</span>
                             </div>
                             <div className="pl-8 border-l-4 border-[#5599fe]">
                                <span className="text-yellow-500">{`{`}</span><br/>
                                &nbsp;&nbsp;<span className="text-blue-400">"o"</span>: <span className="text-purple-400">1</span>,<br/>
                                &nbsp;&nbsp;<span className="text-blue-400">"c"</span>: <span className="text-green-400">"AgICAgICAgICAgICAgICAgICAg..."</span><br/>
                                <span className="text-yellow-500">{`}`}</span>
                             </div>
                             <div className="pl-8 border-l-4 border-[#a679f0]">
                                <span className="text-yellow-500">{`{`}</span><br/>
                                &nbsp;&nbsp;<span className="text-blue-400">"o"</span>: <span className="text-purple-400">2</span>,<br/>
                                &nbsp;&nbsp;<span className="text-blue-400">"c"</span>: <span className="text-green-400">"98234nkjsdf89234..."</span><br/>
                                <span className="text-yellow-500">{`}`}</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* 5. HCS-5: THE BINDING - Full Width Dark */}
        <section className="py-24 bg-[#1a1f3a] text-white overflow-hidden">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="text-center max-w-4xl mx-auto mb-16">
                     <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#5599fe]">Tokenizing Data.</h2>
                     <p className="text-lg text-gray-400 leading-relaxed">
                         A file on HCS is just data. A <strong>Hashinal</strong> is that data owned by a key.
                         HCS-5 binds the Topic ID to a Hedera Token Service (HTS) serial number.
                     </p>
                 </div>

                 <TokenBindingVisual />

                 <div className="grid xl:grid-cols-2 gap-12 mt-16">
                     <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                         <h4 className="text-2xl font-bold mb-4 text-[#5599fe]">The HRL</h4>
                         <p className="text-base text-gray-400 mb-6">
                             The token's metadata field must use the <strong>Hedera Resource Locator</strong> schema. This tells wallets that the image isn't on a server, but on the ledger.
                         </p>
                         <div className="p-6 bg-[#1a1f3a] rounded-2xl border border-white/10 font-mono text-center text-[#5599fe] text-lg">
                             hcs://1/0.0.123456
                         </div>
                     </div>
                     <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                         <h4 className="text-2xl font-bold mb-4 text-[#5599fe]">First is First</h4>
                         <p className="text-base text-gray-400">
                             Inscription numbers (e.g., #100) are assigned based on the <strong>consensus timestamp</strong> of the mint. It is impossible to fake an earlier timestamp. The network serves as the clock.
                         </p>
                     </div>
                 </div>
             </div>
        </section>

        {/* 6. HCS-5: INSCRIPTION INDEXING */}
        <section className="py-24 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid xl:grid-cols-2 gap-32 items-center">
                     <div className="order-2 xl:order-1">
                         <div className="bg-white dark:bg-gray-900 p-12 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-gray-200 dark:border-white/10 shadow-2xl">
                             <h4 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-[#5599fe]">Token Metadata Example</h4>
                             <div className="space-y-6">
                                 <div className="p-6 bg-gray-50 dark:bg-[#1a1f3a] rounded-2xl">
                                     <div className="text-sm font-mono text-gray-500 mb-2">HRL in metadata field:</div>
                                     <div className="text-lg md:text-xl font-mono text-[#5599fe] break-all">hcs://1/0.0.3541181</div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                     <div className="flex-1 h-px bg-gray-300 dark:bg-white/20" />
                                     <FaArrowDown className="text-gray-400" />
                                     <div className="flex-1 h-px bg-gray-300 dark:bg-white/20" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 bg-[#48df7b]/10 rounded-xl">
                                         <div className="text-xs font-bold text-[#48df7b] mb-1">VERSION</div>
                                         <div className="font-mono text-sm">1</div>
                                     </div>
                                     <div className="p-4 bg-[#48df7b]/10 rounded-xl">
                                         <div className="text-xs font-bold text-[#48df7b] mb-1">TOPIC ID</div>
                                         <div className="font-mono text-sm">0.0.3541181</div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className="order-1 xl:order-2">
                         <SectionHeader title="The Inscription Index." subtitle="INDEXING" color="blue" />
                         <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 md:mb-12 leading-relaxed">
                             When an HTS token is minted with an HRL in its metadata field, indexers recognize it as a Hashinal.
                             They verify the HCS-1 data integrity and establish the global inscription order based on the <strong>consensus timestamp</strong> of the minting transaction.
                         </p>
                         <p className="text-lg md:text-xl text-gray-500">
                             This separates "Raw Data" (HCS-1) from "Ownership" (HTS). You can bind the same file to 1000 tokens, or use unique files for each serial number.
                         </p>
                     </div>
                 </div>
             </div>
        </section>

        {/* 7. HCS-6: DYNAMIC EVOLUTION */}
        <section className="py-24 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1f3a]">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                        LIVING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] to-[#5599fe]">ASSETS.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Static files are great for art, but games need state. HCS-6 introduces <strong>Mutable Pointers</strong>.
                        The token points to a registry, and the registry points to the current file.
                    </p>
                 </div>

                 <MutablePointerVisual />

                 <div className="mt-16 text-center">
                    <PrimaryButton
                        href="/docs/standards/hcs-6"
                        className="!bg-[#a679f0] hover:!bg-[#9055fe] shadow-2xl !text-base !px-8 !py-4 rounded-xl"
                    >
                        EXPLORE HCS-6 SPEC
                    </PrimaryButton>
                 </div>
             </div>
        </section>

        {/* 8. SDK EXAMPLES */}
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <SectionHeader title="Build with the SDK." subtitle="DEVELOPER TOOLS" color="green" />
                
                <div className="grid xl:grid-cols-2 gap-16 mt-24">
                    <div>
                        <h4 className="text-3xl font-bold mb-8 text-[#48df7b]">HCS-1: Upload File</h4>
                        <Terminal title="upload.ts">
                            <Terminal.Line command="import { HCS1 } from '@hashgraph/standards';" />
                            <Terminal.Line output="" />
                            <Terminal.Line output="// Compresses, chunks, and uploads" type="comment" />
                            <Terminal.Line command="const topicId = await HCS1.uploadFile(client, buffer, {" />
                            <Terminal.Line command='    memo: "My File",' />
                            <Terminal.Line command='    compression: "zstd"' />
                            <Terminal.Line command="});" />
                            <Terminal.Line output="" />
                            <Terminal.Line command="console.log(`File uploaded: ${topicId}`);" />
                        </Terminal>
                    </div>
                    
                    <div>
                        <h4 className="text-3xl font-bold mb-8 text-[#5599fe]">HCS-5: Mint Hashinal</h4>
                        <Terminal title="mint.ts">
                            <Terminal.Line command="import { HCS5 } from '@hashgraph/standards';" />
                            <Terminal.Line output="" />
                            <Terminal.Line output="// Mints token and registers inscription" type="comment" />
                            <Terminal.Line command="await HCS5.mint(client, {" />
                            <Terminal.Line command='    topicId: "0.0.12345", // From HCS-1' />
                            <Terminal.Line command='    tokenName: "My Art",' />
                            <Terminal.Line command="    supply: 1," />
                            <Terminal.Line command='    metadata: "hcs://1/0.0.12345"' />
                            <Terminal.Line command="});" />
                        </Terminal>
                    </div>
                </div>
            </div>
        </section>

        {/* 9. USE CASES */}
        <section className="py-24 border-t border-gray-200 dark:border-white/10">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <h3 className="text-6xl font-bold mb-24 text-center">Dynamic Possibilities.</h3>
                <div className="grid xl:grid-cols-3 gap-16">
                    <motion.div whileHover={{ y: -20 }} className="p-16 border border-gray-200 dark:border-white/10 rounded-[3rem] hover:border-[#a679f0] transition-colors bg-white dark:bg-[#1a1f3a] shadow-2xl">
                        <h4 className="font-bold text-3xl mb-6">Gaming</h4>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">Weapon durability, character leveling, or skin changes. The NFT stays the same, the visuals update via HCS-6.</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -20 }} className="p-16 border border-gray-200 dark:border-white/10 rounded-[3rem] hover:border-[#a679f0] transition-colors bg-white dark:bg-[#1a1f3a] shadow-2xl">
                        <h4 className="font-bold text-3xl mb-6">Real Estate</h4>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">A property deed NFT. The HCS-6 registry tracks maintenance logs, tax payments, and renovations over decades.</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -20 }} className="p-16 border border-gray-200 dark:border-white/10 rounded-[3rem] hover:border-[#a679f0] transition-colors bg-white dark:bg-[#1a1f3a] shadow-2xl">
                        <h4 className="font-bold text-3xl mb-6">Identity</h4>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">A profile picture NFT. The user can update their PFP by simply posting a message to their registry topic.</p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* 10. CTA */}
        <section className="py-24 text-center relative z-10 bg-white dark:bg-[#1a1f3a]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-white dark:bg-[#1a1f3a] p-12 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">Ready to Inscribe?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <PrimaryButton href="/docs/libraries/standards-sdk/inscribe" className="!text-base !px-8 !py-4 shadow-2xl rounded-xl">
                            USE THE SDK
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
