import React, { useEffect, useCallback } from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): React.JSX.Element {
  const setupTagExpansion = useCallback(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Add click handlers for tag expansion - scoped to just this article
    // Use a data attribute to avoid re-attaching handlers
    const tagContainers = document.querySelectorAll('[class*="tagsListInline"]:not([data-tag-handler])');
    
    tagContainers.forEach(tagContainer => {
      const htmlElement = tagContainer as HTMLElement;
      htmlElement.setAttribute('data-tag-handler', 'true');
      
      // Check if tags overflow
      if (htmlElement.scrollHeight > htmlElement.clientHeight + 5) {
        htmlElement.style.setProperty('cursor', 'pointer');
        
        htmlElement.addEventListener('click', (e: Event) => {
          e.stopPropagation();
          htmlElement.classList.toggle('expanded');
        }, { passive: true });
      } else {
        // Remove the ::after pseudo element if no overflow
        htmlElement.style.setProperty('--show-more', 'none');
      }
    });
  }, []);

  useEffect(() => {
    // Run once after mount
    setupTagExpansion();
    // No cleanup needed since we're not using MutationObserver anymore
    // Handlers are attached once per element using data-tag-handler attribute
  }, [setupTagExpansion]);

  return <BlogPostItem {...props} />;
}
