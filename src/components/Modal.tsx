import React from 'react';
import Typography from './Typography';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiMaximize, FiMinimize } from 'react-icons/fi';
import IconButton from './IconButton';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  modalTitle?: string;
  isFullScreen?: boolean;
  toggleFullScreen?: () => void;
}

const Modal = ({
  children,
  isOpen,
  modalTitle,
  handleClose,
  isFullScreen = false,
  toggleFullScreen,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4 md:p-6 overflow-y-auto'>
      <div
        className={`
          bg-white dark:bg-gray-900 text-gray-800 dark:text-white
          border border-green-500 shadow-lg shadow-green-500/50
          transition-all duration-300 ease-in-out
          ${
            isFullScreen
              ? 'fixed inset-0 w-screen h-screen max-w-none rounded-none'
              : 'w-full max-w-5xl rounded-lg my-8'
          }
        `}
      >
        <div className='absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-white/[0.05] bg-[size:40px_40px] pointer-events-none'></div>
        <div className='relative z-10 flex flex-col max-h-[calc(100vh-4rem)]'>
          <div className='flex justify-between items-center p-6 border-b border-green-500/30'>
            <Typography
              variant='h3'
              className='text-2xl md:text-4xl font-bold text-secondary-600'
            >
              {modalTitle}
            </Typography>
            <div className='flex items-center space-x-2'>
              {toggleFullScreen && (
                <IconButton onClick={toggleFullScreen}>
                  {isFullScreen ? <FiMinimize /> : <FiMaximize />}
                </IconButton>
              )}
              <IconButton
                onClick={handleClose}
                className='hover:bg-red-100 dark:hover:bg-red-900'
              >
                <FiX size={24} />
              </IconButton>
            </div>
          </div>
          <div className='flex-grow overflow-auto p-6'>{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
