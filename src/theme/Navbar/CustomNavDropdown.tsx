import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

interface DropdownItem {
  label: string;
  to?: string;
  href?: string;
  className?: string;
  type?: string;
  value?: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

function isDocusaurusPath(path: string): boolean {
  return path.startsWith('/docs') || path.startsWith('/blog');
}

export default function CustomNavDropdown({ label, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const isActive = items.some(
    (item) => item.to && pathname.startsWith(item.to),
  );

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className='relative flex items-center h-full'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center px-3 py-1.5 gap-1 rounded-md
          text-white/95 font-['Roboto_Mono'] font-medium text-[15px]
          bg-transparent border-none cursor-pointer
          no-underline hover:no-underline
          transition-all duration-200
          hover:text-white hover:bg-white/10
          focus:outline-none outline-none
          ${isActive ? 'text-white bg-white/15' : ''}
        `
          .trim()
          .replace(/\s+/g, ' ')}
      >
        {label}
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 pt-1 -mt-1 z-50'>
          <div className='min-w-[200px] bg-[#6289d5] rounded-md shadow-lg overflow-hidden py-1'>
            {items.map((item, index) => {
              if (item.type === 'html' && item.className === 'navbar-dropdown-header') {
                return (
                  <div
                    key={index}
                    className="px-4 py-2 text-xs font-['Roboto_Mono'] font-bold text-white/60 uppercase tracking-wider bg-black/10 mt-1 first:mt-0"
                  >
                    {item.label || item.value}
                  </div>
                );
              }

              const linkClass = `
                block px-4 py-2 text-white/95 font-['Roboto_Mono'] text-[14px]
                no-underline hover:no-underline
                transition-all duration-150
                hover:bg-white/10 hover:text-white
                ${item.className || ''}
              `
                .trim()
                .replace(/\s+/g, ' ');

              if (item.href) {
                const isExternal = item.href.startsWith('http') && !item.href.includes('hol.org');
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={linkClass}
                    target={isExternal ? '_blank' : '_self'}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }

              if (item.to && !isDocusaurusPath(item.to)) {
                return (
                  <a
                    key={index}
                    href={`https://hol.org${item.to}`}
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.to}
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
