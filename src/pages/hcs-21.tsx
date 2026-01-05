import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaCube, FaCheckCircle, FaCode, FaNetworkWired, FaArrowDown, FaBoxes, FaKey, FaDatabase, FaFileCode } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Terminal from '../components/ui/Terminal';

const ScrollProgress = () => {
    
    
    return <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b] origin-left z-[100]" />;
};

const AdapterComparison = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-8 mt-16">
            <div
                className="relative p-12 bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 rounded-[3rem] overflow-hidden"
            >
                <div className="absolute top-4 right-4 px-4 py-2 bg-gray-500/20 text-gray-500 rounded-full text-sm font-bold">
                    HCS-16 ONLY
                </div>
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Empty Nodes</h3>
                <div className="flex flex-col gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl opacity-50">
                            <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
                            <div className="flex-1">
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-gray-500 mt-6">
                    Without adapters, Flora nodes have no intelligence—just empty coordination.
                </p>
            </div>

            <div
                className="relative p-12 bg-white dark:bg-[#1a1f3a] border-2 border-[#5599fe] rounded-[3rem] overflow-hidden shadow-[0_0_40px_rgba(85,153,254,0.3)]"
            >
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#5599fe] text-white rounded-full text-sm font-bold">
                    HCS-16 + HCS-21
                </div>
                <h3 className="text-2xl font-bold mb-8 text-[#5599fe]">Active Adapters</h3>
                <div className="flex flex-col gap-6">
                    {[
                        { name: 'Price Oracle', icon: <FaDatabase />, color: '#5599fe' },
                        { name: 'Agent Registry', icon: <FaNetworkWired />, color: '#a679f0' },
                        { name: 'Trust Signals', icon: <FaKey />, color: '#48df7b' }
                    ].map((adapter, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/50 dark:from-white/5 to-transparent border border-gray-200 dark:border-white/10 rounded-xl"
                        >
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: `${adapter.color}20`, color: adapter.color }}>
                                {adapter.icon}
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-gray-900 dark:text-white">{adapter.name}</div>
                                <div className="text-sm text-gray-500">Processing consensus...</div>
                            </div>
                            <FaCheckCircle className="text-[#48df7b]" />
                        </div>
                    ))}
                </div>
                <p className="text-sm text-gray-500 mt-6">
                    With HCS-21, each adapter brings deterministic intelligence to the Flora.
                </p>
            </div>
        </div>
    );
};

const AdapterFlow = () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        {
            title: 'Publish Adapter',
            desc: 'Developer publishes adapter package to npm/PyPI/crates.io and creates signed manifest',
            icon: <FaCode />,
            color: '#5599fe'
        },
        {
            title: 'Register on HCS-21',
            desc: 'Adapter declaration message posted to registry topic with manifest pointer',
            icon: <FaBoxes />,
            color: '#a679f0'
        },
        {
            title: 'Flora Discovery',
            desc: 'Flora monitors adapter topic, resolves manifest, and installs package',
            icon: <FaNetworkWired />,
            color: '#48df7b'
        },
        {
            title: 'Consensus Ready',
            desc: 'All Petals run identical adapter version, producing verifiable consensus',
            icon: <FaCheckCircle />,
            color: '#5599fe'
        }
    ];

    return (
        <div className="mt-16">
            <div className="flex justify-center gap-2 mb-12">
                {steps.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`w-3 h-3 rounded-full transition-all ${activeStep === i ? 'w-12 bg-[#5599fe]' : 'bg-gray-300 dark:bg-gray-600'}`}
                    />
                ))}
            </div>

            <>
                <div
                    key={activeStep}
                    className="p-12 bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 rounded-[3rem]"
                >
                    <div className="flex items-center gap-6 mb-6">
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                            style={{ backgroundColor: `${steps[activeStep].color}20`, color: steps[activeStep].color }}
                        >
                            {steps[activeStep].icon}
                        </div>
                        <div>
                            <div className="text-sm font-mono tracking-wider mb-2" style={{ color: steps[activeStep].color }}>
                                STEP {activeStep + 1}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{steps[activeStep].title}</h3>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {steps[activeStep].desc}
                    </p>
                </div>
            </>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length)}
                    className="px-6 py-3 rounded-full bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:border-[#5599fe] transition-colors"
                >
                    ← Previous
                </button>
                <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="px-6 py-3 rounded-full bg-[#5599fe] text-white hover:bg-[#4a88e6] transition-colors"
                >
                    Next →
                </button>
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

export default function HCS21Page() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <Layout title="HCS-21 Adapter Registry" description="Platform-agnostic adapter registry for distributed appnets">
            <div className="min-h-screen bg-white dark:bg-[#1a1f3a] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#5599fe] selection:text-white transition-colors duration-300">
                <ScrollProgress />

                <div className='fixed inset-0 pointer-events-none opacity-30 z-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] brightness-100 contrast-150 mix-blend-overlay' />

                <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
                    <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px] relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div
                            >
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
                                    THE BRAIN <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#5599fe] animate-gradient-x">OF THE OPERATION.</span>
                                </h1>

                                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed border-l-4 border-[#5599fe] pl-6">
                                    <strong>HCS-21</strong> defines platform-agnostic adapter registries that give distributed appnets (Floras) their intelligence.
                                    Each adapter is a deterministic software package that achieves consensus about specific entity types.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <PrimaryButton href="/docs/standards/hcs-21" className="!text-base !px-8 !py-4 shadow-2xl shadow-blue-500/20 rounded-2xl flex items-center justify-center gap-3">
                                        READ SPEC <FaFileCode />
                                    </PrimaryButton>
                                    <SecondaryButton href="/docs/tutorials/floras/hcs-21-adapter-registry" className="!text-base !px-8 !py-4 !border-[#48df7b] !text-[#48df7b] hover:!bg-[#48df7b] hover:!text-white rounded-2xl">
                                        BUILD ADAPTER
                                    </SecondaryButton>
                                </div>
                            </div>

                            <div className="hidden lg:block relative">
                                <div
                                    className="relative w-full h-[600px] flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#5599fe]/20 via-transparent to-[#a679f0]/20 blur-[150px] rounded-full" />
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="absolute w-32 h-32 rounded-2xl border-4 flex items-center justify-center text-4xl"
                                            style={{
                                                borderColor: i === 0 ? '#5599fe' : i === 1 ? '#a679f0' : '#48df7b',
                                                backgroundColor: i === 0 ? '#5599fe20' : i === 1 ? '#a679f020' : '#48df7b20',
                                                top: `${30 + i * 20}%`,
                                                left: `${20 + i * 25}%`,
                                                transform: `rotate(${i * 45}deg)`
                                            }}
                                        >
                                            <FaCube style={{ color: i === 0 ? '#5599fe' : i === 1 ? '#a679f0' : '#48df7b' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#a679f0] text-3xl opacity-50"
                    >
                        <FaArrowDown />
                    </div>
                </section>

                <section className="py-24 relative z-10 bg-gray-50 dark:bg-[#1a1f3a] border-t border-b border-gray-200 dark:border-white/5">
                    <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                        <SectionHeader title="Adapters Make Floras Smart" subtitle="THE DIFFERENCE" color="blue" />
                        <AdapterComparison />
                    </div>
                </section>

                <section className="py-24 relative z-10">
                    <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                        <SectionHeader title="How It Works" subtitle="LIFECYCLE" color="purple" />
                        <AdapterFlow />
                    </div>
                </section>

                <section className="py-24 bg-gray-50 dark:bg-[#1a1f3a] border-t border-gray-200 dark:border-white/5">
                    <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                        <SectionHeader title="Live Example: Flora Price Oracle" subtitle="IN ACTION" color="green" />

                        <div className="mt-16 p-12 bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-white/10 rounded-[3rem]">
                            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Active Adapters</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { name: 'Binance Adapter', price: '$42,150', icon: <FaDatabase />, color: '#5599fe' },
                                    { name: 'Coinbase Adapter', price: '$42,148', icon: <FaDatabase />, color: '#a679f0' },
                                    { name: 'Kraken Adapter', price: '$42,152', icon: <FaDatabase />, color: '#48df7b' }
                                ].map((adapter, i) => (
                                    <div
                                        key={i}
                                        className="p-6 border border-gray-200 dark:border-white/10 rounded-2xl bg-gradient-to-br from-white dark:from-[#1a1f3a] to-gray-50 dark:to-[#1a1f3a]"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${adapter.color}20`, color: adapter.color }}>
                                                {adapter.icon}
                                            </div>
                                            <div className="font-bold text-sm text-gray-900 dark:text-white">{adapter.name}</div>
                                        </div>
                                        <div className="text-3xl font-bold mb-2" style={{ color: adapter.color }}>{adapter.price}</div>
                                        <div className="text-sm text-gray-500">BTC/USD</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-6 bg-[#48df7b]/10 border border-[#48df7b]/30 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <FaCheckCircle className="text-[#48df7b]" />
                                    <span className="font-bold text-gray-900 dark:text-white">Consensus Reached</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    All three adapters agree on price range. Flora state hash: <code className="text-[#5599fe]">0xb4c3...</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 relative z-10">
                    <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px]">
                        <SectionHeader title="The Protocol" subtitle="MESSAGES" color="blue" />

                        <div className="grid lg:grid-cols-2 gap-8 mt-16">
                            <div>
                                <h4 className="text-2xl font-bold mb-6 text-[#5599fe]">Adapter Declaration</h4>
                                <Terminal title="adapter-declaration.json">
                                    <Terminal.Line command='cat adapter-declaration.json | jq .' />
                                    <Terminal.Line output='{' type="output" />
                                    <Terminal.Line output='  "protocol": "HCS-21",' type="output" />
                                    <Terminal.Line output='  "adapter_id": "price-oracle-v1",' type="output" />
                                    <Terminal.Line output='  "manifest": "hcs://1/0.0.123456",' type="output" />
                                    <Terminal.Line output='  "package": "npm:@flora/price-oracle@1.0.0",' type="output" />
                                    <Terminal.Line output='  "entity_type": "price_feed"' type="output" />
                                    <Terminal.Line output='}' type="output" />
                                </Terminal>
                            </div>

                            <div className="flex items-center">
                                <div className="p-8 bg-white dark:bg-[#1a1f3a] border border-[#a679f0]/30 rounded-[3rem]">
                                    <FaNetworkWired className="text-4xl text-[#a679f0] mb-6" />
                                    <h4 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Deterministic Consensus</h4>
                                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Every Flora participant runs the exact same adapter version, ensuring reproducible state hashes via HCS-17.
                                        No more "it works on my machine" in distributed consensus.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-gray-50 dark:bg-[#1a1f3a] border-t border-gray-200 dark:border-white/5">
                    <div className="container mx-auto px-6 2xl:px-0 max-w-[1400px] text-center">
                        <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Build Your First Adapter</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                            Create deterministic adapters for any data source—agent registries, oracles, governance feeds—and plug them into any Flora.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <PrimaryButton href="/docs/tutorials/floras/hcs-21-adapter-registry" className="!text-base !px-8 !py-4 shadow-2xl shadow-blue-500/20 rounded-2xl !bg-[#5599fe] hover:!bg-[#4a88e6]">
                                START BUILDING
                            </PrimaryButton>
                            <SecondaryButton href="/docs/standards/hcs-21" className="!text-base !px-8 !py-4 !border-[#a679f0] !text-[#a679f0] hover:!bg-[#a679f0] hover:!text-white rounded-2xl">
                                READ FULL SPEC
                            </SecondaryButton>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
}
