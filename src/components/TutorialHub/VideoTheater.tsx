
import React from 'react';
import { motion } from 'framer-motion';
import type { Tutorial } from './types';
import { Typography } from '../ui';
import YouTube from '../YouTube';

interface VideoTheaterProps {
    tutorial: Tutorial;
}

const VideoTheater: React.FC<VideoTheaterProps> = ({ tutorial }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);

    // Reset state when tutorial changes
    React.useEffect(() => {
        setIsPlaying(false);
    }, [tutorial.id]);

    const isPlaceholder = tutorial.videoId.startsWith('placeholder');

    return (
        <div className="w-full bg-gray-900 rounded-none sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Top Metadata Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 text-xs font-mono font-medium text-brand-blue bg-blue-500/10 rounded-full border border-blue-500/20">
                        {tutorial.difficulty.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">
                        {tutorial.duration}
                    </span>
                </div>
            </div>

            {/* Video Player Area */}
            <div
                className={`relative aspect-video w-full bg-black group ${!isPlaceholder && !isPlaying ? 'cursor-pointer' : ''}`}
                onClick={() => !isPlaceholder && setIsPlaying(true)}
            >
                {isPlaying && !isPlaceholder ? (
                    <div className="absolute inset-0">
                        {/* We override the margin/padding of the YouTube component to fit our theater container */}
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1`}
                                title={tutorial.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Poster Image */}
                        {!isPlaceholder && (
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                                style={{ backgroundImage: `url(https://img.youtube.com/vi/${tutorial.videoId}/maxresdefault.jpg)` }}
                            />
                        )}

                        {/* Overlay Gradient (for contrast) */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Fallback/Base Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 -z-10" />

                        {/* Decoration */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {isPlaceholder ? (
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-400 font-mono text-sm">Coming Soon</p>
                                </div>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:bg-brand-blue/90 group-hover:border-brand-blue transition-colors duration-300"
                                >
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>

                        {/* On-Video Text */}

                    </>
                )}
            </div>

            {/* Bottom Context Bar (Below Video) */}
            <div className="px-6 py-5 bg-gray-900">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">{tutorial.title}</h1>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                            {tutorial.prerequisites.length > 0 && (
                                <span className="flex items-center gap-1">
                                    <span className="text-gray-500">Prerequisites:</span>
                                    <span className="text-gray-300 bg-gray-800 px-2 py-0.5 rounded text-xs">{tutorial.prerequisites.join(', ')}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoTheater;
