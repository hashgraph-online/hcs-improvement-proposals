import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaCube, FaLayerGroup, FaBolt, FaFingerprint, FaCode, FaCompressArrowsAlt, FaPuzzlePiece, FaDatabase, FaArrowDown, FaLink, FaHistory, FaArrowRight } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Terminal from '../components/ui/Terminal';

const SectionHeader = ({ title, subtitle, color = "green" }: { title: string, subtitle: string, color?: "blue" | "purple" | "green" }) => {
    const colorHex = color === "blue" ? "#5599fe" : color === "purple" ? "#a679f0" : "#48df7b";
    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-0.5 rounded-full" style={{ backgroundColor: colorHex }} />
                <span className="text-sm font-mono tracking-[0.2em] font-bold uppercase" style={{ color: colorHex }}>{subtitle}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[0.9]">
                {title}
            </h2>
        </div>
    );
};

const HeroVisual = () => (
    <div className="relative w-full h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#48df7b]/10 via-transparent to-[#5599fe]/10 rounded-3xl" />
        <div className="relative w-48 h-48 border-4 border-[#48df7b]/50 rounded-3xl flex items-center justify-center bg-[#48df7b]/5 shadow-lg">
            <div className="w-24 h-24 border-2 border-[#48df7b]/30 rounded-full flex items-center justify-center">
                <FaCube className="text-4xl text-[#48df7b]" />
            </div>
        </div>
    </div>
);

const PipelineVisual = () => (
    <div className="w-full py-12 bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 rounded-3xl flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 gap-8 shadow-xl">
        <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-50 dark:bg-[#1a1f3a] border-4 border-gray-300 dark:border-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-3xl lg:text-4xl text-gray-400 font-mono">01</span>
            </div>
            <span className="text-sm font-mono font-bold tracking-widest text-gray-500">RAW.BIN</span>
        </div>

        <div className="hidden lg:block flex-1 h-2 bg-gradient-to-r from-gray-200 via-[#48df7b] to-gray-200 dark:from-white/10 dark:to-white/10 rounded-full" />

        <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 lg:w-28 lg:h-28 bg-[#48df7b]/10 border-4 border-[#48df7b] rounded-2xl flex items-center justify-center">
                <FaCompressArrowsAlt className="text-3xl lg:text-4xl text-[#48df7b]" />
            </div>
            <span className="text-sm font-mono font-bold tracking-widest text-[#48df7b]">ZSTD / BROTLI</span>
        </div>

        <div className="hidden lg:block flex-1 h-2 bg-gradient-to-r from-gray-200 via-[#5599fe] to-gray-200 dark:from-white/10 dark:to-white/10 rounded-full" />

        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
                {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-12 bg-[#5599fe]/10 border-2 border-[#5599fe] rounded-lg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#5599fe] rounded-full" />
                    </div>
                ))}
            </div>
            <span className="text-sm font-mono font-bold tracking-widest text-[#5599fe]">CHUNKS</span>
        </div>
    </div>
);

const TokenBindingVisual = () => (
    <div className="relative w-full max-w-5xl mx-auto py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-white to-gray-100 dark:from-[#1a1b2e] dark:to-black border-4 border-[#48df7b] rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <div className="w-16 h-16 bg-[#48df7b]/20 rounded-xl mb-3 flex items-center justify-center">
                    <FaFingerprint className="text-3xl text-[#48df7b]" />
                </div>
                <div className="text-xs text-[#48df7b] font-mono font-bold tracking-widest">HCS-1 FILE</div>
                <div className="mt-1 font-mono text-xs text-gray-500">0.0.456789</div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1a1f3a] border-2 border-[#5599fe] flex items-center justify-center shadow-md">
                    <FaLink className="text-xl text-[#5599fe]" />
                </div>
                <div className="text-center">
                    <div className="text-xs font-mono text-[#5599fe] mb-1">HCS-5 BINDING</div>
                </div>
            </div>

            <div className="w-40 h-40 md:w-48 md:h-48 bg-white dark:bg-[#1a1f3a] border-4 border-[#5599fe] rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
                    <div className="text-xs font-bold text-gray-500 tracking-widest mb-1">HTS TOKEN</div>
                    <div className="text-[#5599fe] font-mono text-2xl md:text-3xl font-bold">#123</div>
                    <div className="mt-1 text-xs text-gray-500">NFT Serial</div>
                </div>
            </div>
        </div>

        <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#5599fe]/10 border border-[#5599fe]/30">
                <span className="font-mono text-sm">hcs://1/0.0.456789</span>
                <FaArrowRight className="text-[#5599fe]" />
                <span className="font-mono text-sm">NFT Metadata</span>
            </div>
        </div>
    </div>
);

const MutablePointerVisual = () => (
    <div className="w-full min-h-[350px] relative bg-gray-50 dark:bg-[#1a1f3a] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden p-8 lg:p-12 flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-12">
        <div className="w-48 h-48 bg-white dark:bg-[#1a1f3a] border-4 border-[#a679f0] rounded-2xl flex flex-col items-center justify-center relative z-10 shadow-lg">
            <span className="text-[#a679f0] font-bold mb-3 text-xl">HCS-6 Token</span>
            <div className="px-4 py-2 bg-[#a679f0]/10 rounded-lg text-sm font-mono font-bold">ptr: 0.0.99</div>
        </div>

        <div className="flex-1 min-h-[180px] bg-white dark:bg-white/5 border-4 border-dashed border-gray-300 dark:border-white/20 rounded-2xl flex items-center justify-center relative p-6">
            <div className="absolute -top-4 left-8 px-4 py-1.5 bg-[#a679f0] text-white text-sm font-bold rounded-full shadow-md">REGISTRY 0.0.99</div>
            
            <div className="flex flex-col gap-4 w-full max-w-md">
                <div className="w-full h-14 bg-[#a679f0]/20 border-2 border-[#a679f0] rounded-xl flex items-center justify-between px-6">
                    <span className="text-sm font-bold text-[#a679f0]">LATEST MSG</span>
                    <span className="font-mono text-sm text-gray-900 dark:text-white">t_id: 0.0.555</span>
                </div>
                <div className="w-full h-14 bg-gray-200 dark:bg-white/5 border border-transparent rounded-xl flex items-center justify-between px-6 opacity-40">
                    <span className="text-sm font-bold text-gray-500">HISTORY</span>
                    <span className="font-mono text-sm text-gray-500">t_id: 0.0.444</span>
                </div>
            </div>
        </div>

        <div className="w-48 h-48 bg-white dark:bg-[#1a1f3a] border-4 border-[#48df7b] rounded-2xl flex flex-col items-center justify-center relative z-10 shadow-lg">
            <span className="text-[#48df7b] font-bold mb-3 text-xl">HCS-1 Content</span>
            <div className="px-4 py-2 bg-[#48df7b]/10 rounded-lg text-sm font-mono font-bold">0.0.555</div>
        </div>
    </div>
);

export default function HashinalsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <Layout title="HCS-1/5/6 Hashinals" description="True on-chain artifacts on Hedera.">
      <div className="min-h-screen bg-white dark:bg-[#1a1f3a] font-sans text-gray-900 dark:text-white overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center pt-20 pb-16">
          <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px] relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative inline-block text-left mb-6 z-50">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#48df7b]/10 border border-[#48df7b]/30 text-[#48df7b] text-sm font-mono font-bold tracking-[0.2em] hover:bg-[#48df7b]/20 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#48df7b]" />
                    STANDARDS
                    <FaArrowDown className={`ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 overflow-hidden">
                      <div className="py-2">
                        <Link to="/standards" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Standards Overview</Link>
                        <Link to="/docs/intro" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Standards Library</Link>
                        <Link to="/tutorials" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Tutorials</Link>
                        <div className="h-px bg-gray-100 dark:bg-white/5 my-1" />
                        <Link to="/hashinals" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Files & Hashinals</Link>
                        <Link to="/registries" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Data Registries</Link>
                        <Link to="/openconvai" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#5599fe] transition-colors !no-underline">Agent Communication</Link>
                      </div>
                    </div>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                  TRUE <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48df7b] to-[#5599fe]">ON-GRAPH.</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed border-l-4 border-[#48df7b] pl-6">
                  Data sovereignty on the Hashgraph.
                  <br/><br/>
                  <strong>HCS-1</strong> (Files) and <strong>HCS-5</strong> (Hashinals) enable you to inscribe raw data directly into the immutable ledger of Hedera, forever.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <PrimaryButton href="/docs/standards/hcs-5" className="!text-base !px-8 !py-4 shadow-xl rounded-xl flex items-center justify-center gap-2">
                    READ SPEC <FaBolt />
                  </PrimaryButton>
                  <SecondaryButton href="https://hol.org/points" className="!text-base !px-8 !py-4 !border-[#48df7b] !text-[#48df7b] hover:!bg-[#48df7b] hover:!text-white rounded-xl">
                    COLLECT POINTS
                  </SecondaryButton>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <HeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 relative z-10 bg-white dark:bg-[#1a1f3a]/80 border-t border-b border-gray-200 dark:border-white/5">
          <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
            <div className="grid xl:grid-cols-2 gap-16 xl:gap-24">
              <div>
                <SectionHeader title="Permanence." subtitle="PHILOSOPHY" color="green" />
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Most NFTs are just receipts pointing to a URL on a centralized server or an IPFS hash that might disappear if not pinned.
                </p>
                <div className="p-8 bg-[#48df7b]/10 border border-[#48df7b]/30 rounded-2xl">
                  <p className="text-lg text-gray-900 dark:text-white leading-relaxed font-medium">
                    HCS-1 Files utilize the high-throughput ordering of the Hedera Consensus Service. The data is etched into the immutable record stream, archived by Mirror Nodes, and secured by Block Nodes. It is a 'store once, serve forever' architecture.
                  </p>
                </div>
              </div>
              <div className="grid gap-8">
                {[
                  { icon: <FaDatabase />, title: "Immutability", desc: "Once submitted to HCS, the message is finalized. It cannot be altered or deleted." },
                  { icon: <FaLink />, title: "Accessibility", desc: "Data is retrievable via any Mirror Node using standard REST APIs. No special gateways required." },
                  { icon: <FaHistory />, title: "Provenance", desc: "Every chunk has a consensus timestamp. Prove exactly when a file was uploaded." }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-2xl bg-gray-50 dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/5 hover:border-[#48df7b]/50 transition-colors shadow-lg">
                    <div className="w-14 h-14 rounded-xl bg-[#48df7b]/10 text-[#48df7b] flex items-center justify-center text-2xl mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HCS-1 Pipeline Section */}
        <section className="py-20 relative z-10 bg-gray-50 dark:bg-[#1a1f3a]">
          <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
            <SectionHeader title="The File Pipeline." subtitle="HCS-1 STANDARD" color="blue" />
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mb-16 leading-relaxed">
              HCS-1 solves the problem of storing large files on a high-throughput consensus service using a strict 3-stage pipeline.
            </p>

            <PipelineVisual />

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 border-t-4 border-[#48df7b] bg-white dark:bg-[#1a1f3a] rounded-2xl shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-[#48df7b]">1. Compress</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Input data is compressed using <strong>zstd</strong> or <strong>brotli</strong>. Reduces on-chain footprint by 30-50%.</p>
                <Terminal title="compression.ts">
                  <Terminal.Line command="zstd.compress(buffer, 10)" />
                </Terminal>
              </div>
              <div className="p-8 border-t-4 border-[#5599fe] bg-white dark:bg-[#1a1f3a] rounded-2xl shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-[#5599fe]">2. Encode</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">The compressed blob is converted to a <strong>base64</strong> string for safe JSON transport.</p>
                <Terminal title="encoding.ts">
                  <Terminal.Line command="buffer.toString('base64')" />
                </Terminal>
              </div>
              <div className="p-8 border-t-4 border-[#a679f0] bg-white dark:bg-[#1a1f3a] rounded-2xl shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-[#a679f0]">3. Chunk</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">The string is sliced into <strong>1024-char</strong> segments to bypass HCS message limits.</p>
                <Terminal title="chunking.ts">
                  <Terminal.Line command="chunks.map((c, i) => ({o:i, c}))" />
                </Terminal>
              </div>
            </div>
          </div>
        </section>

        {/* Schema Section */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
            <div className="grid xl:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader title="The Atom of Data." subtitle="SCHEMA" color="purple" />
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                  Every HCS-1 message is a self-contained JSON object. Indexers aggregate these atoms to reconstruct the original file.
                </p>
                <ul className="space-y-8">
                  <li className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#48df7b]/10 flex items-center justify-center text-[#48df7b] font-mono text-xl font-bold flex-shrink-0">o</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Order Index</h4>
                      <p className="text-gray-500">The integer index of the chunk. Allows parallel uploading.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#5599fe]/10 flex items-center justify-center text-[#5599fe] font-mono text-xl font-bold flex-shrink-0">c</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Content</h4>
                      <p className="text-gray-500">The substring of the base64 encoded data.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#a679f0]/10 flex items-center justify-center text-[#a679f0] font-mono text-xl font-bold flex-shrink-0">m</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Topic Memo</h4>
                      <p className="text-gray-500">Contains the SHA-256 hash, algo, and encoding for validation.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1f3a] p-8 lg:p-12 rounded-3xl border border-white/10 shadow-xl font-mono text-sm relative overflow-hidden">
                <div className="text-gray-500 mb-6 uppercase tracking-widest text-xs">// Chunk Sequence</div>
                <div className="space-y-6 relative z-10">
                  <div className="pl-6 border-l-4 border-[#48df7b]">
                    <span className="text-yellow-500">{`{`}</span><br/>
                    &nbsp;&nbsp;<span className="text-blue-400">"o"</span>: <span className="text-purple-400">0</span>,<br/>
                    &nbsp;&nbsp;<span className="text-blue-400">"c"</span>: <span className="text-green-400">"data:image/png;base64,iVBORw0K..."</span><br/>
                    <span className="text-yellow-500">{`}`}</span>
                  </div>
                  <div className="pl-6 border-l-4 border-[#5599fe]">
                    <span className="text-yellow-500">{`{`}</span><br/>
                    &nbsp;&nbsp;<span className="text-blue-400">"o"</span>: <span className="text-purple-400">1</span>,<br/>
                    &nbsp;&nbsp;<span className="text-blue-400">"c"</span>: <span className="text-green-400">"AgICAgICAgICAgICAgICAgICAg..."</span><br/>
                    <span className="text-yellow-500">{`}`}</span>
                  </div>
                  <div className="pl-6 border-l-4 border-[#a679f0]">
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

        {/* HCS-5 Token Binding Section */}
        <section className="py-20 bg-[#1a1f3a] text-white">
          <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#5599fe]">Tokenizing Data.</h2>
              <p className="text-gray-400 leading-relaxed">
                A file on HCS is just data. A <strong>Hashinal</strong> is that data owned by a key.
                HCS-5 binds the Topic ID to a Hedera Token Service (HTS) serial number.
              </p>
            </div>

            <TokenBindingVisual />

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="text-xl font-bold mb-3 text-[#5599fe]">The HRL</h4>
                <p className="text-sm text-gray-400 mb-4">
                  The token's metadata field uses the <strong>Hedera Resource Locator</strong> schema.
                </p>
                <div className="p-4 bg-[#1a1f3a] rounded-xl border border-white/10 font-mono text-center text-[#5599fe]">
                  hcs://1/0.0.123456
                </div>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="text-xl font-bold mb-3 text-[#5599fe]">First is First</h4>
                <p className="text-sm text-gray-400">
                  Inscription numbers are assigned based on the <strong>consensus timestamp</strong> of the mint. The network serves as the clock.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HCS-6 Dynamic Section */}
        <section className="py-20 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1f3a]">
          <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                LIVING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] to-[#5599fe]">ASSETS.</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Static files are great for art, but games need state. HCS-6 introduces <strong>Mutable Pointers</strong>.
              </p>
            </div>

            <MutablePointerVisual />

            <div className="mt-12 text-center">
              <PrimaryButton href="/docs/standards/hcs-6" className="!bg-[#a679f0] hover:!bg-[#9055fe] shadow-xl !text-base !px-8 !py-4 rounded-xl">
                EXPLORE HCS-6 SPEC
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* SDK Examples Section */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
            <SectionHeader title="Build with the SDK." subtitle="DEVELOPER TOOLS" color="green" />
            
            <div className="grid xl:grid-cols-2 gap-12 mt-16">
              <div>
                <h4 className="text-2xl font-bold mb-6 text-[#48df7b]">HCS-1: Upload File</h4>
                <Terminal title="upload.ts">
                  <Terminal.Line command="import { HCS1 } from '@hashgraph/standards';" />
                  <Terminal.Line output="" />
                  <Terminal.Line command="const topicId = await HCS1.uploadFile(client, buffer, {" />
                  <Terminal.Line command='    memo: "My File",' />
                  <Terminal.Line command='    compression: "zstd"' />
                  <Terminal.Line command="});" />
                </Terminal>
              </div>
              
              <div>
                <h4 className="text-2xl font-bold mb-6 text-[#5599fe]">HCS-5: Mint Hashinal</h4>
                <Terminal title="mint.ts">
                  <Terminal.Line command="import { HCS5 } from '@hashgraph/standards';" />
                  <Terminal.Line output="" />
                  <Terminal.Line command="await HCS5.mint(client, {" />
                  <Terminal.Line command='    topicId: "0.0.12345",' />
                  <Terminal.Line command='    tokenName: "My Art",' />
                  <Terminal.Line command='    metadata: "hcs://1/0.0.12345"' />
                  <Terminal.Line command="});" />
                </Terminal>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 border-t border-gray-200 dark:border-white/10">
          <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
            <h3 className="text-4xl font-bold mb-16 text-center">Dynamic Possibilities.</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Gaming", desc: "Weapon durability, character leveling, or skin changes. The NFT stays the same, the visuals update via HCS-6." },
                { title: "Real Estate", desc: "A property deed NFT. The HCS-6 registry tracks maintenance logs, tax payments, and renovations." },
                { title: "Identity", desc: "A profile picture NFT. Update your PFP by simply posting a message to your registry topic." }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-[#a679f0] transition-colors bg-white dark:bg-[#1a1f3a] shadow-lg">
                  <h4 className="font-bold text-2xl mb-4">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center relative z-10 bg-white dark:bg-[#1a1f3a]">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto bg-white dark:bg-[#1a1f3a] p-10 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Inscribe?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <PrimaryButton href="/docs/libraries/standards-sdk/inscribe" className="!text-base !px-8 !py-4 shadow-xl rounded-xl">
                  USE THE SDK
                </PrimaryButton>
                <SecondaryButton href="https://hol.org/points" className="!text-base !px-8 !py-4 rounded-xl">
                  COLLECT POINTS
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
