import React from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="flex items-center justify-center w-9 h-9 rounded-md text-white/90 transition-all duration-200 hover:bg-white/10 focus:outline-none outline-none border-none cursor-pointer bg-transparent mr-3"
      onClick={() => mobileSidebar.toggle()}
    >
      {/* FaTimes equivalent SVG */}
      <svg 
        stroke="currentColor" 
        fill="currentColor" 
        strokeWidth="0" 
        viewBox="0 0 352 512" 
        className="w-5 h-5" 
        height="1em" 
        width="1em" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.19 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.19 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
      </svg>
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): JSX.Element {
  return (
    <div className="flex items-center justify-between w-full h-[60px] px-4 border-b border-white/10">
      <div className="flex items-center">
        <CloseButton />
        <NavbarLogo />
        <div className="hidden sm:flex items-center gap-2 ml-2">
          <div className="h-4 w-px bg-white/30"></div>
          <span className="text-white/70 font-['Roboto_Mono'] text-sm font-medium">HIPs</span>
        </div>
      </div>
      <NavbarColorModeToggle />
    </div>
  );
}
