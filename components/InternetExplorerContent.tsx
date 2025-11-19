
import React, { useState, useEffect, useRef } from 'react';
import { HomeIcon, BackIcon, ForwardIcon, RefreshIcon, StopIcon, MonitorIcon } from '../constants';

type RetroMode = 'normal' | 'grayscale' | 'green' | 'amber';

export const InternetExplorerContent: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [inputValue, setInputValue] = useState('https://www.google.com/webhp?igu=1');
  const [retroMode, setRetroMode] = useState<RetroMode>('normal');
  const [showFavorites, setShowFavorites] = useState(false);
  const favoritesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
        setShowFavorites(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = () => {
    let targetUrl = inputValue;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }
    setUrl(targetUrl);
    setInputValue(targetUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  const goHome = () => {
      const home = 'https://www.google.com/webhp?igu=1';
      setUrl(home);
      setInputValue(home);
  }

  const cycleRetroMode = () => {
    const modes: RetroMode[] = ['normal', 'grayscale', 'green', 'amber'];
    const currentIndex = modes.indexOf(retroMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRetroMode(modes[nextIndex]);
  };

  const getFilterStyle = () => {
    // Le flou (blur) aide à masquer la netteté des polices modernes
    switch (retroMode) {
      case 'grayscale':
        return 'grayscale(100%) contrast(1.2) brightness(1.1) blur(0.5px)';
      case 'green':
        return 'sepia(100%) hue-rotate(70deg) saturate(300%) contrast(1.3) brightness(0.9) blur(0.6px)';
      case 'amber':
        return 'sepia(100%) hue-rotate(-15deg) saturate(300%) contrast(1.3) brightness(0.9) blur(0.6px)';
      default:
        return 'none';
    }
  };

  const favorites = [
      { name: 'Google (Recherche)', url: 'https://www.google.com/webhp?igu=1' },
      { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
      { name: 'Bing', url: 'https://www.bing.com' },
      { name: 'Win98 Icons', url: 'https://win98icons.alexmeub.com/' },
      { name: 'Internet Archive', url: 'https://archive.org/mobile' }, // Mobile version often fits better in iframes
  ];

  return (
    <div className="flex flex-col h-full bg-[#C0C0C0]">
      {/* Menu Bar */}
      <div className="flex space-x-2 p-1 bg-[#C0C0C0] text-sm border-b border-gray-400 select-none">
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Fichier</span>
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Edition</span>
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Affichage</span>
        <div className="relative" ref={favoritesRef}>
            <span 
                className={`px-1 hover:bg-[#000080] hover:text-white cursor-pointer ${showFavorites ? 'bg-[#000080] text-white' : ''}`}
                onClick={() => setShowFavorites(!showFavorites)}
            >
                Favoris
            </span>
            {showFavorites && (
                <div className="absolute top-full left-0 w-48 bg-[#C0C0C0] win98-button z-50 flex flex-col shadow-xl">
                    {favorites.map((fav) => (
                        <button
                            key={fav.url}
                            className="text-left px-4 py-1 hover:bg-[#000080] hover:text-white text-sm truncate"
                            onClick={() => {
                                setUrl(fav.url);
                                setInputValue(fav.url);
                                setShowFavorites(false);
                            }}
                        >
                            {fav.name}
                        </button>
                    ))}
                    <div className="h-px bg-gray-400 mx-1 my-1"></div>
                    <div className="px-4 py-1 text-gray-500 italic text-xs">Plus de favoris...</div>
                </div>
            )}
        </div>
        <span className="px-1 hover:bg-[#000080] hover:text-white cursor-default">Aide</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-gray-400 shadow-sm">
        <span className="w-1 border-l border-white h-6 mx-1"></span>
        <button className="win98-button p-1 active:translate-y-px" onClick={() => window.history.back()} disabled><BackIcon /></button>
        <button className="win98-button p-1 active:translate-y-px" onClick={() => window.history.forward()} disabled><ForwardIcon /></button>
        <button className="win98-button p-1 active:translate-y-px" onClick={() => setUrl('')}><StopIcon /></button>
        <button className="win98-button p-1 active:translate-y-px" onClick={() => { const u = url; setUrl(''); setTimeout(() => setUrl(u), 10); }}><RefreshIcon /></button>
        <button className="win98-button p-1 active:translate-y-px" onClick={goHome}><HomeIcon /></button>
        <div className="w-2"></div>
        <button 
            className={`win98-button p-1 active:translate-y-px ${retroMode !== 'normal' ? 'win98-inset bg-gray-200' : ''}`} 
            onClick={cycleRetroMode}
            title="Changer le mode d'affichage (Rétro)"
        >
            <MonitorIcon />
        </button>
      </div>
      
      {/* Address Bar */}
      <div className="flex items-center gap-2 p-1 border-b border-gray-400">
        <span className="text-sm ml-2">Adresse:</span>
        <div className="win98-inset flex-grow bg-white flex items-center">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4 ml-1 opacity-50" alt="" />
            <input 
                type="text" 
                className="w-full px-1 border-none outline-none text-sm font-sans" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-grow win98-inset bg-white overflow-hidden relative group">
        {/* Retro Effects Overlay */}
        {retroMode !== 'normal' && (
            <>
                {/* Scanlines */}
                <div 
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-40"
                    style={{
                        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                        backgroundSize: '100% 2px, 3px 100%'
                    }}
                ></div>
                {/* Static Noise / Grain */}
                <div 
                    className="absolute inset-0 z-20 pointer-events-none opacity-[0.15] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                ></div>
            </>
        )}

        {url ? (
            <iframe 
                src={url} 
                className="w-full h-full border-none transition-all duration-500"
                title="Browser Content"
                style={{ filter: getFilterStyle() }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
            />
        ) : (
            <div className="p-8 font-sans flex flex-col items-center justify-center h-full text-gray-500" style={{ filter: getFilterStyle() }}>
                <p>Navigation annulée ou page blanche.</p>
            </div>
        )}
      </div>
      
      {/* Status Bar */}
      <div className="border-t border-gray-400 p-0.5 text-xs flex gap-2 select-none bg-[#C0C0C0]">
          <div className="win98-inset px-1 w-1/2 truncate">Terminé</div>
          <div className="win98-inset px-1 w-1/4">Internet</div>
          <div className="win98-inset px-1 flex-grow bg-gray-200"></div>
      </div>
    </div>
  );
};
