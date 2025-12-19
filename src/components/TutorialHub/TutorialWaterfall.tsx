
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import { Tutorial } from './data';
import { Typography } from '../ui';

interface TutorialWaterfallProps {
    tutorial: Tutorial;
}

const TutorialWaterfall: React.FC<TutorialWaterfallProps> = ({ tutorial }) => {
    return (
        <div className="space-y-12 max-w-[65ch] mx-auto py-8">
            {/* 1. Overview */}
            <section>
                <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-gray-100">
                    Overview
                </Typography>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {tutorial.description}
                </p>

                {/* Learning Points if available */}
                {tutorial.learningPoints && tutorial.learningPoints.length > 0 && (
                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30">
                        <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-3">Key Learnings</h4>
                        <ul className="space-y-2">
                            {tutorial.learningPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            {/* 2. Code Lab (The "Meat") */}
            {tutorial.code && tutorial.code.length > 0 ? (
                <section>
                    <Typography variant="h3" className="mb-6 font-bold text-gray-900 dark:text-gray-100">
                        Code Lab
                    </Typography>

                    <div className="space-y-8">
                        {tutorial.code.map((snippet, index) => (
                            <div key={index} className="relative">
                                {snippet.filename && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                                            {snippet.filename}
                                        </span>
                                    </div>
                                )}
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 ring-4 ring-gray-50 dark:ring-gray-800/50">
                                    <CodeBlock language={snippet.language} showLineNumbers>
                                        {snippet.content}
                                    </CodeBlock>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-sm text-gray-500 text-center">
                        Copy to your local environment to run.
                    </div>
                </section>
            ) : (
                <section className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500">Code examples coming soon for this lesson.</p>
                </section>
            )}

            {/* 3. Resources */}
            <section>
                <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-gray-100">
                    Resources
                </Typography>
                {tutorial.resources && tutorial.resources.length > 0 ? (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                        <ul className="space-y-3">
                            {tutorial.resources.map((resource, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-blue hover:text-blue-600 hover:underline font-medium transition-colors"
                                    >
                                        {resource.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No additional resources.</p>
                )}
            </section>
        </div>
    );
};

export default TutorialWaterfall;
