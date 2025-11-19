
import React, { useState, useCallback } from 'react';
import { Taskbar } from './components/Taskbar';
import { DesktopIcon } from './components/DesktopIcon';
import Window from './components/Window';
import { ErrorGeneratorContent } from './components/ErrorGeneratorContent';
import { MyComputerContent } from './components/MyComputerContent';
import { InternetExplorerContent } from './components/InternetExplorerContent';
import { NotepadContent, PaintContent, CalculatorContent, MinesweeperContent, SolitaireContent, MsDosContent, OutlookContent, XFramesContent } from './components/Apps';
import type { WindowInstance } from './types';
import { 
    MyComputerIcon, RecycleBinIcon, ErrorGeneratorIcon, MyComputerProgramIcon, 
    ErrorGeneratorProgramIcon, InternetExplorerIcon, InternetExplorerProgramIcon,
    NotepadIcon, PaintIcon, CalculatorIcon, MinesweeperIcon, SolitaireIcon, MsDosIcon, OutlookIcon, XFramesIcon
} from './constants';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<number | null>(null);
  const [nextZIndex, setNextZIndex] = useState<number>(10);
  const [nextId, setNextId] = useState<number>(1);

  const closeWindow = useCallback((id: number) => {
    setWindows(prev => {
      const remainingWindows = prev.filter(w => w.id !== id);

      if (activeWindowId === id) {
        if (remainingWindows.length === 0) {
          setActiveWindowId(null);
        } else {
          // Filter out minimized windows when looking for the next candidate, unless all are minimized
          const visibleWindows = remainingWindows.filter(w => !w.isMinimized);
          if (visibleWindows.length > 0) {
             const topWindow = visibleWindows.reduce((top, w) => (w.zIndex > top.zIndex ? w : top));
             setActiveWindowId(topWindow.id);
          } else {
             setActiveWindowId(null);
          }
        }
      }
      return remainingWindows;
    });
  }, [activeWindowId]);

  const focusWindow = useCallback((id: number) => {
    setNextZIndex(prev => prev + 1);
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: nextZIndex + 1 } : w))
    );
    setActiveWindowId(id);
  }, [nextZIndex]);

  const toggleMinimize = useCallback((id: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isMinimized: !w.isMinimized };
      }
      return w;
    }));
    // If we minimized the active window, blur it
    if (activeWindowId === id) {
       setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const toggleMaximize = useCallback((id: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isMaximized: !w.isMaximized };
      }
      return w;
    }));
  }, []);

  const handleTaskbarClick = useCallback((id: number) => {
      const win = windows.find(w => w.id === id);
      if (!win) return;

      if (win.isMinimized) {
          // Restore and focus
          setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
          focusWindow(id);
      } else if (activeWindowId === id) {
          // Minimize if currently active
          toggleMinimize(id);
      } else {
          // Focus if not active
          focusWindow(id);
      }
  }, [windows, activeWindowId, toggleMinimize, focusWindow]);


  const openWindow = useCallback((title: string, icon: React.ReactNode, content: React.ReactElement) => {
    const newId = nextId;
    setNextId(prev => prev + 1);
    const newZIndex = nextZIndex + 1;
    setNextZIndex(newZIndex);

    const newWindow: WindowInstance = {
      id: newId,
      key: newId,
      title,
      icon,
      content,
      zIndex: newZIndex,
      isMinimized: false,
      isMaximized: false,
      position: { x: 50 + (windows.length * 30), y: 50 + (windows.length * 30) }
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newId);
  }, [nextId, nextZIndex, windows.length]);

  return (
    <div className="w-screen h-screen bg-[#008080] overflow-hidden relative font-vt323 select-none">
      <div className="absolute top-4 left-4 flex flex-col flex-wrap h-[90vh] content-start gap-4 z-0 w-full pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-6 mr-4">
            <DesktopIcon 
              icon={<MyComputerIcon />} 
              label="Poste de travail" 
              onDoubleClick={() => openWindow('Poste de travail', <MyComputerProgramIcon />, <MyComputerContent />)} 
            />
            <DesktopIcon 
              icon={<RecycleBinIcon />} 
              label="Corbeille" 
              onDoubleClick={() => alert('La corbeille est vide.')} 
            />
            <DesktopIcon 
              icon={<InternetExplorerIcon />} 
              label="Internet Explorer" 
              onDoubleClick={() => openWindow('Internet Explorer', <InternetExplorerProgramIcon />, <InternetExplorerContent />)} 
            />
            <DesktopIcon 
              icon={<OutlookIcon />} 
              label="Outlook Express" 
              onDoubleClick={() => openWindow('Outlook Express', <OutlookIcon size={16} />, <OutlookContent />)} 
            />
             <DesktopIcon 
              icon={<ErrorGeneratorIcon />} 
              label="ErrorGen 98" 
              onDoubleClick={() => openWindow('ErrorGen 98', <ErrorGeneratorProgramIcon />, <ErrorGeneratorContent />)} 
            />
        </div>
        <div className="pointer-events-auto flex flex-col gap-6 mr-4">
             <DesktopIcon 
              icon={<NotepadIcon />} 
              label="Bloc-notes" 
              onDoubleClick={() => openWindow('Bloc-notes', <NotepadIcon size={16} />, <NotepadContent />)} 
            />
            <DesktopIcon 
              icon={<PaintIcon />} 
              label="Paint" 
              onDoubleClick={() => openWindow('Paint', <PaintIcon size={16} />, <PaintContent />)} 
            />
            <DesktopIcon 
              icon={<CalculatorIcon />} 
              label="Calculatrice" 
              onDoubleClick={() => openWindow('Calculatrice', <CalculatorIcon size={16} />, <CalculatorContent />)} 
            />
            <DesktopIcon 
              icon={<XFramesIcon />} 
              label="X-Frames 3D" 
              onDoubleClick={() => openWindow('X-Frames 3D', <XFramesIcon size={16} />, <XFramesContent />)} 
            />
             <DesktopIcon 
              icon={<MinesweeperIcon />} 
              label="Démineur" 
              onDoubleClick={() => openWindow('Démineur', <MinesweeperIcon size={16} />, <MinesweeperContent />)} 
            />
             <DesktopIcon 
              icon={<SolitaireIcon />} 
              label="Solitaire" 
              onDoubleClick={() => openWindow('Solitaire', <SolitaireIcon size={16} />, <SolitaireContent />)} 
            />
            <DesktopIcon 
              icon={<MsDosIcon />} 
              label="MS-DOS" 
              onDoubleClick={() => openWindow('Invites de commandes', <MsDosIcon size={16} />, <MsDosContent />)} 
            />
        </div>
      </div>

      {windows.map(win => (
        <Window
          key={win.key}
          id={win.id}
          title={win.title}
          zIndex={win.zIndex}
          isActive={win.id === activeWindowId}
          isMinimized={win.isMinimized}
          isMaximized={win.isMaximized}
          onClose={closeWindow}
          onFocus={focusWindow}
          onMinimize={toggleMinimize}
          onMaximize={toggleMaximize}
          initialPosition={win.position}
        >
          {React.cloneElement(win.content, { onClose: () => closeWindow(win.id) } as any)}
        </Window>
      ))}

      <Taskbar 
        windows={windows} 
        activeWindowId={activeWindowId} 
        focusWindow={handleTaskbarClick} 
        onOpenErrorGenerator={() => openWindow('ErrorGen 98', <ErrorGeneratorProgramIcon />, <ErrorGeneratorContent />)}
      />
    </div>
  );
};

export default App;
