
import React, { useState, useEffect, useRef } from 'react';
import { StartIcon } from '../constants';
import type { WindowInstance } from '../types';
import { StartMenu } from './StartMenu';

interface TaskbarProps {
  windows: WindowInstance[];
  activeWindowId: number | null;
  focusWindow: (id: number) => void;
  onOpenErrorGenerator: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ windows, activeWindowId, focusWindow, onOpenErrorGenerator }) => {
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isStartMenuOpen &&
        startButtonRef.current && !startButtonRef.current.contains(event.target as Node) &&
        startMenuRef.current && !startMenuRef.current.contains(event.target as Node)
      ) {
        setIsStartMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isStartMenuOpen]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {isStartMenuOpen && (
        <StartMenu
          ref={startMenuRef}
          onClose={() => setIsStartMenuOpen(false)}
          onOpenErrorGenerator={onOpenErrorGenerator}
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#C0C0C0] border-t-2 border-t-white flex items-center px-1 z-[1000]">
        <button
          ref={startButtonRef}
          onClick={() => setIsStartMenuOpen(prev => !prev)}
          className={`win98-button bg-[#C0C0C0] px-2 py-0.5 flex items-center space-x-2 ${isStartMenuOpen ? 'win98-inset !shadow-none' : ''}`}
        >
          <StartIcon />
          <span className="font-bold text-lg">Démarrer</span>
        </button>

        <div className="h-full border-l-2 border-l-gray-500 border-r-2 border-r-white mx-1"></div>
        
        <div className="flex-grow flex items-center gap-1 h-full py-1 overflow-x-auto">
          {windows.map(win => (
            <button
              key={win.id}
              onClick={() => focusWindow(win.id)}
              className={`h-full px-2 flex items-center space-x-1 min-w-[100px] max-w-[200px] text-left ${
                win.id === activeWindowId && !win.isMinimized ? 'win98-inset !shadow-none bg-gray-200' : 'win98-button'
              }`}
            >
              <span className="flex-shrink-0">{win.icon}</span>
              <span className="truncate text-lg w-full">{win.title}</span>
            </button>
          ))}
        </div>

        <div className="win98-inset h-8 px-2 flex items-center justify-center text-lg ml-1 min-w-[80px]">
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </>
  );
};
