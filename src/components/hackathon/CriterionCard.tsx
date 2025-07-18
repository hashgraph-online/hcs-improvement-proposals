import React, { ReactNode } from 'react';
import HackathonTypography from './HackathonTypography';

type CriterionCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  percentage: string;
  gradientStart: string;
  gradientEnd: string;
  progressBarWidth: string;
  isCompact?: boolean;
};

const CriterionCard: React.FC<CriterionCardProps> = ({
  icon,
  title,
  description,
  percentage,
  gradientStart,
  gradientEnd,
  progressBarWidth,
  isCompact = false,
}) => {
  const mainColor = gradientStart;

  const paddingClasses = isCompact ? 'p-4 sm:p-4' : 'p-4 sm:p-5 md:p-7';

  const gapMarginClasses = isCompact ? 'mb-3' : 'sm:gap-5 mb-3 sm:mb-5';

  const iconSizeClasses = isCompact
    ? 'w-8 h-8 sm:w-10 sm:h-10'
    : 'w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14';

  const textSizeClasses = isCompact
    ? 'text-xs sm:text-sm'
    : 'text-sm sm:text-lg md:text-xl';

  const percentageTextSizeClasses = isCompact
    ? 'text-xs sm:text-sm'
    : 'text-sm sm:text-lg';

  const progressBarHeightClass = isCompact ? 'h-1' : 'h-1.5';
  const progressBarMarginClass = isCompact ? 'ml-1' : 'ml-2 sm:ml-2.5';

  const descriptionMarginClass = isCompact ? 'mt-0' : 'mt-2 sm:mt-3';
  const descriptionPaddingClass = 'pl-2';

  let startColorHex = '';
  if (mainColor === 'hedera-purple' || mainColor === '[#a679f0]') {
    startColorHex = '#a679f0';
  } else if (mainColor === 'hedera-blue' || mainColor === '[#5599fe]') {
    startColorHex = '#5599fe';
  } else if (mainColor === 'hedera-green' || mainColor === '[#48df7b]') {
    startColorHex = '#48df7b';
  } else if (mainColor.startsWith('[#') && mainColor.endsWith(']')) {
    startColorHex = mainColor.slice(1, -1);
  } else {
    startColorHex = '#48df7b';
  }

  let endColorHex = '';
  if (gradientEnd === 'hedera-purple' || gradientEnd === '[#a679f0]') {
    endColorHex = '#a679f0';
  } else if (gradientEnd === 'hedera-blue' || gradientEnd === '[#5599fe]') {
    endColorHex = '#5599fe';
  } else if (gradientEnd === 'hedera-green' || gradientEnd === '[#48df7b]') {
    endColorHex = '#48df7b';
  } else if (gradientEnd.startsWith('[#') && gradientEnd.endsWith(']')) {
    endColorHex = gradientEnd.slice(1, -1);
  } else {
    endColorHex = '#48df7b';
  }

  let boxShadowRgba = '';
  if (mainColor === 'hedera-purple' || mainColor === '[#a679f0]') {
    boxShadowRgba = '166, 121, 240';
  } else if (mainColor === 'hedera-blue' || mainColor === '[#5599fe]') {
    boxShadowRgba = '85, 153, 254';
  } else if (mainColor === 'hedera-green' || mainColor === '[#48df7b]') {
    boxShadowRgba = '72, 223, 123';
  } else {
    boxShadowRgba = '72, 223, 123';
  }

  return (
    <div
      className={`bg-white/60 dark:bg-gray-800/60 rounded-lg sm:rounded-xl ${paddingClasses} border border-white/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-${mainColor}/30 dark:hover:shadow-${mainColor}/30 hover:-translate-y-1.5`}
      style={{
        boxShadow:
          '0 10px 20px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025), 0 0 0 1px rgba(' +
          boxShadowRgba +
          ', 0.08)',
      }}
    >
      <div className={`flex items-start gap-3 ${gapMarginClasses}`}>
        <div
          className={`${iconSizeClasses} flex-shrink-0 rounded-lg flex items-center justify-center text-white`}
          style={{
            background: `linear-gradient(135deg, ${startColorHex}, ${endColorHex})`,
            boxShadow: `0 4px 10px rgba(${boxShadowRgba}, 0.3)`,
          }}
        >
          <div className={textSizeClasses}>{icon}</div>
        </div>
        <div>
          <HackathonTypography variant={isCompact ? 'subtitle2' : 'h4'}>
            {title}
          </HackathonTypography>
          <div className='flex items-center mt-1 sm:mt-1.5'>
            <div
              className={`${percentageTextSizeClasses} font-semibold text-${mainColor}`}
            >
              {percentage}
            </div>
            <div
              className={`${progressBarHeightClass} ${progressBarWidth} bg-gradient-to-r from-${mainColor} to-${gradientEnd} rounded-full ${progressBarMarginClass}`}
            ></div>
          </div>
        </div>
      </div>
      <HackathonTypography
        variant={isCompact ? 'caption' : 'body2'}
        color='muted'
        className={`${descriptionMarginClass} ${descriptionPaddingClass}`}
      >
        {description}
      </HackathonTypography>
    </div>
  );
};

export default CriterionCard;
