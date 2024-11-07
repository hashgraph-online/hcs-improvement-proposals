import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { useThemeConfig } from '@docusaurus/theme-common';

function Navbar() {
  const { colorMode } = useColorMode();
  const {
    navbar: { title, logo },
  } = useThemeConfig();

  return (
    <nav className='bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              {logo && (
                <img className='h-8 w-auto' src={logo.src} alt={logo.alt} />
              )}
            </div>
            <div className='ml-4 text-xl font-bold text-white'>{title}</div>
          </div>
          <div className='flex items-center'>
            {/* Add your navbar items here */}
            <a
              href='#'
              className='text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium'
            >
              Home
            </a>
            <a
              href='https://hpm.hashgraphonline.com/'
              className='text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium'
            >
              Packages
            </a>
            <a
              href='#'
              className='text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium'
            >
              Docs
            </a>
            <a
              href='#'
              className='text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium'
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
