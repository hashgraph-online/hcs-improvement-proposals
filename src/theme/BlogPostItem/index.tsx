import React, { useEffect } from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Add click handlers for tag expansion
    const handleTagExpansion = () => {
      const tagContainers = document.querySelectorAll('[class*="tagsListInline"]');
      
      tagContainers.forEach(container => {
        const htmlElement = container as HTMLElement;
        
        // Check if tags overflow
        if (htmlElement.scrollHeight > htmlElement.clientHeight + 5) {
          htmlElement.style.setProperty('cursor', 'pointer');
          
          htmlElement.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('expanded');
          });
        } else {
          // Remove the ::after pseudo element if no overflow
          htmlElement.style.setProperty('--show-more', 'none');
        }
      });
    };

    // Run on mount and after any navigation
    handleTagExpansion();
    
    // Re-run when the DOM changes (for client-side navigation)
    const observer = new MutationObserver(handleTagExpansion);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return <BlogPostItem {...props} />;
}