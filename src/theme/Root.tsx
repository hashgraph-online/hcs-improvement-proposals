import React, { useEffect } from 'react';

/**
 * Fix for sidebar navigation hydration issues
 */
export default function Root({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const fixSidebarNavigation = () => {
      // Wait for the DOM to be fully loaded
      setTimeout(() => {
        // Force re-render of collapsible menu items
        const collapsibleItems = document.querySelectorAll(
          '.menu__list-item-collapsible'
        );

        collapsibleItems.forEach((item) => {
          const button = item.querySelector('.menu__link--sublist');
          const submenu = item.querySelector('.menu__list');

          if (button && submenu) {
            // Ensure the aria-expanded attribute is properly set
            const isExpanded = !item.classList.contains(
              'menu__list-item--collapsed'
            );
            button.setAttribute('aria-expanded', isExpanded.toString());

            // Force visibility update
            if (isExpanded) {
              submenu.style.display = 'block';
              submenu.style.visibility = 'visible';
            }

            // Add click handler to ensure proper state management
            button.addEventListener('click', (e) => {
              e.preventDefault();
              const wasCollapsed = item.classList.contains(
                'menu__list-item--collapsed'
              );

              if (wasCollapsed) {
                item.classList.remove('menu__list-item--collapsed');
                button.setAttribute('aria-expanded', 'true');
                submenu.style.display = 'block';
                submenu.style.visibility = 'visible';
              } else {
                item.classList.add('menu__list-item--collapsed');
                button.setAttribute('aria-expanded', 'false');
                submenu.style.display = 'none';
                submenu.style.visibility = 'hidden';
              }
            });
          }
        });

        // Special handling for the Conversational Agent section
        const conversationalAgentItems = document.querySelectorAll(
          'a[href*="conversational-agent"]'
        );
        conversationalAgentItems.forEach((link) => {
          const parentItem = link.closest('.menu__list-item-collapsible');
          if (parentItem) {
            const submenu = parentItem.querySelector('.menu__list');
            if (submenu) {
              submenu.style.display = 'block';
              submenu.style.visibility = 'visible';
              parentItem.classList.remove('menu__list-item--collapsed');
            }
          }
        });
      }, 100);
    };

    // Run on initial load
    fixSidebarNavigation();

    // Re-run when navigation changes (for SPA behavior)
    const handleNavigationChange = () => {
      fixSidebarNavigation();
    };

    // Listen for navigation changes
    window.addEventListener('popstate', handleNavigationChange);

    // Listen for route changes (Docusaurus specific)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'childList' &&
          mutation.target instanceof Element
        ) {
          const target = mutation.target as Element;
          if (
            target.classList.contains('menu__list') ||
            target.closest('.menu__list')
          ) {
            fixSidebarNavigation();
          }
        }
      });
    });

    const sidebar = document.querySelector('.menu');
    if (sidebar) {
      observer.observe(sidebar, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('popstate', handleNavigationChange);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
