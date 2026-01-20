import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaCoins, FaCheckCircle, FaGlobe, FaLock, FaKey, FaArrowDown, FaExchangeAlt, FaHistory, FaCheckDouble } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Terminal from '../components/ui/Terminal';

// --- VISUAL COMPONENTS ---

const ScrollProgress = () => {
    
    
    return <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b] origin-left z-[100]" />;
};

const PointsHeroVisual = () => {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center perspective-[1200px] overflow-visible">
      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#5599fe]/20 via-transparent to-[#a679f0]/20 blur-[150px] rounded-full mix-blend-screen opacity-60" />

      {/* COIN STACK */}
      <div className="relative z-10 [transform-style:preserve-3d]">
        {[0, 1, 2].map((i) => (
            <div
                key={i}
                className="absolute w-64 h-64 rounded-full border-[12px] border-[#5599fe] bg-[#5599fe]/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(85,153,254,0.4)]"
                style={{ top: i * -40, left: i * 20, transform: `translateZ(${i * 50}px)` }}
            >
                <FaCoins className="text-8xl text-[#5599fe]" />
            </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, color = "blue" }: { title: string, subtitle: string, color?: "blue" | "purple" | "green" }) => {
    const colorHex = color === "blue" ? "#5599fe" : color === "purple" ? "#a679f0" : "#48df7b";
    return (
        <div className="mb-12">
            <div
                className="flex items-center gap-3 mb-4"
            >
                <span className="w-12 h-0.5 rounded-full" style={{ backgroundColor: colorHex }} />
                <span className="text-sm font-mono tracking-[0.2em] font-bold uppercase" style={{ color: colorHex }}>{subtitle}</span>
            </div>
            <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[0.9]"
            >
                {title}
            </h2>
        </div>
    );
};

// --- MAIN PAGE ---

export default function HCS20Page() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Layout title="HCS-20 Auditable Points" description="Auditable points standard on Hedera.">
      <div className='min-h-screen bg-white dark:bg-[#1a1f3a] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#5599fe] selection:text-white transition-colors duration-300'>
        <ScrollProgress />
        
        {/* Background Noise */}
        <div className='fixed inset-0 pointer-events-none opacity-30 z-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] brightness-100 contrast-150 mix-blend-overlay' />

        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px] relative z-10">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div
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

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.85] mb-6">
                            AUDITABLE <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#5599fe] animate-gradient-x">POINTS.</span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed border-l-4 border-[#5599fe] pl-6">
                            <strong>HCS-20</strong> is the standard for high-volume, low-cost, auditable points on Hedera.
                            Perfect for loyalty programs, gaming leaderboards, and community rewards without the complexity of HTS.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton href="/docs/standards/hcs-20/" className="!text-base !px-8 !py-4 shadow-2xl shadow-blue-500/20 rounded-2xl flex items-center justify-center gap-3">
                                READ SPEC <FaCheckDouble />
                            </PrimaryButton>
                            <SecondaryButton href="https://hol.org/points" className="!text-base !px-8 !py-4 !border-[#48df7b] !text-[#48df7b] hover:!bg-[#48df7b] hover:!text-white rounded-2xl">
                                COLLECT POINTS
                            </SecondaryButton>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <PointsHeroVisual />
                    </div>
                 </div>
             </div>

             <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#a679f0] text-3xl opacity-50"
             >
                 <FaArrowDown />
             </div>
        </section>

        {/* 2. THE RATIONALE */}
        <section className="py-24 relative z-10 bg-gray-50 dark:bg-[#1a1f3a] border-t border-b border-gray-200 dark:border-white/5">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <div className="grid xl:grid-cols-2 gap-12">
                     <div className="sticky top-48 h-fit">
                         <SectionHeader title="Why HCS-20?" subtitle="RATIONALE" color="blue" />
                         <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                             Token services are powerful but can be overkill for non-financial points.
                             HCS-20 strips away the complexity of liquidity pools and regulatory gray areas, offering a pure, transparent ledger for points.
                         </p>
                         <div className="p-6 bg-[#5599fe]/10 border border-[#5599fe]/30 rounded-3xl">
                             <p className="text-base text-gray-900 dark:text-white leading-relaxed font-bold">
                                 It's just JSON on a topic. Simple, fast, and completely auditable by anyone with a mirror node connection.
                             </p>
                         </div>
                     </div>
                     <div className="space-y-12">
                         {[
                             { icon: <FaCheckCircle />, title: "Public Auditability", desc: "Every mint, burn, and transfer is recorded in the consensus stream. Anyone can verify the total supply and holder balances." },
                             { icon: <FaGlobe />, title: "No Liquidity Issues", desc: "Since they aren't native tokens, there's no expectation of liquidity pools or exchange listings. Ideal for closed-loop loyalty." },
                             { icon: <FaLock />, title: "Flexible Control", desc: "Use a private topic with a submit key for centralized control (gaming, admin) or a public topic for decentralized minting." }
                         ].map((item, i) => (
                             <div
                                key={i}
                                className="p-12 rounded-[3rem] bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/5 hover:border-[#a679f0]/50 transition-colors group shadow-xl"
                             >
                                 <div className="w-16 h-16 rounded-2xl bg-[#a679f0]/10 text-[#a679f0] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                     {item.icon}
                                 </div>
                                 <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                                 <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
        </section>

        {/* 3. TWO MODES */}
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[#a679f0]/5 skew-y-2 transform origin-top-left -z-10 scale-110" />
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                <SectionHeader title="Two Modes." subtitle="OPERATION" color="purple" />

                <div className="grid xl:grid-cols-2 gap-8 mt-16">
                    <div className="bg-white dark:bg-[#1a1f3a] p-12 rounded-[4rem] border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-[10rem] text-[#a679f0] group-hover:scale-110 transition-transform">
                            <FaLock />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-6 text-[#a679f0]">Private Mode</h3>
                            <div className="inline-block px-4 py-2 bg-[#a679f0] text-white font-bold rounded-full mb-8">✅ Submit Key</div>
                            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                The topic has a submit key. Only the owner can post messages.
                            </p>
                            <ul className="space-y-4 text-base text-gray-500">
                                <li className="flex items-center gap-4"><FaCheckDouble className="text-[#a679f0]" /> Centralized Control (Game Server)</li>
                                <li className="flex items-center gap-4"><FaCheckDouble className="text-[#a679f0]" /> High Throughput</li>
                                <li className="flex items-center gap-4"><FaCheckDouble className="text-[#a679f0]" /> Spam Proof</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1a1f3a] p-12 rounded-[4rem] border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-[10rem] text-[#48df7b] group-hover:scale-110 transition-transform">
                            <FaGlobe />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-6 text-[#48df7b]">Public Mode</h3>
                            <div className="inline-block px-4 py-2 bg-[#48df7b] text-white font-bold rounded-full mb-8">❌ No Submit Key</div>
                            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                The topic is open. Anyone can post. Indexers validate the "Payer Account" to ensure only the owner of points can move them.
                            </p>
                            <ul className="space-y-4 text-base text-gray-500">
                                <li className="flex items-center gap-4"><FaCheckDouble className="text-[#48df7b]" /> Decentralized Minting</li>
                                <li className="flex items-center gap-4"><FaCheckDouble className="text-[#48df7b]" /> Community Driven</li>
                                <li className="flex items-center gap-4"><FaCheckDouble className="text-[#48df7b]" /> Requires Strict Indexing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. OPERATIONS */}
        <section className="py-24 relative z-10">
             <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                 <SectionHeader title="The Protocol." subtitle="JSON SCHEMA" color="blue" />

                 <div className="grid xl:grid-cols-2 gap-8 mt-16">
                     <div>
                         <h4 className="text-2xl font-bold mb-6 text-[#5599fe]">Deploy</h4>
                         <Terminal title="deploy.json">
                             <Terminal.Line command='cat deploy.json | jq .' />
                             <Terminal.Line output='{' type="output" />
                             <Terminal.Line output='  "p": "hcs-20",' type="output" />
                             <Terminal.Line output='  "op": "deploy",' type="output" />
                             <Terminal.Line output='  "name": "Points",' type="output" />
                             <Terminal.Line output='  "tick": "pts",' type="output" />
                             <Terminal.Line output='  "max": "1000000",' type="output" />
                             <Terminal.Line output='  "lim": "1000"' type="output" />
                             <Terminal.Line output='}' type="output" />
                         </Terminal>
                     </div>
                     <div>
                         <h4 className="text-2xl font-bold mb-6 text-[#5599fe]">Mint</h4>
                         <Terminal title="mint.json">
                             <Terminal.Line command='cat mint.json | jq .' />
                             <Terminal.Line output='{' type="output" />
                             <Terminal.Line output='  "p": "hcs-20",' type="output" />
                             <Terminal.Line output='  "op": "mint",' type="output" />
                             <Terminal.Line output='  "tick": "pts",' type="output" />
                             <Terminal.Line output='  "amt": "1000",' type="output" />
                             <Terminal.Line output='  "to": "0.0.123456"' type="output" />
                             <Terminal.Line output='}' type="output" />
                         </Terminal>
                     </div>
                     <div>
                         <h4 className="text-2xl font-bold mb-6 text-[#5599fe]">Transfer</h4>
                         <Terminal title="transfer.json">
                             <Terminal.Line command='cat transfer.json | jq .' />
                             <Terminal.Line output='{' type="output" />
                             <Terminal.Line output='  "p": "hcs-20",' type="output" />
                             <Terminal.Line output='  "op": "transfer",' type="output" />
                             <Terminal.Line output='  "tick": "pts",' type="output" />
                             <Terminal.Line output='  "amt": "500",' type="output" />
                             <Terminal.Line output='  "from": "0.0.123456",' type="output" />
                             <Terminal.Line output='  "to": "0.0.987654"' type="output" />
                             <Terminal.Line output='}' type="output" />
                         </Terminal>
                     </div>
                     <div className="flex flex-col justify-center">
                         <div className="p-8 bg-white dark:bg-[#1a1f3a] border border-[#a679f0]/30 rounded-[3rem]">
                             <FaHistory className="text-4xl text-[#a679f0] mb-6" />
                             <h4 className="text-2xl font-bold mb-3">Consensus Ordering</h4>
                             <p className="text-base text-gray-500">
                                 The state is calculated by replaying these messages in order.
                                 Valid transfers require sufficient balance. Valid mints must respect the `max` supply and `lim` per transaction.
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* 5. TURTLE MOON APP */}
        <section className="py-24 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1f3a]">
            <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px] text-center">
                <h3 className="text-4xl font-bold mb-8">No Code Required.</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                    The <strong>Turtle Moon HCS App</strong> allows you to deploy, mint, and transfer HCS-20 points without writing a single line of code.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <PrimaryButton href="https://patches-1.gitbook.io/hcs-20-auditable-points/download" className="!text-base !px-8 !py-4 shadow-2xl shadow-blue-500/20 rounded-2xl !bg-[#5599fe] hover:!bg-[#4a88e6]">
                        DOWNLOAD APP
                    </PrimaryButton>
                </div>
            </div>
        </section>

      </div>
    </Layout>
  );
}
