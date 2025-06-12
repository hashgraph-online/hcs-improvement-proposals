import React, { useEffect, useState } from 'react';

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

/**
 * HashgraphConsensus visualizes the actual Hedera hashgraph consensus algorithm.
 * Shows the DAG structure with events, gossip propagation, and virtual voting.
 */
export const HashgraphConsensus: React.FC<HashgraphConsensusProps> = ({
  className = '',
  animated = true,
}) => {
  const [events, setEvents] = useState<HashgraphEvent[]>([]);
  const [activeGossip, setActiveGossip] = useState<string[]>([]);

  const nodeCount = 9;
  const width = 800;
  const height = 600;

  useEffect(() => {
    const initialEvents: HashgraphEvent[] = [];
    const rounds = 8;
    const eventsPerRound = 3;

    for (let round = 0; round < rounds; round++) {
      for (let i = 0; i < eventsPerRound; i++) {
        const nodeId = (round * eventsPerRound + i) % nodeCount;
        const event: HashgraphEvent = {
          id: `event-${round}-${i}`,
          x: 100 + (nodeId * (width - 200)) / (nodeCount - 1),
          y: height - 80 - round * 60,
          timestamp: Date.now() + round * 1000,
          parentHashes:
            round > 0
              ? [
                  `event-${round - 1}-${Math.floor(
                    Math.random() * eventsPerRound
                  )}`,
                ]
              : [],
          nodeId,
          round,
        };
        initialEvents.push(event);
      }
    }

    setEvents(initialEvents);
  }, []);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      if (randomEvent) {
        setActiveGossip([randomEvent.id]);
        setTimeout(() => setActiveGossip([]), 1500);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [events, animated]);

  return (
    <div className={`relative ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
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
        {Array.from({ length: nodeCount }).map((_, nodeIndex) => (
          <g key={`node-${nodeIndex}`}>
            <circle
              cx={100 + (nodeIndex * (width - 200)) / (nodeCount - 1)}
              cy={height - 30}
              r='8'
              fill='currentColor'
              className='text-gray-400 dark:text-gray-600'
            />
            <text
              x={100 + (nodeIndex * (width - 200)) / (nodeCount - 1)}
              y={height - 10}
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
          y2={height - 60}
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
