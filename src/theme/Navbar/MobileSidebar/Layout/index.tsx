import React, {type ReactNode} from 'react';
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
  
  // We keep the outer 'navbar-sidebar' class ONLY for the Docusaurus transition logic (open/close state)
  // But we override all its styles to ensure it acts as a full-screen fixed container
  return (
    <div
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
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Section */}
      <div className="flex-shrink-0">
        {header}
      </div>

      {/* Content Section - Pure Tailwind, no Docusaurus classes */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="flex flex-col w-full">
          {/* Primary Menu Container */}
          <div 
            className="w-full border-t border-white/20 bg-white/[0.08] backdrop-blur-[8px]"
          >
            {primaryMenu}
          </div>
          
          {/* Secondary Menu (if any) */}
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
