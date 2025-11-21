import React, {type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import type {Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import CustomLogo from '../CustomLogo';
import CustomNavLink from '../CustomNavLink';
import CustomNavDropdown from '../CustomNavDropdown';

/**
 * Get navbar items from theme config
 */
function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

/**
 * Render custom navbar items with Tailwind styling
 */
function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'dropdown') {
          return (
            <CustomNavDropdown
              key={i}
              label={item.label || ''}
              items={item.items || []}
            />
          );
        }

        const to = 'to' in item ? item.to : 'href' in item ? item.href : '';
        const isExternal = 'href' in item;

        return (
          <CustomNavLink
            key={i}
            to={to || ''}
            label={item.label || ''}
            external={isExternal}
          />
        );
      })}
    </>
  );
}

/**
 * Main navbar content layout with Tailwind classes
 */
function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between w-full h-[60px] px-6 gap-6 flex-nowrap overflow-visible max-md:px-4 max-md:gap-3 max-[768px]:px-3 max-[768px]:gap-2">
      <div className="flex items-center gap-6 flex-shrink-0 h-full max-md:gap-3 max-[768px]:gap-2">{left}</div>
      <div className="flex items-center gap-3 flex-shrink min-w-0 h-full ml-auto max-md:gap-2">{right}</div>
    </div>
  );
}

/**
 * Main navbar content component with Tailwind classes
 */
export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <CustomLogo />
          <div className="flex items-center gap-3 transition-all duration-300 whitespace-nowrap h-full max-md:hidden">
            <NavbarItems items={leftItems} />
          </div>
        </>
      }
      right={
        <>
          <div className="flex items-center gap-3 transition-all duration-300 whitespace-nowrap h-full max-md:hidden">
            <NavbarItems items={rightItems} />
          </div>
          <NavbarColorModeToggle className="m-0 flex-shrink-0 order-2 flex items-center h-full" />
          {!searchBarItem && <SearchBar />}
        </>
      }
    />
  );
}
