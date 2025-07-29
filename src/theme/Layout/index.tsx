import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';
import type { Props } from '@theme/Layout';

/**
 * Enhanced Layout component with sidebar navigation fixes
 */
export default function LayoutWrapper(props: Props): JSX.Element {
  useEffect(() => {
    const fixConversationalAgentDropdown = () => {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        // Find all collapsible menu items
        const collapsibleItems = document.querySelectorAll(
          '.menu__list-item-collapsible'
        );

        collapsibleItems.forEach((item) => {
          const link = item.querySelector('.menu__link--sublist');
          const submenu = item.querySelector('.menu__list');

          if (link && submenu) {
            // Check if this is the conversational agent or any library item
            const isLibraryItem =
              link.textContent?.includes('Conversational Agent') ||
              link.textContent?.includes('Standards Agent Kit') ||
              link.textContent?.includes('Standards SDK') ||
              link.textContent?.includes('Recursion SDK') ||
              link.textContent?.includes('Hashinal Wallet Connect');

            if (isLibraryItem) {
              // Ensure proper state on page load
              const isCollapsed = item.classList.contains(
                'menu__list-item--collapsed'
              );
              link.setAttribute('aria-expanded', (!isCollapsed).toString());

              // Force visibility for non-collapsed items
              if (!isCollapsed) {
                submenu.style.display = 'block';
                submenu.style.visibility = 'visible';
                submenu.style.opacity = '1';
              }
            }

            // Enhanced click handler
            const handleClick = (e: Event) => {
              e.preventDefault();
              e.stopPropagation();

              const isCurrentlyCollapsed = item.classList.contains(
                'menu__list-item--collapsed'
              );

              if (isCurrentlyCollapsed) {
                // Expand
                item.classList.remove('menu__list-item--collapsed');
                link.setAttribute('aria-expanded', 'true');
                submenu.style.display = 'block';
                submenu.style.visibility = 'visible';
                submenu.style.opacity = '1';
              } else {
                // Collapse
                item.classList.add('menu__list-item--collapsed');
                link.setAttribute('aria-expanded', 'false');
                submenu.style.display = 'none';
                submenu.style.visibility = 'hidden';
                submenu.style.opacity = '0';
              }
            };

            // Remove existing listeners and add new one
            link.removeEventListener('click', handleClick);
            link.addEventListener('click', handleClick);
          }
        });
      }, 150);
    };

    // Run on mount
    fixConversationalAgentDropdown();

    // Run on route changes
    const handleRouteChange = () => {
      fixConversationalAgentDropdown();
    };

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);

    // Observer for DOM changes (SPA navigation)
    const observer = new MutationObserver((mutations) => {
      let shouldRefix = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);

          // Check if sidebar-related elements were added/removed
          const hasSidebarChanges = [...addedNodes, ...removedNodes].some(
            (node) => {
              if (node instanceof Element) {
                return (
                  node.classList.contains('menu__list') ||
                  node.classList.contains('menu__list-item-collapsible') ||
                  node.querySelector(
                    '.menu__list, .menu__list-item-collapsible'
                  )
                );
              }
              return false;
            }
          );

          if (hasSidebarChanges) {
            shouldRefix = true;
          }
        }
      });

      if (shouldRefix) {
        fixConversationalAgentDropdown();
      }
    });

    // Start observing
    const sidebar = document.querySelector('.menu');
    if (sidebar) {
      observer.observe(sidebar, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'aria-expanded'],
      });
    }

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      observer.disconnect();
    };
  }, []);

  return <Layout {...props} />;
}
