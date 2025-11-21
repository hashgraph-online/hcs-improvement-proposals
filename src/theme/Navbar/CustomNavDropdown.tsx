import React, {useState, useRef, useEffect} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

interface DropdownItem {
  label: string;
  to: string;
  className?: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

/**
 * Custom navbar dropdown component with pure Tailwind styling
 * Replaces Docusaurus's NavbarItem for dropdown menus
 */
export default function CustomNavDropdown({label, items}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {pathname} = useLocation();

  const isActive = items.some((item) => pathname.startsWith(item.to));

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
      className="relative flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`
          flex items-center px-3 py-1.5 gap-1 rounded-md
          text-white/95 font-['Roboto_Mono'] font-medium text-[15px]
          bg-transparent border-none cursor-pointer
          no-underline hover:no-underline
          transition-all duration-200
          hover:text-white hover:bg-white/10
          focus:outline-none outline-none
          ${isActive ? 'text-white bg-white/15' : ''}
        `.trim().replace(/\s+/g, ' ')}
      >
        {label}
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-[#6289d5] rounded-md shadow-lg overflow-hidden z-50">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`
                block px-4 py-2 text-white/95 font-['Roboto_Mono'] text-[14px]
                no-underline hover:no-underline
                transition-all duration-150
                hover:bg-white/10 hover:text-white
                border-b border-white/10 last:border-b-0
                ${item.className || ''}
              `.trim().replace(/\s+/g, ' ')}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
