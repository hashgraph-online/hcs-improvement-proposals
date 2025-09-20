import React from 'react';
import { motion } from 'framer-motion';
import { FaTelegram } from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

interface TelegramButtonProps {
  className?: string;
  dataUmamiEvent?: string;
}

const TelegramButton: React.FC<TelegramButtonProps> = ({ 
  className = '', 
  dataUmamiEvent = 'telegram-click' 
}) => {
  const handleClick = () => {
    // Fire Google Ads conversion event
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17512816237/LaqRCOLUzp4bEO284Z5B',
        'event_callback': () => {
          // Open Telegram after conversion is tracked
          window.open('https://t.me/hashinals', '_blank');
        }
      });
    } else {
      // Fallback if gtag is not available
      window.open('https://t.me/hashinals', '_blank');
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#48df7b] to-[#3aca6c] hover:from-[#3aca6c] hover:to-[#2fb35c] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 w-full sm:w-auto sm:min-w-[220px] ${className}`}
      data-umami-event={dataUmamiEvent}
      onClick={handleClick}
    >
      <FaTelegram className='text-xl' />
      Get Details on Telegram
      <FiExternalLink className='text-xl group-hover:translate-x-1 transition-transform' />
    </motion.div>
  );
};

export default TelegramButton;