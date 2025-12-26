import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaIdCard, FaGlobe, FaServer, FaShieldAlt, FaKey, FaArrowDown, FaCheckCircle, FaProjectDiagram, FaFingerprint, FaNetworkWired, FaDatabase, FaExchangeAlt, FaRobot, FaHandshake, FaBolt } from 'react-icons/fa';
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

const UAIDHeroVisual = () => {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center perspective-[1200px] overflow-visible">
      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#5599fe]/20 via-transparent to-[#a679f0]/20 blur-[150px] rounded-full mix-blend-screen opacity-60" />

      {/* FLOATING ID CARD */}
      <div className="relative z-10 [transform-style:preserve-3d] flex items-center justify-center">
        <motion.div 
            animate={{ 
                y: [-20, 20, -20],
                rotateX: [5, -5, 5],
                rotateY: [-5, 5, -5]
            }}
            transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
            className="relative w-[500px] h-[300px] rounded-[2rem] border-2 border-[#5599fe]/50 bg-white/10 dark:bg-[#1a1f3a]/80 backdrop-blur-2xl shadow-[0_0_100px_rgba(85,153,254,0.3)] flex flex-col p-8 justify-between [transform-style:preserve-3d]"
        >
            <div className="flex justify-between items-start [transform:translateZ(40px)]">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#5599fe] to-[#a679f0] rounded-full flex items-center justify-center text-white text-3xl">
                        <FaRobot />
                    </div>
                    <div>
                        <div className="text-xs font-mono text-[#5599fe] tracking-widest mb-1">UNIVERSAL AGENT ID</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">Support Bot 9000</div>
                    </div>
                </div>
                <FaFingerprint className="text-5xl text-gray-300 dark:text-white/20" />
            </div>
            
            <div className="space-y-4 [transform:translateZ(20px)]">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-[#a679f0]/20 text-[#a679f0] px-2 py-1 rounded">REGISTRY: HOL</span>
                    <span className="text-xs font-bold bg-[#48df7b]/20 text-[#48df7b] px-2 py-1 rounded">PROTO: HCS-10</span>
                </div>
                <div className="font-mono text-xs text-gray-500 break-all bg-black/5 dark:bg-white/5 p-3 rounded-lg border border-transparent dark:border-white/10">
                    uaid:aid:QmX4fB9XpS3yKqP8MHTbcQW7R6wN4PrGHz
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

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

export default function HCS14Page() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <Layout title="HCS-14 Universal Agent ID" description="Globally unique identifiers for AI agents.">
      <div className='min-h-screen bg-white dark:bg-[#1a1f3a] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#5599fe] selection:text-white transition-colors duration-300'>
        <ScrollProgress />
        
        {/* Background Noise */}
        <div className='fixed inset-0 pointer-events-none opacity-30 z-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] brightness-100 contrast-150 mix-blend-overlay' />

        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px] relative z-10">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* DROPDOWN MENU */}
                        <div className="relative inline-block text-left mb-12 z-50">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#5599fe]/10 border border-[#5599fe]/30 text-[#5599fe] text-sm font-mono font-bold tracking-[0.2em] hover:bg-[#5599fe]/20 transition-colors"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#5599fe] animate-pulse" />
                                STANDARDS
                                <FaArrowDown className={`ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden origin-top-left animate-fade-in-down">
                                    <div className="py-2">
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

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.85] mb-6">
                            ONE ID. <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#5599fe] animate-gradient-x">EVERY PROTOCOL.</span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed border-l-4 border-[#5599fe] pl-6">
                            <strong>HCS-14 Universal Agent ID</strong> enables consistent agent identification across web2 APIs, web3 protocols, and hybrid systems.
                            Deterministic, self-describing, and decentralized.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton href="/docs/standards/hcs-14" className="!text-base !px-8 !py-4 shadow-2xl shadow-blue-500/20 rounded-2xl flex items-center justify-center gap-3">
                                READ SPEC <FaIdCard />
                            </PrimaryButton>
                            <SecondaryButton href="https://hol.org/points" className="!text-base !px-8 !py-4 !border-[#48df7b] !text-[#48df7b] hover:!bg-[#48df7b] hover:!text-white rounded-2xl">
                                COLLECT POINTS
                            </SecondaryButton>
                        </div>
                    </motion.div>

                    <div className="hidden lg:block relative">
                        <UAIDHeroVisual />
                    </div>
                 </div>
             </div>

             <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#5599fe] text-3xl opacity-50"
             >
                 <FaArrowDown />
             </motion.div>
        </section>

        {/* 2. THE FRAGMENTATION PROBLEM */}
        <section className="py-24 relative z-10 bg-gray-50 dark:bg-[#1a1f3a] border-t border-b border-gray-200 dark:border-white/5">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid xl:grid-cols-2 gap-8">
                     <div className="sticky top-48 h-fit">
                         <SectionHeader title="The Babel Problem." subtitle="FRAGMENTATION" color="purple" />
                         <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                             Every protocol has its own ID system. Web2 has URLs. Blockchains have addresses. Registries have names. 
                             Agents cannot cross these boundaries without losing their identity.
                         </p>
                         <div className="p-6 bg-[#a679f0]/10 border border-[#a679f0]/30 rounded-3xl">
                             <p className="text-xl text-gray-900 dark:text-white leading-relaxed font-bold">
                                 HCS-14 creates a Universal Translation Layer. A single UAID string contains everything needed to verify and route to an agent, regardless of its native habitat.
                             </p>
                         </div>
                     </div>
                     <div className="space-y-16">
                         {[
                             { icon: <FaNetworkWired />, title: "Unified Discovery", desc: "Discover agents across Hedera, Ethereum, Google A2A, and private clouds using a single ID format." },
                             { icon: <FaHandshake />, title: "Trust Bridging", desc: "Carry reputation and verification proofs across protocol boundaries. Your Hedera agent is trusted on Ethereum." },
                             { icon: <FaGlobe />, title: "Self-Describing", desc: "The ID itself contains routing info (registry, protocol, native endpoint). No central lookup table required." }
                         ].map((item, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="p-12 rounded-[3rem] bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/5 hover:border-[#a679f0]/50 transition-colors group shadow-xl"
                             >
                                 <div className="w-20 h-20 rounded-2xl bg-[#a679f0]/10 text-[#a679f0] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">
                                     {item.icon}
                                 </div>
                                 <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                                 <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                             </motion.div>
                         ))}
                     </div>
                 </div>
             </div>
        </section>

        {/* 3. THE UAID SOLUTION - Wide */}
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[#5599fe]/5 skew-y-2 transform origin-top-left -z-10 scale-110" />
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <SectionHeader title="Dual Method Architecture." subtitle="SOLUTION" color="blue" />
                
                <div className="grid xl:grid-cols-2 gap-12 mt-32 items-start">
                    <div>
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold mb-4 text-[#5599fe]">1. The AID Target</h3>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                For agents that don't have a W3C DID. The identifier is a <strong>deterministic SHA-384 hash</strong> of the agent's canonical metadata (Name, Registry, Protocol, Native ID, Skills).
                            </p>
                            <code className="block bg-white dark:bg-[#1a1f3a] p-6 rounded-2xl border border-gray-200 dark:border-white/10 font-mono text-[#5599fe] text-lg">
                                uaid:aid:{`{hash}`};registry=hol;proto=hcs-10
                            </code>
                        </div>
                        
                        <div>
                            <h3 className="text-3xl font-bold mb-4 text-[#a679f0]">2. The UAID Target</h3>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                For agents that <strong>already have</strong> a self-sovereign DID. HCS-14 wraps the existing DID to add universal routing parameters without changing the underlying identity.
                            </p>
                            <code className="block bg-white dark:bg-[#1a1f3a] p-6 rounded-2xl border border-gray-200 dark:border-white/10 font-mono text-[#a679f0] text-lg">
                                uaid:did:{`{method-id}`};registry=hol;nativeId=...
                            </code>
                        </div>
                    </div>

                    <div className="bg-[#1a1f3a] p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10 text-[15rem] text-[#5599fe]">
                            <FaFingerprint />
                        </div>
                        <div className="relative z-10 space-y-12">
                            <div>
                                <div className="text-gray-500 mb-4 font-mono text-sm uppercase tracking-widest">// Canonical Input (AID)</div>
                                <CodeSnippet code={`{
  "registry": "hol",
  "name": "Support Agent",
  "version": "1.0.0",
  "protocol": "hcs-10",
  "nativeId": "hedera:testnet:0.0.123456",
  "skills": [0, 17]
}`} language="json" />
                            </div>
                            <div className="flex justify-center">
                                <FaArrowDown className="text-3xl text-gray-500" />
                            </div>
                            <div>
                                <div className="text-gray-500 mb-4 font-mono text-sm uppercase tracking-widest">// Deterministic Output</div>
                                <div className="p-6 bg-black/50 rounded-xl border border-[#5599fe]/30 font-mono text-[#5599fe] break-all">
                                    uaid:aid:QmX4f...GHz;uid=0;registry=hol;nativeId=hedera:testnet:0.0.123456
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. ANATOMY OF AN ID */}
        <section className="py-24 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <SectionHeader title="Anatomy of an ID." subtitle="SCHEMA" color="green" />
                 
                 <div className="bg-white dark:bg-[#1a1f3a] p-12 rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden">
                     <div className="flex flex-wrap items-center justify-center gap-4 text-lg md:text-2xl font-mono font-bold mb-8">
                         <span className="text-gray-400">uaid:</span>
                         <span className="text-[#5599fe]">aid</span>
                         <span className="text-gray-400">:</span>
                         <span className="text-[#a679f0] underline decoration-dotted underline-offset-8">QmHash...</span>
                         <span className="text-gray-400">;</span>
                         <span className="text-[#48df7b]">registry=hol</span>
                         <span className="text-gray-400">;</span>
                         <span className="text-[#ff9f1c]">proto=hcs-10</span>
                     </div>

                     <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                         <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border-t-4 border-[#5599fe]">
                             <h4 className="text-xl font-bold mb-2">Target</h4>
                             <p className="text-sm text-gray-500"><code>aid</code> (Generated) or <code>did</code> (Sovereign).</p>
                         </div>
                         <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border-t-4 border-[#a679f0]">
                             <h4 className="text-xl font-bold mb-2">Identifier</h4>
                             <p className="text-sm text-gray-500">SHA-384 Hash (Base58) or Method-Specific ID.</p>
                         </div>
                         <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border-t-4 border-[#48df7b]">
                             <h4 className="text-xl font-bold mb-2">Registry</h4>
                             <p className="text-sm text-gray-500">Namespace authority (e.g. <code>hol</code>, <code>google</code>).</p>
                         </div>
                         <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border-t-4 border-[#ff9f1c]">
                             <h4 className="text-xl font-bold mb-2">Protocol</h4>
                             <p className="text-sm text-gray-500">Communication capabilities (e.g. <code>hcs-10</code>, <code>mcp</code>).</p>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* 5. INTEROPERABILITY */}
        <section className="py-24 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1f3a]">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <div className="grid xl:grid-cols-2 gap-12 items-center">
                    <div className="order-2 xl:order-1">
                        <div className="grid gap-8">
                            <div className="p-6 bg-white dark:bg-[#1a1f3a] rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-8">
                                <div className="text-3xl text-[#5599fe]"><FaGlobe /></div>
                                <div>
                                    <h4 className="text-xl font-bold">Google A2A</h4>
                                    <p className="text-gray-500"><code>nativeId</code> = domain.com</p>
                                </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-[#1a1f3a] rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-8">
                                <div className="text-3xl text-[#a679f0]"><FaServer /></div>
                                <div>
                                    <h4 className="text-xl font-bold">Anthropic MCP</h4>
                                    <p className="text-gray-500"><code>nativeId</code> = server-name</p>
                                </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-[#1a1f3a] rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-8">
                                <div className="text-3xl text-[#48df7b]"><FaBolt /></div>
                                <div>
                                    <h4 className="text-xl font-bold">Hedera HCS-10</h4>
                                    <p className="text-gray-500"><code>nativeId</code> = hedera:testnet:0.0.x</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 xl:order-2">
                        <SectionHeader title="Native Protocol IDs." subtitle="INTEROP" color="purple" />
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            HCS-14 respects existing ecosystems. It wraps native IDs (like CAIP-10 accounts or Web Domains) instead of replacing them.
                        </p>
                        <p className="text-xl text-gray-500 leading-relaxed">
                            This means a Google A2A agent on `microsoft.com` can be uniquely identified and routed to by a Hedera HCS-10 agent, just by parsing the UAID parameters.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* 6. SDK EXAMPLES */}
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <SectionHeader title="Build with the SDK." subtitle="DEVELOPER TOOLS" color="blue" />
                
                <div className="grid xl:grid-cols-2 gap-12 mt-24">
                    <div>
                        <h4 className="text-2xl font-bold mb-6 text-[#5599fe]">Generate AID</h4>
                        <Terminal title="generate-id.ts">
                            <Terminal.Line command="import { AgentID } from '@hashgraph/standards';" />
                            <Terminal.Line output="" />
                            <Terminal.Line command="const uaid = AgentID.generate({" />
                            <Terminal.Line command='    registry: "hol",' />
                            <Terminal.Line command='    name: "Support Bot",' />
                            <Terminal.Line command='    protocol: "hcs-10",' />
                            <Terminal.Line command='    nativeId: "hedera:testnet:0.0.123"' />
                            <Terminal.Line command="});" />
                            <Terminal.Line output="" />
                            <Terminal.Line command="console.log(uaid);" />
                            <Terminal.Line output='> uaid:aid:Qm...;registry=hol;...' type="output" />
                        </Terminal>
                    </div>
                    
                    <div>
                        <h4 className="text-2xl font-bold mb-6 text-[#a679f0]">Parse & Route</h4>
                        <Terminal title="parse-id.ts">
                            <Terminal.Line command="const parsed = AgentID.parse(uaidString);" />
                            <Terminal.Line output="" />
                            <Terminal.Line command="if (parsed.params.proto === 'hcs-10') {" />
                            <Terminal.Line command="    // Route to Hedera Topic" />
                            <Terminal.Line command="    await hcsClient.connect(parsed.params.nativeId);" />
                            <Terminal.Line command="} else if (parsed.params.proto === 'a2a') {" />
                            <Terminal.Line command="    // Route to HTTP Endpoint" />
                            <Terminal.Line command="    await httpClient.post(parsed.params.nativeId);" />
                            <Terminal.Line command="}" />
                        </Terminal>
                    </div>
                </div>
            </div>
        </section>

        {/* 7. CTA */}
        <section className="py-24 text-center relative z-10 bg-gradient-to-b from-transparent to-[#0a0b10]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-white dark:bg-[#1a1f3a] p-16 rounded-[4rem] border border-gray-200 dark:border-white/10 shadow-2xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">Unify Your Agents.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-8">
                        <PrimaryButton href="/docs/libraries/standards-sdk" className="!text-base !px-8 !py-4 shadow-2xl rounded-2xl">
                            START BUILDING
                        </PrimaryButton>
                        <SecondaryButton href="https://hol.org/points" className="!text-base !px-8 !py-4 rounded-2xl">
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
