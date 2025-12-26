
import React from 'react';
import clsx from 'clsx';
import type { Tutorial } from './types';

interface TutorialStepListProps {
    currentId: string;
    steps: Tutorial[];
    onSelect: (id: string) => void;
}

const TutorialStepList: React.FC<TutorialStepListProps> = ({ currentId, steps, onSelect }) => {
    const [query, setQuery] = React.useState('');

    const normalizedQuery = React.useMemo(
        () => query.trim().toLowerCase(),
        [query]
    );

    const filteredSteps = React.useMemo(() => {
        if (!normalizedQuery) {
            return steps;
        }
        return steps.filter(step => {
            const haystack = [
                step.title,
                step.subtitle,
                ...(step.prerequisites || [])
            ]
                .join(' ')
                .toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [steps, normalizedQuery]);

    const handleSearchChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(event.target.value);
        },
        []
    );

    const currentIndex = steps.findIndex(step => step.id === currentId);

    return (
        <div className="w-full">
            <div className="mb-4 px-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Learning Path
                </h3>
                <input
                    type="search"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder="Search tutorials"
                    aria-label="Search tutorials"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
            </div>

            <div className="relative space-y-0 lg:max-h-[calc(100vh-18rem)] lg:overflow-y-auto lg:pr-1">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-200 dark:bg-gray-800" />

                {filteredSteps.map(step => {
                    const isActive = step.id === currentId;
                    const stepIndex = steps.findIndex(s => s.id === step.id);
                    const isPast = currentIndex > stepIndex;

                    return (
                        <div
                            key={step.id}
                            className={clsx(
                                "group relative flex items-start gap-4 p-3 rounded-lg transition-all duration-200 cursor-pointer",
                                isActive ? "bg-blue-50/50 dark:bg-blue-900/10" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            )}
                            onClick={() => onSelect(step.id)}
                        >
                            <div className="relative z-10 flex-shrink-0 mt-0.5">
                                {isPast ? (
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm border border-green-600">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                ) : isActive ? (
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md ring-4 ring-blue-100 dark:ring-blue-900 border border-blue-600">
                                        <span className="font-mono text-sm font-bold">{stepIndex + 1}</span>
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 text-gray-400 font-mono text-sm font-medium flex items-center justify-center group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-colors">
                                        {stepIndex + 1}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 py-1">
                                <div className="flex items-center justify-between mb-0.5">
                                    <p className={clsx(
                                        "text-sm font-bold truncate",
                                        isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"
                                    )}>
                                        {step.title}
                                    </p>
                                    {isActive && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded uppercase">
                                            Now
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                    {step.subtitle}
                                </p>

                                <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {step.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {filteredSteps.length === 0 && (
                    <div className="px-4 py-6 text-sm text-gray-500">
                        No tutorials match your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorialStepList;
