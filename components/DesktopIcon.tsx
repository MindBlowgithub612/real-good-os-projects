
import React from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onDoubleClick }) => {
  return (
    <button
      className="flex flex-col items-center gap-1 w-24 focus:outline-none group"
      onDoubleClick={onDoubleClick}
    >
      <div className="w-12 h-12 flex items-center justify-center filter group-active:brightness-50">
        {icon}
      </div>
      <span className="text-white text-center text-sm px-1 border border-transparent group-focus:bg-[#000080] group-focus:text-white group-focus:border-dotted group-focus:border-white">
        {label}
      </span>
    </button>
  );
};
