import React from 'react';

interface TutorialPrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const TutorialPrimaryButton: React.FC<TutorialPrimaryButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  size = 'medium',
  ...props
}) => {
  const sizeStyles = {
    small: 'min-h-[36px] px-4 text-sm',
    medium: 'min-h-[44px] px-6 text-base',
    large: 'min-h-[56px] px-8 text-lg',
  };

  // Using inline styles to override any Docusaurus/parent styles
  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#2563eb',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
  };

  const hoverStyles: React.CSSProperties = {
    backgroundColor: '#1d4ed8',
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const combinedStyles = {
    ...buttonStyles,
    ...(isHovered ? hoverStyles : {}),
  };

  const classes = `tutorial-primary-button ${sizeStyles[size]} ${className}`.trim();

  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        style={combinedStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
          {children}
        </span>
      </a>
    );
  }

  return (
    <button 
      className={classes}
      style={combinedStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
        {children}
      </span>
    </button>
  );
};

export default TutorialPrimaryButton;