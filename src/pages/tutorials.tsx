import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaPlay, 
    FaCheckCircle, 
    FaBook, 
    FaCode, 
    FaGraduationCap, 
    FaArrowRight, 
    FaList
} from 'react-icons/fa';
import YouTube from '../components/YouTube';
import PrimaryButton from '../components/PrimaryButton';
import { Typography, TabbedTerminal, Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui';

// --- DATA ---
const TUTORIALS = [
  {
    id: "registry-broker",
    title: "The Registry Broker",
    subtitle: "Universal Agent Discovery",
    videoId: "eOX0cVvUDhQ",
    duration: "12:15",
    level: "Intermediate",
    description: "The Registry Broker is the central nervous system of the Agentic Internet. It allows agents to discover each other, verify identities, and establish secure communication channels across different protocols (Virtuals, NANDA, MCP). In this tutorial, we'll build a search client and initiate a handshake.",
    learningPoints: [
      "Initialize the RegistryBrokerClient with your API Key",
      "Perform semantic search to find 'audit' or 'defi' agents",
      "Resolve Universal Agent IDs (UAIDs) to endpoints",
      "Initiate a multi-protocol handshake"
    ],
    relatedDocs: [
      { label: "Client SDK Reference", href: "/docs/libraries/standards-sdk/registry-broker-client" },
      { label: "Search API", href: "/docs/registry-broker/search" },
      { label: "Multi-Protocol Chat", href: "/docs/registry-broker/multi-protocol-chat" }
    ],
    codeExamples: [
        {
            id: 'installation',
            title: "Installation",
            language: 'bash',
            code: `npm install @hashgraphonline/standards-sdk\n# added 1 package in 2s`,
            icon: <FaCode />,
            color: 'blue' as const,
            difficulty: 'Beginner'
        },
        {
            id: 'find-agents',
            title: "find-agents.ts",
            language: 'typescript',
            icon: <FaCode />,
            color: 'purple' as const,
            difficulty: 'Intermediate',
            code: `import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

// 1. Initialize the client
const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY
});

// 2. Search for agents (Semantic Search)
const results = await client.search({
  q: 'smart contract audit',
  minTrust: 80, // Minimum trust score
  limit: 5
});

console.log(\`Found \${results.total} agents matching query\`);

// 3. Resolve an agent specific details
const agent = results.agents[0];
console.log(\`Connecting to: \${agent.name} (\${agent.uaid})\`);
`
        }
    ]
  },
  {
      id: "hcs-20-points",
      title: "HCS-20 Points",
      subtitle: "DeFi Loyalty Programs",
      videoId: "placeholder_id_1", // Placeholder
      duration: "Coming Soon",
      level: "Advanced",
      description: "Learn how to implement HCS-20 for on-chain loyalty points.",
      learningPoints: [],
      relatedDocs: [],
      codeExamples: []
  },
  {
      id: "openconvai",
      title: "OpenConvAI",
      subtitle: "Standardized Agent Comms",
      videoId: "placeholder_id_2", // Placeholder
      duration: "Coming Soon",
      level: "Advanced",
      description: "Bridge distinct agent frameworks using the OpenConvAI standard.",
      learningPoints: [],
      relatedDocs: [],
      codeExamples: []
  }
];

export default function TutorialsPage() {
  const [activeTutorialId, setActiveTutorialId] = useState(TUTORIALS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeTutorial = TUTORIALS.find(t => t.id === activeTutorialId) || TUTORIALS[0];

  return (
    <Layout
      title="Academy | Hashgraph Standards"
      description="Master the Agentic Internet with interactive tutorials."
    >
        <div className='min-h-screen bg-white dark:bg-[#050505] font-sans text-gray-900 dark:text-white flex flex-col md:flex-row'>
            
            {/* SIDEBAR NAVIGATION (Desktop: Sticky, Mobile: Hidden/Drawer) */}
            <motion.aside 
                className={`flex-shrink-0 w-full md:w-80 bg-gray-50 dark:bg-[#0a0a0c] border-r border-gray-200 dark:border-white/5 h-[auto] md:h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto z-20 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}
            >
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8 text-gray-400 text-xs font-mono uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-[#5599fe]" />
                        Course Index
                    </div>
                    
                    <nav className="space-y-4">
                        {TUTORIALS.map((tutorial, index) => (
                            <button 
                                key={tutorial.id}
                                onClick={() => setActiveTutorialId(tutorial.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 ${
                                    activeTutorialId === tutorial.id 
                                    ? 'bg-white dark:bg-white/5 border-[#5599fe] shadow-lg shadow-[#5599fe]/10' 
                                    : 'border-transparent hover:bg-white dark:hover:bg-white/5 hover:border-gray-200 dark:hover:border-white/10'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                                        activeTutorialId === tutorial.id ? 'bg-[#5599fe] text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-500'
                                    }`}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {tutorial.duration !== "Coming Soon" && (
                                        <span className="text-[10px] text-gray-400 font-mono">{tutorial.duration}</span>
                                    )}
                                </div>
                                <h3 className={`font-bold mb-1 ${activeTutorialId === tutorial.id ? 'text-[#5599fe]' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {tutorial.title}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-1">{tutorial.subtitle}</p>
                            </button>
                        ))}
                    </nav>
                </div>
            </motion.aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 min-w-0 bg-white dark:bg-[#050505] relative">
                
                {/* TUTORIAL HEADER */}
                <div className="max-w-5xl mx-auto px-6 py-8 md:py-12">
                   
                   {/* Mobile Sidebar Toggle */}
                    <div className="md:hidden mb-6">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="flex items-center gap-2 text-sm font-bold text-[#5599fe]"
                        >
                            <FaList /> {isSidebarOpen ? 'Hide Course Index' : 'Show Course Index'}
                        </button>
                    </div>

                    <motion.div
                        key={activeTutorialId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                             {/* VIDEO PLAYER */}
                             <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 relative group">
                                {activeTutorial.videoId.startsWith('placeholder') ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                        <div className="text-center">
                                            <FaPlay className="text-4xl text-gray-700 mb-4 mx-auto" />
                                            <p className="text-gray-500 font-mono">Coming Soon</p>
                                        </div>
                                    </div>
                                ) : (
                                    <YouTube id={activeTutorial.videoId} title={activeTutorial.title} />
                                )}
                             </div>
                        </div>

                        {/* SHADCN STYLE TABS */}
                        <Tabs defaultValue="guide" variant="underline" className="w-full">
                            <TabsList className="mb-8">
                                <TabsTrigger value="guide" icon={<FaBook />}>Overview</TabsTrigger>
                                <TabsTrigger value="code" icon={<FaCode />}>Code Lab</TabsTrigger>
                                <TabsTrigger value="resources" icon={<FaGraduationCap />}>Resources</TabsTrigger>
                            </TabsList>

                            <TabsContent value="guide">
                                <div className="grid md:grid-cols-3 gap-12">
                                    <div className="col-span-2">
                                        <h1 className="text-3xl font-bold mb-4">{activeTutorial.title}</h1>
                                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                            {activeTutorial.description}
                                        </div>
                                        
                                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
                                            <PrimaryButton href="/docs/libraries/standards-sdk" className="flex items-center gap-2">
                                                Start Building <FaArrowRight />
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                    
                                    <div className="col-span-1 bg-gray-50 dark:bg-[#0a0a0c] p-6 rounded-2xl border border-gray-200 dark:border-white/5 h-fit">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Key concepts</h4>
                                        <ul className="space-y-4">
                                            {activeTutorial.learningPoints.map((point, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                                                    <FaCheckCircle className="text-[#48df7b] mt-0.5 shrink-0" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                            {activeTutorial.learningPoints.length === 0 && (
                                                <li className="text-gray-500 italic text-sm">Content coming soon.</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="code">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold mb-2">Interactive Code Lab</h2>
                                    <p className="text-gray-500">Explore the source code used in this lesson.</p>
                                </div>
                                
                                {activeTutorial.codeExamples.length > 0 ? (
                                    <TabbedTerminal 
                                        title="Environment" 
                                        examples={activeTutorial.codeExamples} 
                                        className="shadow-2xl border border-gray-200 dark:border-white/10"
                                        height="600px"
                                    />
                                ) : (
                                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                                        <p className="text-gray-400">Code examples coming soon for this lesson.</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="resources">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {activeTutorial.relatedDocs.map((doc, i) => (
                                        <a 
                                            key={i}
                                            href={doc.href}
                                            className="group p-6 bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-white/10 rounded-xl hover:border-[#5599fe] transition-all hover:-translate-y-1 block"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-[#5599fe]/10 flex items-center justify-center text-[#5599fe] mb-4 group-hover:bg-[#5599fe] group-hover:text-white transition-colors">
                                                <FaBook />
                                            </div>
                                            <h3 className="font-bold mb-2 text-lg group-hover:text-[#5599fe]">{doc.label}</h3>
                                            <p className="text-xs text-gray-500 font-mono">Documentation</p>
                                        </a>
                                    ))}
                                    {activeTutorial.relatedDocs.length === 0 && (
                                        <p className="text-gray-500">No resources available yet.</p>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>

                    </motion.div>
                </div>
            </main>
        </div>
    </Layout>
  );
}
