import React from 'react';

interface YouTubeProps {
  id: string;
  title?: string;
}

/**
 * Component for embedding YouTube videos in Docusaurus
 * @param {YouTubeProps} props - The component props
 * @returns {JSX.Element} The YouTube component
 */
export default function YouTube({ id, title = 'YouTube video' }: YouTubeProps): JSX.Element {
  return (
    <div className="youtube-embed-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', margin: '20px 0' }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}