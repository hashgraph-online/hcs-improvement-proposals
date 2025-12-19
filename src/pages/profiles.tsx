import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaUserAstronaut, FaServer, FaShieldAlt, FaGlobe, FaTwitter, FaGithub, FaDiscord, FaLinkedin, FaYoutube, FaArrowDown, FaKey, FaFingerprint, FaRobot, FaCheckCircle, FaUserCheck, FaIdCard } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import CodeSnippet from '../components/CodeSnippet';
import Terminal from '../components/ui/Terminal';

// --- VISUAL COMPONENTS ---

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b] origin-left z-[100]" style={{ scaleX }} />;
};

const IdentityHeroVisual = () => {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center perspective-[1200px] overflow-visible">
      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#a679f0]/20 via-transparent to-[#5599fe]/20 blur-[150px] rounded-full mix-blend-screen opacity-60" />

      {/* ORBITAL RINGS */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center [transform-style:preserve-3d]">
        {[0, 60, 120].map((deg, i) => (
            <motion.div
                key={i}
                animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 360] }}
                transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[#a679f0]/30"
                style={{ transform: `rotate(${deg}deg)` }}
            >
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#a679f0] rounded-full shadow-[0_0_30px_#a679f0]" />
            </motion.div>
        ))}
        
        {/* CORE */}
        <div className="relative z-10 w-80 h-80 bg-gradient-to-br from-white to-gray-100 dark:from-[#1a1b2e] dark:to-black rounded-full border border-[#a679f0]/50 flex items-center justify-center shadow-[0_0_150px_rgba(166,121,240,0.3)] backdrop-blur-3xl group">
            <div className="text-center transform transition-transform group-hover:scale-110 duration-500">
              <div className="text-sm font-mono text-gray-500 mb-4 tracking-[0.5em]">HCS-11</div>
              <div className="text-7xl font-bold font-mono text-gray-900 dark:text-white tracking-tighter">IDENTITY</div>
              <div className="flex justify-center gap-4 mt-6 text-3xl">
                 <FaUserAstronaut className="text-[#a679f0]" />
                 <FaServer className="text-[#5599fe]" />
                 <FaShieldAlt className="text-[#48df7b]" />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, color = "purple" }: { title: string, subtitle: string, color?: "blue" | "purple" | "green" }) => {
    const colorHex = color === "blue" ? "#5599fe" : color === "purple" ? "#a679f0" : "#48df7b";
    return (
        <div className="mb-12">
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

export default function ProfilesPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Layout title="HCS-11 Profiles" description="Universal Identity on Hedera.">
      <div className='min-h-screen bg-white dark:bg-[#1a1f3a] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#a679f0] selection:text-white transition-colors duration-300'>
        <ScrollProgress />
        
        {/* Background Noise */}
        <div className='fixed inset-0 pointer-events-none opacity-30 z-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] brightness-100 contrast-150 mix-blend-overlay' />

        {/* 1. HERO SECTION - Full Height */}
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
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#a679f0]/10 border border-[#a679f0]/30 text-[#a679f0] text-sm font-mono font-bold tracking-[0.2em] hover:bg-[#a679f0]/20 transition-colors"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#a679f0] animate-pulse" />
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

                        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-12">
                            UNIVERSAL <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#a679f0] animate-gradient-x">IDENTITY.</span>
                        </h1>

                        <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 max-w-3xl mb-16 leading-relaxed border-l-8 border-[#a679f0] pl-10">
                            <strong>HCS-11 Profiles</strong> define a standardized way to store identity metadata on Hedera. 
                            From AI Agents to MCP Servers, one schema unifies them all.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8">
                            <PrimaryButton href="/docs/standards/hcs-11" className="!text-xl !px-12 !py-6 shadow-2xl shadow-purple-500/20 rounded-2xl flex items-center justify-center gap-3">
                                READ SPEC <FaIdCard />
                            </PrimaryButton>
                            <SecondaryButton href="https://hol.org/points" className="!text-xl !px-12 !py-6 !border-[#48df7b] !text-[#48df7b] hover:!bg-[#48df7b] hover:!text-white rounded-2xl">
                                COLLECT POINTS
                            </SecondaryButton>
                        </div>
                    </motion.div>

                    <div className="hidden lg:block relative">
                        <IdentityHeroVisual />
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

        {/* 2. THE PROBLEM / SOLUTION - Split View */}
        <section className="py-24 relative z-10 bg-gray-50 dark:bg-[#1a1f3a] border-t border-b border-gray-200 dark:border-white/5">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid xl:grid-cols-2 gap-16">
                     <div className="sticky top-48 h-fit">
                         <SectionHeader title="The Identity Silo." subtitle="THE PROBLEM" color="blue" />
                         <p className="text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                             Every dApp rebuilds the user profile wheel. Avatars, bios, and social links are fragmented across dozens of databases.
                         </p>
                         <div className="p-10 bg-[#5599fe]/10 border border-[#5599fe]/30 rounded-3xl">
                             <p className="text-xl text-gray-900 dark:text-white leading-relaxed font-bold">
                                 HCS-11 consolidates this into a single, on-chain source of truth. Your account memo points to your profile. Any app can resolve it.
                             </p>
                         </div>
                     </div>
                     <div className="space-y-16">
                         {[
                             { icon: <FaGlobe />, title: "Universal Resolution", desc: "Just one memo lookup. The protocol supports HCS-1, HCS-2, IPFS, and Arweave storage backends." },
                             { icon: <FaRobot />, title: "AI Native", desc: "First-class support for Agent capabilities, model types, and HCS-10 communication channels." },
                             { icon: <FaServer />, title: "MCP Servers", desc: "Verify ownership of Model Context Protocol servers via DNS, signatures, or challenges." }
                         ].map((item, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="p-16 rounded-[3rem] bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/5 hover:border-[#5599fe]/50 transition-colors group shadow-xl"
                             >
                                 <div className="w-20 h-20 rounded-2xl bg-[#5599fe]/10 text-[#5599fe] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">
                                     {item.icon}
                                 </div>
                                 <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{item.title}</h3>
                                 <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                             </motion.div>
                         ))}
                     </div>
                 </div>
             </div>
        </section>

        {/* 3. ARCHITECTURE - Wide */}
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[#a679f0]/5 skew-y-2 transform origin-top-left -z-10 scale-110" />
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <SectionHeader title="The Memo Pointer." subtitle="RESOLUTION" color="purple" />
                
                <div className="grid xl:grid-cols-2 gap-12 mt-32 items-center">
                    <div>
                        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-16 leading-relaxed">
                            It starts with the account memo. By standardizing this single field, we unlock infinite extensibility without clogging the main account object.
                        </p>
                        <div className="bg-white dark:bg-[#1a1f3a] p-12 rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-2xl">
                            <h4 className="text-xl font-bold mb-8 text-[#a679f0] uppercase tracking-widest">Supported Protocols</h4>
                            <ul className="space-y-6 font-mono text-lg">
                                <li className="flex items-center gap-4">
                                    <span className="w-24 text-[#5599fe]">HCS-1</span>
                                    <code className="bg-gray-100 dark:bg-white/10 px-4 py-2 rounded text-gray-600 dark:text-gray-300">hcs-11:hcs://1/0.0.123</code>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-24 text-[#5599fe]">HCS-2</span>
                                    <code className="bg-gray-100 dark:bg-white/10 px-4 py-2 rounded text-gray-600 dark:text-gray-300">hcs-11:hcs://2/0.0.456</code>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-24 text-[#48df7b]">IPFS</span>
                                    <code className="bg-gray-100 dark:bg-white/10 px-4 py-2 rounded text-gray-600 dark:text-gray-300">hcs-11:ipfs://QmHash...</code>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-24 text-[#a679f0]">Arweave</span>
                                    <code className="bg-gray-100 dark:bg-white/10 px-4 py-2 rounded text-gray-600 dark:text-gray-300">hcs-11:ar://TxHash...</code>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-12 -left-12 text-gray-200 dark:text-white/5 text-9xl z-0"><FaKey /></div>
                        <div className="relative z-10 bg-[#1a1f3a] p-16 rounded-[4rem] border border-white/10 shadow-2xl">
                            <div className="text-gray-500 mb-8 font-mono text-lg uppercase tracking-widest">// AI AGENT PROFILE</div>
                            <Terminal title="agent-profile.json">
                                <Terminal.Line command='cat agent-profile.json | jq .' />
                                <Terminal.Line output='{' type="output" />
                                <Terminal.Line output='  "version": "1.0",' type="output" />
                                <Terminal.Line output='  "type": 1, // AI Agent' type="output" />
                                <Terminal.Line output='  "display_name": "Atlas Assistant",' type="output" />
                                <Terminal.Line output='  "bio": "I optimize DeFi portfolios on Hedera.",' type="output" />
                                <Terminal.Line output='  "profileImage": "hcs://1/0.0.99123",' type="output" />
                                <Terminal.Line output='  "inboundTopicId": "0.0.88123", // HCS-10' type="output" />
                                <Terminal.Line output='  "outboundTopicId": "0.0.88124",' type="output" />
                                <Terminal.Line output='  "aiAgent": {' type="output" />
                                <Terminal.Line output='    "type": 1, // Autonomous' type="output" />
                                <Terminal.Line output='    "model": "gpt-4-turbo",' type="output" />
                                <Terminal.Line output='    "capabilities": [9, 10, 16]' type="output" />
                                <Terminal.Line output='  }' type="output" />
                                <Terminal.Line output='}' type="output" />
                            </Terminal>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. MCP SERVERS - Interactive */}
        <section className="py-24 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div>
                         <SectionHeader title="MCP Verification." subtitle="TRUSTLESS" color="green" />
                         <p className="text-2xl text-gray-600 dark:text-gray-400 mb-16 leading-relaxed">
                             Model Context Protocol (MCP) servers allow AI models to interact with external data. 
                             HCS-11 provides a way to <strong>cryptographically verify</strong> that a Hedera account owns a specific MCP endpoint.
                         </p>
                         
                         <div className="space-y-12">
                             <div className="p-10 bg-white dark:bg-[#1a1f3a] border-l-8 border-[#48df7b] rounded-r-3xl shadow-lg">
                                 <h4 className="text-2xl font-bold mb-4 flex items-center gap-3"><FaGlobe /> DNS Verification</h4>
                                 <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Add a TXT record to your domain containing your Hedera Account ID.</p>
                                 <code className="block bg-gray-100 dark:bg-[#1a1f3a] p-4 rounded-xl font-mono text-sm">_hedera.example.com IN TXT "0.0.123456"</code>
                             </div>

                             <div className="p-10 bg-white dark:bg-[#1a1f3a] border-l-8 border-[#5599fe] rounded-r-3xl shadow-lg">
                                 <h4 className="text-2xl font-bold mb-4 flex items-center gap-3"><FaKey /> Signature Verification</h4>
                                 <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Sign your server URL with your account's private key. Clients verify the sig on-chain.</p>
                             </div>

                             <div className="p-10 bg-white dark:bg-[#1a1f3a] border-l-8 border-[#a679f0] rounded-r-3xl shadow-lg">
                                 <h4 className="text-2xl font-bold mb-4 flex items-center gap-3"><FaServer /> Challenge Verification</h4>
                                 <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Expose a <code>/hedera-verification</code> endpoint that returns a signed timestamp.</p>
                             </div>
                         </div>
                     </div>
                     <div className="bg-[#1a1f3a] p-16 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-12 opacity-10 text-[12rem] text-[#48df7b]">
                             <FaCheckCircle />
                         </div>
                         <div className="relative z-10">
                             <div className="text-gray-500 mb-8 font-mono text-lg uppercase tracking-widest">// MCP PROFILE</div>
                             <Terminal title="mcp-profile.json">
                                 <Terminal.Line command='cat mcp-profile.json | jq .' />
                                 <Terminal.Line output='{' type="output" />
                                 <Terminal.Line output='  "type": 2, // MCP Server' type="output" />
                                 <Terminal.Line output='  "display_name": "Hedera Consensus MCP",' type="output" />
                                 <Terminal.Line output='  "mcpServer": {' type="output" />
                                 <Terminal.Line output='    "version": "2025-03-26",' type="output" />
                                 <Terminal.Line output='    "connectionInfo": {' type="output" />
                                 <Terminal.Line output='      "url": "https://mcp.hedera.com",' type="output" />
                                 <Terminal.Line output='      "transport": "sse"' type="output" />
                                 <Terminal.Line output='    },' type="output" />
                                 <Terminal.Line output='    "verification": {' type="output" />
                                 <Terminal.Line output='      "type": "dns",' type="output" />
                                 <Terminal.Line output='      "value": "hedera.com",' type="output" />
                                 <Terminal.Line output='      "dns_field": "mcp-verify"' type="output" />
                                 <Terminal.Line output='    },' type="output" />
                                 <Terminal.Line output='    "services": [0, 1, 5] // Resource, Tool, API' type="output" />
                                 <Terminal.Line output='  }' type="output" />
                                 <Terminal.Line output='}' type="output" />
                             </Terminal>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* 5. PRIVACY & COMPLIANCE (HCS-19) */}
        <section className="py-24 bg-gray-50 dark:bg-[#1a1f3a] text-gray-900 dark:text-white">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="text-center max-w-5xl mx-auto mb-16">
                     <h2 className="text-6xl md:text-8xl font-bold mb-12 text-[#a679f0]">Privacy Built-In.</h2>
                     <p className="text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                         HCS-11 integrates seamlessly with <strong>HCS-19</strong> for privacy compliance. 
                         Declare your jurisdiction, link to your privacy policy, and reference your Consent Management topics directly in your profile.
                     </p>
                 </div>
                 
                 <div className="grid xl:grid-cols-2 gap-12 items-center">
                     <div className="order-2 xl:order-1 p-16 bg-white dark:bg-[#1a1f3a] rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-2xl">
                         <Terminal title="privacy-compliance.json">
                             <Terminal.Line command='cat privacy-compliance.json | jq .' />
                             <Terminal.Line output='{' type="output" />
                             <Terminal.Line output='  "privacy_compliance": {' type="output" />
                             <Terminal.Line output='    "standards": ["gdpr", "ccpa"],' type="output" />
                             <Terminal.Line output='    "jurisdictions": ["EU", "US-CA"],' type="output" />
                             <Terminal.Line output='    "consent_topic_id": "0.0.789101",' type="output" />
                             <Terminal.Line output='    "processing_topic_id": "0.0.789102",' type="output" />
                             <Terminal.Line output='    "dpo_contact": "dpo@example.com",' type="output" />
                             <Terminal.Line output='    "privacy_policy_url": "https://example.com/privacy"' type="output" />
                             <Terminal.Line output='  }' type="output" />
                             <Terminal.Line output='}' type="output" />
                         </Terminal>
                     </div>
                     <div className="order-1 xl:order-2 space-y-12">
                         <div className="flex items-start gap-8">
                             <div className="w-16 h-16 bg-[#a679f0]/10 rounded-2xl flex items-center justify-center text-[#a679f0] text-3xl"><FaUserCheck /></div>
                             <div>
                                 <h4 className="text-2xl font-bold mb-2">Consent Registry</h4>
                                 <p className="text-lg text-gray-600 dark:text-gray-400">Point to an HCS topic where user consent receipts are logged.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-8">
                             <div className="w-16 h-16 bg-[#5599fe]/10 rounded-2xl flex items-center justify-center text-[#5599fe] text-3xl"><FaGlobe /></div>
                             <div>
                                 <h4 className="text-2xl font-bold mb-2">Jurisdiction Aware</h4>
                                 <p className="text-lg text-gray-600 dark:text-gray-400">Explicitly declare which legal frameworks (GDPR, CCPA) you adhere to.</p>
                             </div>
                         </div>
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
                        <h4 className="text-3xl font-bold mb-8 text-[#5599fe]">Create Profile</h4>
                        <Terminal title="create-profile.ts">
                            <Terminal.Line command="import { HCS11 } from '@hashgraph/standards';" />
                            <Terminal.Line output="" />
                            <Terminal.Line command="const profile = {" />
                            <Terminal.Line command='    type: 1, // AI Agent' />
                            <Terminal.Line command='    display_name: "My Agent",' />
                            <Terminal.Line command='    bio: "I help with trading."' />
                            <Terminal.Line command="};" />
                            <Terminal.Line output="" />
                            <Terminal.Line output="// Uploads to HCS-1 and sets account memo" type="comment" />
                            <Terminal.Line command="await HCS11.publish(client, profile);" />
                        </Terminal>
                    </div>
                    
                    <div>
                        <h4 className="text-3xl font-bold mb-8 text-[#a679f0]">Resolve Profile</h4>
                        <Terminal title="resolve-profile.ts">
                            <Terminal.Line output="// Works with any account ID" type="comment" />
                            <Terminal.Line command='const accountId = "0.0.123456";' />
                            <Terminal.Line output="" />
                            <Terminal.Line output="// Automatically follows memo pointer (HCS-1, IPFS, etc.)" type="comment" />
                            <Terminal.Line command="const profile = await HCS11.resolve(client, accountId);" />
                            <Terminal.Line output="" />
                            <Terminal.Line command="console.log(profile.display_name);" />
                            <Terminal.Line output="> My Agent" type="output" />
                        </Terminal>
                    </div>
                </div>
            </div>
        </section>

        {/* 7. SOCIAL PROOF / PLATFORMS */}
        <section className="py-24 border-t border-gray-200 dark:border-white/10">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px] text-center">
                <h3 className="text-5xl font-bold mb-16">Connect Everywhere.</h3>
                <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
                    The <code>socials</code> array allows you to link your Web2 identity to your Web3 profile. Standardized platform enums ensure compatibility.
                </p>
                <div className="flex flex-wrap justify-center gap-12 text-6xl text-gray-400">
                    <FaTwitter className="hover:text-[#1DA1F2] transition-colors" />
                    <FaGithub className="hover:text-white transition-colors" />
                    <FaDiscord className="hover:text-[#5865F2] transition-colors" />
                    <FaLinkedin className="hover:text-[#0A66C2] transition-colors" />
                    <FaYoutube className="hover:text-[#FF0000] transition-colors" />
                </div>
            </div>
        </section>

        {/* 8. CTA */}
        <section className="py-24 text-center relative z-10 bg-gradient-to-b from-transparent to-[#0a0b10]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-white dark:bg-[#1a1f3a] p-24 rounded-[4rem] border border-gray-200 dark:border-white/10 shadow-2xl"
                >
                    <h2 className="text-7xl md:text-9xl font-bold mb-12 text-gray-900 dark:text-white">Claim Your Identity.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-8">
                        <PrimaryButton href="/docs/libraries/standards-sdk" className="!text-2xl !px-16 !py-8 shadow-2xl rounded-2xl">
                            START BUILDING
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