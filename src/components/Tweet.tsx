import React, { useEffect } from 'react';

interface TweetProps {
  id: string;
}

/**
 * Component for embedding tweets in Docusaurus
 * @param {TweetProps} props - The component props
 * @returns {JSX.Element} The Tweet component
 */
export default function Tweet({ id }: TweetProps): JSX.Element {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="twitter-tweet-container" style={{ margin: '20px 0' }}>
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/x/status/${id}`}>Loading tweet...</a>
      </blockquote>
    </div>
  );
}