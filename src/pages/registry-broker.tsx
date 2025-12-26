import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaNetworkWired, FaServer, FaSearch, FaBolt, FaArrowRight, FaCube, FaCheckCircle, FaDatabase, FaLayerGroup, FaArrowDown, FaGlobe, FaShieldAlt, FaExchangeAlt, FaRobot, FaBrain, FaCode } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Terminal from '../components/ui/Terminal';

// --- VISUAL COMPONENTS ---

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] origin-left z-[100]" style={{ scaleX }} />;
};

const SectionHeader = ({ title, subtitle, color = "purple" }: { title: string, subtitle: string, color?: "blue" | "purple" | "green" }) => {
    const colorHex = color === "blue" ? "#5599fe" : color === "purple" ? "#a679f0" : "#48df7b";
    return (
        <div className="mb-16">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
            >
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: colorHex }} />
                <span className="text-sm font-mono tracking-[0.2em] font-bold uppercase" style={{ color: colorHex }}>{subtitle}</span>
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[0.9]"
            >
                {title}
            </motion.h2>
        </div>
    );
};

// --- COMPONENT: Universal Adapter Visual ---
const AdapterVisual = () => {
    const protocols = [
        { name: "Virtuals", color: "#ef4444", icon: <FaRobot /> },
        { name: "NANDA", color: "#f59e0b", icon: <FaNetworkWired /> },
        { name: "MCP", color: "#10b981", icon: <FaServer /> },
        { name: "A2A", color: "#3b82f6", icon: <FaExchangeAlt /> },
        { name: "Olas", color: "#8b5cf6", icon: <FaCube /> },
        { name: "ERC-8004", color: "#6366f1", icon: <FaShieldAlt /> }
    ];

    return (
        <div className="relative w-full h-[700px] flex items-center justify-center perspective-[1200px]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[#a679f0]/5 blur-[100px] rounded-full mix-blend-screen" />

            {/* PROTOCOLS (Orbiting) */}
            <div className="absolute inset-0 animate-spin-slow">
                {protocols.map((p, i) => {
                    const angle = (i * 360) / protocols.length;
                    const radius = 280;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    
                    return (
                        <motion.div 
                            key={i}
                            className="absolute left-1/2 top-1/2 w-20 h-20 -ml-10 -mt-10 bg-white dark:bg-[#0f0f16] rounded-2xl border flex flex-col items-center justify-center shadow-2xl z-20"
                            style={{ 
                                transform: `translate(${x}px, ${y}px)`,
                                borderColor: `${p.color}40`
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="text-xl mb-1" style={{ color: p.color }}>{p.icon}</div>
                            <div className="text-[10px] font-bold text-gray-500">{p.name}</div>
                            {/* Connector Line */}
                            <svg className="absolute w-[300px] h-[300px] pointer-events-none -z-10" style={{ 
                                left: '50%', 
                                top: '50%', 
                                transform: `translate(-50%, -50%) rotate(${-angle}deg)` 
                            }}>
                                <line x1="50%" y1="50%" x2="100%" y2="50%" stroke={p.color} strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                                <motion.circle r="2" fill={p.color}
                                    animate={{ cx: ["100%", "50%"], cy: ["50%", "50%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                                />
                            </svg>
                        </motion.div>
                    );
                })}
            </div>

            {/* THE BROKER CORE (Center) */}
            <div className="relative z-30 w-72 h-72 bg-[#0f0f16] rounded-full border-4 border-[#a679f0]/30 shadow-[0_0_80px_rgba(166,121,240,0.2)] flex flex-col items-center justify-center backdrop-blur-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a679f0]/10 to-transparent rounded-full" />
                <div className="w-24 h-24 bg-[#a679f0] rounded-2xl flex items-center justify-center text-white text-5xl mb-4 shadow-lg">
                    <FaSearch />
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">HCS-2</div>
                <div className="text-sm font-mono text-[#a679f0] mt-1">BROKER ENGINE</div>
                
                {/* Status Badges */}
                <div className="absolute -bottom-12 flex gap-2">
                    <div className="px-3 py-1 bg-[#48df7b]/10 border border-[#48df7b]/20 rounded-full text-[#48df7b] text-xs font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#48df7b] animate-pulse" />
                        ONLINE
                    </div>
                     <div className="px-3 py-1 bg-[#5599fe]/10 border border-[#5599fe]/20 rounded-full text-[#5599fe] text-xs font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5599fe] animate-pulse" />
                        INDEXING
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function RegistryBrokerPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Layout title="Registry Broker" description="Universal AI Agent Discovery.">
      <div className='min-h-screen bg-white dark:bg-[#050505] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#a679f0] selection:text-white transition-colors duration-300'>
        <ScrollProgress />
        
        {/* Background Noise */}
        <div className='fixed inset-0 pointer-events-none opacity-20 z-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] brightness-100 contrast-150 mix-blend-overlay' />

        {/* 1. HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 pb-20 overflow-hidden">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1800px] relative z-10">
                 <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="pl-4 md:pl-8"
                    >
                        {/* DROPDOWN MENU */}
                        <div className="relative inline-block text-left mb-8 z-50">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#a679f0]/10 border border-[#a679f0]/30 text-[#a679f0] text-xs font-mono font-bold tracking-[0.2em] hover:bg-[#a679f0]/20 transition-colors"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#a679f0] animate-pulse" />
                                STANDARDS
                                <FaArrowDown className={`ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl bg-white dark:bg-[#0f0f16] border border-gray-200 dark:border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden origin-top-left animate-fade-in-down">
                                    <div className="py-2">
                                        <Link to="/standards" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Standards Overview</Link>
                                        <Link to="/floras" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">AppNet Accounts</Link>
                                        <Link to="/registries" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Data Registries</Link>
                                        <div className="h-px bg-gray-100 dark:bg-white/5 my-1" />
                                        <Link to="/registry-broker" className="block px-4 py-3 text-sm font-bold text-[#a679f0] bg-gray-50 dark:bg-white/5 transition-colors !no-underline">Registry Broker</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                            UNIVERSAL <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#a679f0] animate-gradient-x">DISCOVERY.</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed border-l-4 border-[#a679f0] pl-6">
                            One search API for the entire Agentic Internet.
                            <strong> Registry Broker</strong> indexes Virtuals, NANDA, MCP, and ERC-8004 agents into a unified, queryable fabric.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton href="/docs/registry-broker" className="!text-sm !px-6 !py-4 shadow-2xl shadow-purple-500/20 rounded-xl flex items-center justify-center gap-2">
                                READ THE DOCS <FaArrowRight />
                            </PrimaryButton>
                            <SecondaryButton href="https://hol.org/registry/search" className="!text-sm !px-6 !py-4 !border-[#a679f0] !text-[#a679f0] hover:!bg-[#a679f0] hover:!text-white rounded-xl">
                                SEARCH AGENTS
                            </SecondaryButton>
                        </div>
                    </motion.div>

                    <div className="relative hidden lg:block">
                        <AdapterVisual />
                    </div>
                 </div>
             </div>
        </section>

        {/* 2. ARCHITECTURE LAYERS */}
        <section className="py-24 relative z-10 bg-gray-50 dark:bg-[#0a0b10] border-t border-b border-gray-200 dark:border-white/5">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <SectionHeader title="The Universal Index." subtitle="ARCHITECTURE" color="blue" />
                
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="p-10 bg-white dark:bg-[#0f0f16] rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl"
                    >
                        <div className="w-14 h-14 bg-[#5599fe]/10 rounded-2xl flex items-center justify-center text-[#5599fe] text-2xl mb-6">
                            <FaLayerGroup />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Multi-Protocol Adapters</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Modular ingestion engines for Virtuals, Olas, NANDA, and MCP. We normalize diverse agent metadata into a single, queryable schema.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="p-10 bg-white dark:bg-[#0f0f16] rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl"
                    >
                        <div className="w-14 h-14 bg-[#a679f0]/10 rounded-2xl flex items-center justify-center text-[#a679f0] text-2xl mb-6">
                            <FaShieldAlt />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Trust Attestation</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            HCS-backed reputation. We index on-chain trust scores, ensuring that query results prioritize verified, safe agents.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="p-10 bg-white dark:bg-[#0f0f16] rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl"
                    >
                        <div className="w-14 h-14 bg-[#48df7b]/10 rounded-2xl flex items-center justify-center text-[#48df7b] text-2xl mb-6">
                            <FaBrain />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Semantic Search</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Powered by <strong>EmbeddingGemma</strong>. Search for agents by capabilities, "financial analysis", "image generation", not just keywords.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* 3. API USAGE (Interactive) */}
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <div className="grid xl:grid-cols-2 gap-24 items-center">
                    <div>
                        <SectionHeader title="Query the Fabric." subtitle="API ACCESS" color="purple" />
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Access the global agent registry via our hosted REST API or the MCP resource. 
                        </p>
                        <div className="space-y-4 font-mono text-sm">
                             <div className="p-4 bg-gray-100 dark:bg-[#0f0f16] rounded-xl border border-gray-200 dark:border-white/10">
                                <span className="text-[#a679f0] font-bold block mb-1">GET /api/v1/search</span>
                                <span className="text-gray-500">Universal keyword and semantic search.</span>
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-[#0f0f16] rounded-xl border border-gray-200 dark:border-white/10">
                                <span className="text-[#5599fe] font-bold block mb-1">GET /api/v1/agents/:vt</span>
                                <span className="text-gray-500">Resolve a Virtual Topic to full agent metadata.</span>
                            </div>
                             <div className="p-4 bg-gray-100 dark:bg-[#0f0f16] rounded-xl border border-gray-200 dark:border-white/10">
                                <span className="text-[#48df7b] font-bold block mb-1">WS wss://api.hashgraph.online</span>
                                <span className="text-gray-500">Real-time subscription to agent updates.</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0f0f16] p-12 rounded-[3rem] shadow-2xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#a679f0]/10 rounded-full blur-[80px]" />
                        <Terminal title="broker-client" className="h-[400px]">
                            <Terminal.Line command="# Search universally across all protocols" />
                            <Terminal.Line command="curl 'https://api.hashgraph.online/v1/search?q=defi&limit=2'" />
                            <Terminal.Line output='[' type="output" />
                            <Terminal.Line output='  {' type="output" />
                            <Terminal.Line output='    "name": "DeFioptimizer",' type="output" />
                            <Terminal.Line output='    "virtualTopic": "vt:virtuals:0x888",' type="output" />
                            <Terminal.Line output='    "protocol": "virtuals",' type="output" />
                            <Terminal.Line output='    "trustScore": 85' type="output" />
                            <Terminal.Line output='  },' type="output" />
                            <Terminal.Line output='  {' type="output" />
                            <Terminal.Line output='    "name": "Base Yield Agent",' type="output" />
                            <Terminal.Line output='    "virtualTopic": "vt:erc8004:0x999",' type="output" />
                            <Terminal.Line output='    "protocol": "erc-8004",' type="output" />
                            <Terminal.Line output='    "trustScore": 92' type="output" />
                            <Terminal.Line output='  }' type="output" />
                            <Terminal.Line output=']' type="output" />
                        </Terminal>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. SDK REGISTRATION */}
        <section className="py-24 bg-white dark:bg-[#0a0b10] border-t border-gray-200 dark:border-white/5">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid xl:grid-cols-2 gap-24 items-center">
                    <div className="order-2 xl:order-1 bg-[#0f0f16] p-12 rounded-[3rem] shadow-2xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-[#5599fe]/10 rounded-full blur-[80px]" />
                        <Terminal title="register-agent.ts" className="h-[400px]">
                            <Terminal.Line command="import { AgentRegistry } from '@hashgraph/standards-sdk';" />
                            <Terminal.Line command="" />
                            <Terminal.Line command="// Register your agent to be indexed" />
                            <Terminal.Line command="await AgentRegistry.register({" />
                            <Terminal.Line command='  name: "My Solver Agent",' />
                            <Terminal.Line command='  capabilities: ["math", "logic"],' />
                            <Terminal.Line command='  endpoint: "https://agent.example.com",' />
                            <Terminal.Line command='  payment_rails: ["x402"]' />
                            <Terminal.Line command="});" />
                            <Terminal.Line output="✓ Registered successfully." type="output" />
                            <Terminal.Line output="✓ Indexed by Broker in 200ms." type="output" />
                        </Terminal>
                    </div>

                    <div className="order-1 xl:order-2">
                        <SectionHeader title="Be Discovered." subtitle="SDK REGISTRATION" color="blue" />
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Want your agent to be found by thousands of users? Use the Standards SDK to broadcast your agent's identity and capabilities to the Registry.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <FaCheckCircle className="text-[#5599fe] text-xl mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg">Instant Indexing</h4>
                                    <p className="text-gray-500">Your agent appears in search results immediately after block finality.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaCheckCircle className="text-[#5599fe] text-xl mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg">Standardized Metadata</h4>
                                    <p className="text-gray-500">Ensure your agent is correctly categorized and invoked.</p>
                                </div>
                            </div>
                        </div>
                         <div className="mt-8">
                            <PrimaryButton href="/docs/standards/hcs-14" className="!text-sm !px-8 !py-4 rounded-xl">
                                VIEW SDK DOCS
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </Layout>
  );
}
