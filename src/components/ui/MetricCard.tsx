import React from 'react';
import { motion } from 'motion/react';

interface MetricCardProps {
  value: string;
  label: string;
  description?: string;
  variant?: 'default' | 'highlighted' | 'gradient';
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'gray';
  className?: string;
  animateValue?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  description,
  variant = 'default',
  icon,
  color = 'blue',
  className = '',
  animateValue = true,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'highlighted':
        return 'bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border-brand-blue/20';
      case 'gradient':
        return 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700';
      default:
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'text-brand-blue';
      case 'green':
        return 'text-brand-green';
      case 'purple':
        return 'text-brand-purple';
      case 'gray':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-brand-blue';
    }
  };

  return (
    <motion.div
      className={`p-6 rounded-xl border ${getVariantClasses()} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {icon && <div className={`mb-4 ${getColorClasses()}`}>{icon}</div>}

      <motion.div
        className={`text-3xl lg:text-4xl font-bold mb-2 ${getColorClasses()}`}
        initial={animateValue ? { scale: 0 } : {}}
        animate={animateValue ? { scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
      >
        {value}
      </motion.div>

      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
        {label}
      </h3>

      {description && (
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default MetricCard;
