import { FC } from 'react';

export const CodeStyleTag: FC = () => {
  return (
    <style>
      {`
        .code-copy-button {
          position: absolute;
          top: 4px;
          right: 4px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: rgba(255, 255, 255, 0.1);
          color: #8A5CF5;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .dark .code-copy-button {
          background: rgba(0, 0, 0, 0.2);
          color: #B794F6;
        }

        .code-copy-button:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #6D28D9;
        }

        .dark .code-copy-button:hover {
          background: rgba(0, 0, 0, 0.3);
          color: #DDD6FE;
        }

        .code-copy-button span {
          margin-left: 4px;
        }

        .copied-indicator {
          color: #10B981;
        }

        .code-tab {
          position: relative;
          z-index: 10;
        }
        
        .code-tab.active::before {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #8A5CF5;
          z-index: 5;
        }

        .code-tabs-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(138, 92, 245, 0.5) transparent;
        }

        .code-tabs-container::-webkit-scrollbar {
          height: 6px;
        }

        .code-tabs-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .code-tabs-container::-webkit-scrollbar-thumb {
          background-color: rgba(138, 92, 245, 0.3);
          border-radius: 20px;
        }

        @keyframes text-gradient-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shine {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}
    </style>
  );
};

export default CodeStyleTag;
