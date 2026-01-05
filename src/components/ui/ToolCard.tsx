import React, { useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import PrimaryButton from '../hackathon/PrimaryButton';
import HackathonTypography from '../hackathon/HackathonTypography';

type ToolCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
  isNew?: boolean;
  id?: string;
  color: 'purple' | 'blue' | 'green';
  buttonText?: string;
};

const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  title,
  description,
  link,
  index,
  isNew = false,
  id,
  color,
  buttonText = 'View Documentation',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = true;

  const colorMap = {
    purple: {
      bg: 'bg-gradient-to-br from-[#a679f0]/10 to-[#a679f0]/5',
      iconBg: 'bg-[#a679f0]/15',
      borderHover: 'group-hover:border-[#a679f0]',
      text: 'text-[#a679f0]',
      glow: 'rgba(166, 121, 240, 0.2)',
      solid: '#a679f0',
      buttonClass: 'bg-[#a679f0] hover:bg-[#a679f0]/90',
    },
    blue: {
      bg: 'bg-gradient-to-br from-[#5599fe]/10 to-[#5599fe]/5',
      iconBg: 'bg-[#5599fe]/15',
      borderHover: 'group-hover:border-[#5599fe]',
      text: 'text-[#5599fe]',
      glow: 'rgba(85, 153, 254, 0.2)',
      solid: '#5599fe',
      buttonClass: 'bg-[#5599fe] hover:bg-[#5599fe]/90',
    },
    green: {
      bg: 'bg-gradient-to-br from-[#48df7b]/10 to-[#48df7b]/5',
      iconBg: 'bg-[#48df7b]/15',
      borderHover: 'group-hover:border-[#48df7b]',
      text: 'text-[#48df7b]',
      glow: 'rgba(72, 223, 123, 0.2)',
      solid: '#48df7b',
      buttonClass: 'bg-[#48df7b] hover:bg-[#48df7b]/90',
    },
  };

  const colorStyle = colorMap[color];

  return (
    <div
      ref={cardRef}
      className='relative h-full group'
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      id={id}
    >
      <div
        className={`h-full overflow-hidden rounded-[2rem] border border-white/10 dark:border-gray-800/50 ${colorStyle.borderHover} transition-colors duration-700 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2)]`}
      >
        <div className={`relative ${colorStyle.bg} overflow-hidden`}>
          <div className='absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-3xl transform translate-x-16 -translate-y-10'></div>
          <div className='absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 blur-2xl transform -translate-x-10 translate-y-10'></div>

          <div className='pt-10 pb-28 px-8 flex items-start relative z-50'>
            <div
              className={`${colorStyle.iconBg} rounded-xl p-4 transform -rotate-3 transition-transform group-hover:rotate-0 duration-500`}
            >
              <div className={`text-3xl ${colorStyle.text}`}>{icon}</div>
            </div>
          </div>

          <div className='absolute bottom-0 left-0 right-0 h-24 bg-white dark:bg-gray-900 rounded-t-[3rem]'></div>
        </div>

        <div className='relative z-50 px-8 pt-4 pb-8 bg-white dark:bg-gray-900'>
          <div className='flex items-center mb-3'>
            <HackathonTypography variant='h4' className={`${colorStyle.text}`}>
              {title}
            </HackathonTypography>
            {isNew && (
              <div className='ml-3 bg-gradient-to-r from-[#a679f0]/20 to-[#48df7b]/20 rounded-full px-3 py-1'>
                <span className='text-xs font-semibold text-[#48df7b]'>
                  NEW
                </span>
              </div>
            )}
          </div>

          <HackathonTypography
            variant='body1'
            color='muted'
            className='mb-6 font-light'
          >
            {description}
          </HackathonTypography>

          <PrimaryButton
            href={link}
            icon={<FaArrowRight />}
            className={`w-full justify-center ${colorStyle.buttonClass}`}
          >
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
