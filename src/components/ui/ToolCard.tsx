import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

  const colorMap = {
    purple: {
      bg: 'bg-gradient-to-br from-[#8259ef]/10 to-[#8259ef]/5',
      iconBg: 'bg-[#8259ef]/15',
      borderHover: 'group-hover:border-[#8259ef]',
      text: 'text-[#8259ef]',
      glow: 'rgba(130, 89, 239, 0.2)',
      solid: '#8259ef',
      buttonClass: 'bg-[#8259ef] hover:bg-[#8259ef]/90',
    },
    blue: {
      bg: 'bg-gradient-to-br from-[#2d84eb]/10 to-[#2d84eb]/5',
      iconBg: 'bg-[#2d84eb]/15',
      borderHover: 'group-hover:border-[#2d84eb]',
      text: 'text-[#2d84eb]',
      glow: 'rgba(45, 132, 235, 0.2)',
      solid: '#2d84eb',
      buttonClass: 'bg-[#2d84eb] hover:bg-[#2d84eb]/90',
    },
    green: {
      bg: 'bg-gradient-to-br from-[#3ec878]/10 to-[#3ec878]/5',
      iconBg: 'bg-[#3ec878]/15',
      borderHover: 'group-hover:border-[#3ec878]',
      text: 'text-[#3ec878]',
      glow: 'rgba(62, 200, 120, 0.2)',
      solid: '#3ec878',
      buttonClass: 'bg-[#3ec878] hover:bg-[#3ec878]/90',
    },
  };

  const colorStyle = colorMap[color];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className='relative h-full group'
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      id={id}
    >
      <motion.div
        className={`h-full overflow-hidden rounded-[2rem] border border-white/10 dark:border-gray-800/50 ${colorStyle.borderHover} transition-colors duration-700 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2)]`}
        whileHover={{
          boxShadow: `0 30px 100px -20px ${colorStyle.glow}, 0 10px 20px -10px ${colorStyle.glow}`,
          translateY: -5,
        }}
        transition={{ duration: 0.4 }}
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
              <div className='ml-3 bg-gradient-to-r from-[#8259ef]/20 to-[#3ec878]/20 rounded-full px-3 py-1'>
                <span className='text-xs font-semibold text-[#3ec878]'>
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
      </motion.div>
    </motion.div>
  );
};

export default ToolCard;
