import React, { useEffect } from 'react';

/**
 * Ensures the mobile navbar drawer remains interactive on markdown pages
 * by removing inert attributes that Docusaurus applies when showing
 * the secondary docs/blog panel.
 */
export default function Root({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const enablePrimaryDrawer = () => {
      const itemsContainer = document.querySelector('.navbar-sidebar__items');
      if (!itemsContainer) {
        return;
      }
      const inertPanels = itemsContainer.querySelectorAll(
        '.navbar-sidebar__item[inert]'
      );
      inertPanels.forEach((el) => {
        el.removeAttribute('inert');
      });
    };

    const observer = new MutationObserver(() => {
      enablePrimaryDrawer();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('click', enablePrimaryDrawer, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', enablePrimaryDrawer, true);
    };
  }, []);

  return <>{children}</>;
}
