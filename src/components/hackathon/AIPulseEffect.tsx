import React from 'react';

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
      <div
        className={`absolute inset-0 rounded-full bg-gradient-radial ${colorMappings[color]}`}
      />
      <div
        className={`absolute inset-0 rounded-full bg-gradient-radial ${colorMappings[color]}`}
      />
      <div
        className={`absolute inset-0 rounded-full bg-gradient-radial ${colorMappings[color]}`}
      />
    </div>
  );
};

export default AIPulseEffect;
