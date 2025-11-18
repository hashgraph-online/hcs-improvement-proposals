import React, {type ReactNode} from 'react';
import {
  useThemeConfig,
  ErrorCauseBoundary,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';

import styles from './styles.module.css';

/**
 * Get navbar items from theme config
 */
function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

/**
 * Render navbar items with error boundaries
 */
function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.\nPlease double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:\n${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

/**
 * Main navbar content layout
 */
function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className={styles.navbarInner}>
      <div className={styles.navbarLeft}>{left}</div>
      <div className={styles.navbarRight}>{right}</div>
    </div>
  );
}

/**
 * Main navbar content component
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
          <NavbarLogo />
          <div className={styles.navLinks}>
            <NavbarItems items={leftItems} />
          </div>
        </>
      }
      right={
        <>
          <div className={styles.navLinks}>
            <NavbarItems items={rightItems} />
          </div>
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && <SearchBar />}
        </>
      }
    />
  );
}
