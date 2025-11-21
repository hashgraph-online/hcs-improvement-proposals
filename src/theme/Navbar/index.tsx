import React, {type ReactNode} from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof NavbarType>;

/**
 * Navbar wrapper with Tailwind styling for glassmorphism and gradient background
 *
 * Note: Docusaurus's <Navbar> renders with default background/padding, so we override
 * it here via style prop to keep all styling in components (not CSS files)
 */
export default function NavbarWrapper(props: Props): ReactNode {
  return (
    <div
      className="bg-navbar-gradient dark:bg-navbar-gradient-dark backdrop-blur-navbar shadow-navbar border-b border-white/10 dark:border-white/8 sticky top-0 z-[1000]"
      style={{
        // Override Docusaurus navbar defaults to show our gradient
        ['--ifm-navbar-background-color' as any]: 'transparent',
        ['--ifm-navbar-padding-horizontal' as any]: '0',
        ['--ifm-navbar-padding-vertical' as any]: '0',
        ['--ifm-navbar-shadow' as any]: 'none',
      }}
    >
      <Navbar {...props} />
    </div>
  );
}
