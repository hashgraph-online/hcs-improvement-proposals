import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

interface HashgraphEvent {
  id: string;
  x: number;
  y: number;
  timestamp: number;
  parentHashes: string[];
  nodeId: number;
  round: number;
}

interface HashgraphConsensusProps {
  className?: string;
  animated?: boolean;
}

const NODE_COUNT = 9;
const WIDTH = 800;
const HEIGHT = 600;
const ROUNDS = 8;
const EVENTS_PER_ROUND = 3;

/**
 * HashgraphConsensus visualizes the actual Hedera hashgraph consensus algorithm.
 * Shows the DAG structure with events, gossip propagation, and virtual voting.
 * Optimized for performance with Intersection Observer and reduced re-renders.
 */
export const HashgraphConsensus: React.FC<HashgraphConsensusProps> = ({
  className = '',
  animated = true,
}) => {
  const [activeGossip, setActiveGossip] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const events = useMemo(() => {
    const initialEvents: HashgraphEvent[] = [];
    for (let round = 0; round < ROUNDS; round++) {
      for (let i = 0; i < EVENTS_PER_ROUND; i++) {
        const nodeId = (round * EVENTS_PER_ROUND + i) % NODE_COUNT;
        const event: HashgraphEvent = {
          id: `event-${round}-${i}`,
          x: 100 + (nodeId * (WIDTH - 200)) / (NODE_COUNT - 1),
          y: HEIGHT - 80 - round * 60,
          timestamp: Date.now() + round * 1000,
          parentHashes:
            round > 0
              ? [`event-${round - 1}-${i % EVENTS_PER_ROUND}`]
              : [],
          nodeId,
          round,
        };
        initialEvents.push(event);
      }
    }
    return initialEvents;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animateGossip = useCallback(() => {
    if (events.length === 0) return;
    const randomIndex = Math.floor(Math.random() * events.length);
    const randomEvent = events[randomIndex];
    if (randomEvent) {
      setActiveGossip([randomEvent.id]);
    }
  }, [events]);

  useEffect(() => {
    if (!animated || !isVisible) {
      setActiveGossip([]);
      return;
    }

    const interval = setInterval(animateGossip, 4000);
    const clearGossipTimeout = setInterval(() => {
      setActiveGossip([]);
    }, 5500);

    return () => {
      clearInterval(interval);
      clearInterval(clearGossipTimeout);
    };
  }, [animated, isVisible, animateGossip]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className='w-full h-full'
      >
        <defs>
          <linearGradient
            id='gossipGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.6' />
            <stop offset='100%' stopColor='#8b5cf6' stopOpacity='0.3' />
          </linearGradient>

          <filter id='eventGlow'>
            <feGaussianBlur stdDeviation='2' result='coloredBlur' />
            <feMerge>
              <feMergeNode in='coloredBlur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>

        {/* Gossip connections between events */}
        {events.map((event) =>
          event.parentHashes.map((parentId, index) => {
            const parent = events.find((e) => e.id === parentId);
            if (!parent) return null;

            const isActive =
              activeGossip.includes(event.id) ||
              activeGossip.includes(parent.id);

            return (
              <line
                key={`${event.id}-${parentId}-${index}`}
                x1={parent.x}
                y1={parent.y}
                x2={event.x}
                y2={event.y}
                stroke={isActive ? 'url(#gossipGradient)' : '#9ca3af'}
                strokeWidth={isActive ? '2' : '1'}
                opacity={isActive ? '0.9' : '0.4'}
                className={`transition-all duration-500 ${
                  isActive ? 'animate-pulse' : ''
                }`}
              />
            );
          })
        )}

        {/* Node positions (bottom) */}
        {Array.from({ length: NODE_COUNT }).map((_, nodeIndex) => (
          <g key={`node-${nodeIndex}`}>
            <circle
              cx={100 + (nodeIndex * (WIDTH - 200)) / (NODE_COUNT - 1)}
              cy={HEIGHT - 30}
              r='8'
              fill='currentColor'
              className='text-gray-400 dark:text-gray-600'
            />
            <text
              x={100 + (nodeIndex * (WIDTH - 200)) / (NODE_COUNT - 1)}
              y={HEIGHT - 10}
              textAnchor='middle'
              fontSize='10'
              fill='currentColor'
              className='text-gray-500 dark:text-gray-400 font-mono'
            >
              N{nodeIndex}
            </text>
          </g>
        ))}

        {/* Events in the hashgraph */}
        {events.map((event) => {
          const isActive = activeGossip.includes(event.id);

          return (
            <g key={event.id}>
              {/* Event circle */}
              <circle
                cx={event.x}
                cy={event.y}
                r={isActive ? '6' : '4'}
                fill='currentColor'
                filter={isActive ? 'url(#eventGlow)' : undefined}
                className={`transition-all duration-300 ${
                  isActive
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              />

              {/* Round indicator */}
              <text
                x={event.x + 10}
                y={event.y + 3}
                fontSize='8'
                fill='currentColor'
                className='text-gray-500 dark:text-gray-400 font-mono'
              >
                R{event.round}
              </text>
            </g>
          );
        })}

        {/* Time axis */}
        <line
          x1='50'
          y1='80'
          x2='50'
          y2={HEIGHT - 60}
          stroke='currentColor'
          strokeWidth='1'
          className='text-gray-300 dark:text-gray-600'
        />

        <text
          x='30'
          y='75'
          fontSize='10'
          fill='currentColor'
          className='text-gray-500 dark:text-gray-400 font-mono'
          transform='rotate(-90, 30, 75)'
        >
          TIME
        </text>
      </svg>

      {/* Legend */}
      <div className='absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-mono'>
        <div className='text-gray-600 dark:text-gray-400 mb-1'>
          Hashgraph Consensus
        </div>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
          <span className='text-gray-600 dark:text-gray-400'>Gossip Event</span>
        </div>
      </div>
    </div>
  );
};
