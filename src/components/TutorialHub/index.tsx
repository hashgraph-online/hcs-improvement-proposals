
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedBackground } from '../ui';
import { tutorials } from './data';
import VideoTheater from './VideoTheater';
import TutorialStepList from './TutorialStepList';
import TutorialWaterfall from './TutorialWaterfall';

const getTutorialIdFromHash = (hash: string, fallbackId: string): string => {
    const rawHash = hash.startsWith('#') ? hash.slice(1) : hash;
    if (!rawHash) {
        return fallbackId;
    }
    const parsed = rawHash.startsWith('tutorial=') ? rawHash.slice('tutorial='.length) : rawHash;
    const decoded = decodeURIComponent(parsed);
    const match = tutorials.find(tutorial => tutorial.id === decoded);
    return match ? match.id : fallbackId;
};

const buildTutorialHash = (tutorialId: string): string =>
    `tutorial=${encodeURIComponent(tutorialId)}`;

const TutorialHub: React.FC = () => {
    const [activeTutorialId, setActiveTutorialId] = useState(() => {
        if (typeof window === 'undefined') {
            return tutorials[0].id;
        }
        return getTutorialIdFromHash(window.location.hash, tutorials[0].id);
    });

    const activeTutorial = tutorials.find(t => t.id === activeTutorialId) || tutorials[0];

    React.useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const handleHashChange = () => {
            const nextId = getTutorialIdFromHash(window.location.hash, tutorials[0].id);
            if (nextId !== activeTutorialId) {
                setActiveTutorialId(nextId);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [activeTutorialId]);

    const handleSelect = React.useCallback((id: string) => {
        setActiveTutorialId(id);
        if (typeof window === 'undefined') {
            return;
        }
        const nextHash = buildTutorialHash(id);
        if (window.location.hash !== `#${nextHash}`) {
            window.history.replaceState(
                null,
                '',
                `${window.location.pathname}${window.location.search}#${nextHash}`
            );
        }
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <section className="relative py-6 sm:py-8 overflow-hidden border-b border-gray-100 dark:border-gray-900">
                <AnimatedBackground
                    variant='blobs'
                    colors={['brand-blue', 'brand-purple', 'brand-green']}
                    intensity='low'
                    opacity={0.05}
                />
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-gray-900 dark:text-white mb-3">
                            Learning
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Paths_</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            Master Hedera Consensus Service through our curated, hands-on video series.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl pt-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <div className="lg:col-span-8 space-y-12">
                        <motion.div
                            key={activeTutorialId}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <VideoTheater tutorial={activeTutorial} />
                        </motion.div>

                        <TutorialWaterfall tutorial={activeTutorial} />
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <TutorialStepList
                                currentId={activeTutorialId}
                                steps={tutorials}
                                onSelect={handleSelect}
                            />
                            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Need Help?</h4>
                                <p className="text-sm text-gray-500 mb-4">
                                    Stuck on a step? Join our Telegram community for real-time support.
                                </p>
                                <a
                                    href="https://t.me/hashinals"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-semibold text-brand-blue hover:underline"
                                >
                                    Join Telegram &rarr;
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TutorialHub;
