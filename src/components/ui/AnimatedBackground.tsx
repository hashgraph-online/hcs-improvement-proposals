import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'blobs' | 'lines' | 'dots' | 'gradient';
  colors?: string[];
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  opacity?: number;
}

interface BlobsProps {
  colors: string[];
  intensity: string;
  opacity: number;
}

interface LinesProps {
  colors: string[];
  opacity: number;
}

interface GradientProps {
  colors: string[];
  opacity: number;
}

const BlobsBackground: React.FC<BlobsProps> = ({
  colors,
  intensity,
  opacity,
}) => {
  const getIntensityClasses = () => {
    switch (intensity) {
      case 'low':
        return 'animate-pulse';
      case 'medium':
        return 'animate-pulse';
      case 'high':
        return 'animate-bounce';
      default:
        return 'animate-pulse';
    }
  };

  const getDelayClass = (index: number) => {
    const delays = ['delay-0', 'delay-1000', 'delay-2000'];
    return delays[index % delays.length];
  };

  return (
    <>
      <div
        className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-${
          colors[0]
        }/10 to-transparent rounded-full blur-3xl ${getIntensityClasses()} ${getDelayClass(
          0
        )}`}
        style={{ opacity }}
      ></div>
      <div
        className={`absolute bottom-40 left-40 w-80 h-80 bg-gradient-to-tr from-${
          colors[1]
        }/10 to-transparent rounded-full blur-3xl ${getIntensityClasses()} ${getDelayClass(
          1
        )}`}
        style={{ opacity }}
      ></div>
      <div
        className={`absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-${
          colors[2]
        }/10 to-transparent rounded-full blur-xl ${getIntensityClasses()} ${getDelayClass(
          2
        )}`}
        style={{ opacity }}
      ></div>
    </>
  );
};

const LinesBackground: React.FC<LinesProps> = ({ colors, opacity }) => (
  <>
    <div
      className={`absolute top-20 left-20 w-1 h-32 bg-gradient-to-b from-${colors[0]}/30 to-transparent`}
      style={{ opacity }}
    ></div>
    <div
      className={`absolute bottom-40 right-32 w-1 h-24 bg-gradient-to-b from-${colors[1]}/30 to-transparent`}
      style={{ opacity }}
    ></div>
    <div
      className={`absolute top-1/2 right-20 w-1 h-20 bg-gradient-to-b from-${colors[2]}/30 to-transparent`}
      style={{ opacity }}
    ></div>
  </>
);

const GradientBackground: React.FC<GradientProps> = ({ colors, opacity }) => (
  <div
    className={`absolute inset-0 bg-gradient-to-br from-${colors[0]}/5 via-transparent to-${colors[1]}/5`}
    style={{ opacity }}
  ></div>
);

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'blobs',
  colors = ['brand-blue', 'brand-purple', 'brand-green'],
  intensity = 'medium',
  className = '',
  opacity = 0.1,
}) => {
  const BackgroundContent = () => {
    switch (variant) {
      case 'blobs':
        return (
          <BlobsBackground
            colors={colors}
            intensity={intensity}
            opacity={opacity}
          />
        );
      case 'lines':
        return <LinesBackground colors={colors} opacity={opacity} />;
      case 'dots':
        return (
          <BlobsBackground
            colors={colors}
            intensity={intensity}
            opacity={opacity}
          />
        );
      case 'gradient':
        return <GradientBackground colors={colors} opacity={opacity} />;
      default:
        return (
          <BlobsBackground
            colors={colors}
            intensity={intensity}
            opacity={opacity}
          />
        );
    }
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <BackgroundContent />
    </div>
  );
};

export default AnimatedBackground;
