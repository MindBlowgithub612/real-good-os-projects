
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WindowMinimizeIcon, WindowMaximizeIcon, WindowRestoreIcon, WindowCloseIcon } from '../constants';

interface WindowProps {
  id: number;
  title: string;
  children: React.ReactNode;
  onClose: (id: number) => void;
  onFocus: (id: number) => void;
  onMinimize: (id: number) => void;
  onMaximize: (id: number) => void;
  zIndex: number;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  initialPosition?: { x: number, y: number };
}

const Window: React.FC<WindowProps> = ({ 
  id, title, children, onClose, onFocus, onMinimize, onMaximize, 
  zIndex, isActive, isMinimized, isMaximized, initialPosition 
}) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowStartPos = useRef({ x: 0, y: 0 });
  
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    onFocus(id);
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartPos.current = position;
    // Prevent text selection while dragging
    e.preventDefault();
  }, [id, onFocus, position, isMaximized]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    setPosition({
      x: windowStartPos.current.x + dx,
      y: windowStartPos.current.y + dy,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const windowStyle = isMaximized 
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 40px)', zIndex } 
    : { top: `${position.y}px`, left: `${position.x}px`, zIndex };

  // If minimized, hide the window but keep it mounted to preserve state
  const displayStyle = isMinimized ? { display: 'none' } : { display: 'flex' };

  return (
    <div
      className="win98-button absolute flex-col w-[500px] min-h-[200px] bg-[#C0C0C0]"
      style={{ ...windowStyle, ...displayStyle }}
      onMouseDown={() => onFocus(id)}
    >
      <div
        className={`flex items-center justify-between p-0.5 pl-1 select-none ${isActive ? 'bg-[#000080]' : 'bg-[#808080]'}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(id)}
      >
        <h2 className="text-white font-bold text-lg truncate mr-2">{title}</h2>
        <div className="flex space-x-0.5">
          <button 
             className="win98-button w-4 h-4 flex items-center justify-center bg-[#C0C0C0] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus:outline-none"
             onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
          >
             <WindowMinimizeIcon />
          </button>
          <button 
             className="win98-button w-4 h-4 flex items-center justify-center bg-[#C0C0C0] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus:outline-none"
             onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
          >
             {isMaximized ? <WindowRestoreIcon /> : <WindowMaximizeIcon />}
          </button>
          <button
            className="win98-button w-4 h-4 flex items-center justify-center bg-[#C0C0C0] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus:outline-none ml-0.5"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
          >
            <WindowCloseIcon />
          </button>
        </div>
      </div>
      <div className="p-1 flex-grow flex flex-col overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default Window;
