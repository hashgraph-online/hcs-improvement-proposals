import React from 'react';
import { motion } from 'motion/react';

type AIPulseEffectProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'purple' | 'green';
  intensity?: 'low' | 'medium' | 'high';
};

const AIPulseEffect: React.FC<AIPulseEffectProps> = ({
  size = 'md',
  color = 'blue',
  intensity = 'medium',
}) => {
  const sizeMappings = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
  };

  const colorMappings = {
    blue: 'from-hedera-blue/30 to-hedera-blue/5',
    purple: 'from-hedera-purple/30 to-hedera-purple/5',
    green: 'from-hedera-green/30 to-hedera-green/5',
  };

  const intensityMappings = {
    low: {
      duration: 5,
      opacity: 0.3,
    },
    medium: {
      duration: 3,
      opacity: 0.5,
    },
    high: {
      duration: 1.5,
      opacity: 0.7,
    },
  };

  const { duration, opacity } = intensityMappings[intensity];

  return (
    <div className={`relative ${sizeMappings[size]}`}>
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-radial ${colorMappings[color]}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [opacity, opacity * 0.5, opacity],
        }}
        transition={{
          repeat: Infinity,
          duration,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-radial ${colorMappings[color]}`}
        animate={{
          scale: [1.1, 1.3, 1.1],
          opacity: [opacity * 0.7, opacity * 0.3, opacity * 0.7],
        }}
        transition={{
          repeat: Infinity,
          duration: duration * 1.3,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-radial ${colorMappings[color]}`}
        animate={{
          scale: [1.2, 1.4, 1.2],
          opacity: [opacity * 0.5, opacity * 0.2, opacity * 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: duration * 1.7,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
};

export default AIPulseEffect;
