import React from 'react';
import { DriveIcon } from '../constants';

// FIX: Added onClose to props to match the interface expected by App.tsx's openWindow function.
export const MyComputerContent: React.FC<{ onClose?: () => void }> = () => {
  return (
    <div className="p-2 bg-white win98-inset h-full flex">
      <div className="flex flex-col items-center space-y-1 w-24 text-center">
        <button
          onDoubleClick={() => alert('Fonctionnalité non implémentée.')}
          className="focus:outline-none flex flex-col items-center space-y-1"
          aria-label="Disque (C:)"
        >
          <DriveIcon />
          <span className="text-black text-center text-lg px-1 focus:bg-[#000080] focus:text-white">
            (C:)
          </span>
        </button>
      </div>
    </div>
  );
};
