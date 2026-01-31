import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

interface NavLinkProps {
  to: string;
  label: string;
  external?: boolean;
}

/**
 * Returns true if the path should use Docusaurus client-side routing.
 * Only /docs/* and /blog/* are handled by Docusaurus.
 */
function isDocusaurusPath(path: string): boolean {
  return path.startsWith('/docs') || path.startsWith('/blog');
}

/**
 * Custom navbar link component with pure Tailwind styling.
 * Uses full page reloads for non-Docusaurus paths to route to Next.js.
 */
export default function CustomNavLink({to, label, external}: NavLinkProps) {
  const {pathname} = useLocation();
  const isActive = pathname.startsWith(to);

  const className = `
    flex items-center px-3 py-1.5 rounded-md
    text-white/95 font-['Roboto_Mono'] font-medium text-[15px]
    no-underline hover:no-underline
    transition-all duration-200
    hover:text-white hover:bg-white/10
    ${isActive ? 'text-white bg-white/15' : ''}
  `.trim().replace(/\s+/g, ' ');

  if (external) {
    return (
      <a
        href={to}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  if (!isDocusaurusPath(to)) {
    return (
      <a href={`https://hol.org${to}`} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {label}
    </Link>
  );
}
