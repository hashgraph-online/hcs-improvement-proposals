import React, {type ReactNode, useEffect, useRef} from 'react';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: {
  header: ReactNode;
  primaryMenu: ReactNode;
  secondaryMenu: ReactNode;
}): ReactNode {
  const {shown: secondaryMenuShown} = useNavbarSecondaryMenu();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clearInertPanels = () => {
      const itemsContainer = sidebarRef.current?.querySelector('.navbar-sidebar__items');
      if (!itemsContainer) {
        return;
      }
      itemsContainer
        .querySelectorAll<HTMLElement>('.navbar-sidebar__item[inert]')
        .forEach((panel) => {
          panel.removeAttribute('inert');
        });
    };

    const frameId = window.requestAnimationFrame(() => {
      clearInertPanels();
      window.requestAnimationFrame(clearInertPanels);
    });
    const observer = new MutationObserver(clearInertPanels);
    if (sidebarRef.current) {
      observer.observe(sidebarRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['inert'],
      });
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="navbar-sidebar"
      style={{
        background: 'linear-gradient(135deg, rgb(98, 137, 213) 0%, rgb(80, 115, 184) 50%, rgb(63, 65, 116) 100%)',
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="flex-shrink-0">
        {header}
      </div>

      <div className="flex-1 overflow-y-auto w-full">
        <div className="flex flex-col w-full">
          <div 
            className="w-full border-t border-white/20 bg-white/[0.08]"
          >
            {primaryMenu}
          </div>

          {secondaryMenuShown && (
            <div className="w-full">
              {secondaryMenu}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
