import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function CustomLogo() {
  const {
    navbar: { title, logo },
  } = useThemeConfig();

  const logoSrc = useBaseUrl(logo?.src || '');
  const logoAlt = logo?.alt || title || '';

  return (
    <a
      href='https://hol.org'
      className='flex items-center gap-2 no-underline hover:no-underline'
    >
      {logoSrc && (
        <img src={logoSrc} alt={logoAlt} className='h-[34px] w-[34px]' />
      )}
      {title && (
        <b className="!text-white font-['Roboto_Mono'] font-semibold text-base">
          {title}
        </b>
      )}
    </a>
  );
}
