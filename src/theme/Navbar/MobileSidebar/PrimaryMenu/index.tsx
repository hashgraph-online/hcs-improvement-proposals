import React, { useState } from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

export default function NavbarMobilePrimaryMenu(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useThemeConfig().navbar.items;
  const {pathname} = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="px-4 py-3 flex flex-col gap-1">
      {/* Search bar */}
      <div className="mb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search proposals..."
            className="w-full h-10 pl-4 pr-10 rounded-md bg-white/10 border border-white/20 text-white/95 placeholder:text-white/50 font-['Roboto_Mono'] text-sm focus:outline-none focus:border-white/40 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors !bg-transparent !border-none cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation items */}
      {items.map((item: any, index: number) => {
        // Handle dropdown items
        if (item.type === 'dropdown' && item.items) {
          const isExpanded = expandedItems[index];
          
          return (
            <div key={index}>
              <button 
                onClick={() => toggleItem(index)}
                className="w-full text-left px-3 py-1 text-white/50 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-wider flex items-center gap-1 !bg-transparent !border-none cursor-pointer hover:text-white/70 transition-colors"
              >
                {item.label}
                <svg
                  className={`w-3 h-3 text-white/50 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
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
              
              {/* Dropdown content */}
              <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {item.items.map((subItem: any, subIndex: number) => {
                  const linkClass = "block !px-3 !py-2 !pl-6 !rounded-md !text-white/95 !font-['Roboto_Mono'] !text-[14px] !no-underline hover:!no-underline !transition-all !duration-150 hover:!bg-white/10 hover:!text-white";

                  if (subItem.href) {
                    return (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className={linkClass}
                        onClick={() => mobileSidebar.toggle()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subItem.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={subIndex}
                      to={subItem.to || '/'}
                      className={linkClass}
                      onClick={() => mobileSidebar.toggle()}
                    >
                      {subItem.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        // Handle regular link items
        const linkClass = "block !px-3 !py-2 !rounded-md !text-white/95 !font-['Roboto_Mono'] !text-[14px] !no-underline hover:!no-underline !transition-all !duration-150 hover:!bg-white/10 hover:!text-white";

        if (item.href) {
          return (
            <a
              key={index}
              href={item.href}
              className={linkClass}
              onClick={() => mobileSidebar.toggle()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          );
        }

        if (item.to) {
          return (
            <Link
              key={index}
              to={item.to}
              className={linkClass}
              onClick={() => mobileSidebar.toggle()}
            >
              {item.label}
            </Link>
          );
        }

        return null;
      })}
    </div>
  );
}
