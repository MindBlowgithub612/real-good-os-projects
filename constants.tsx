
import React from 'react';

const BASE_URL = 'https://win98icons.alexmeub.com/icons/png';

// Helper pour les images pixelisées
const WinIcon: React.FC<{ src: string; size?: number; className?: string }> = ({ src, size = 32, className }) => (
  <img 
    src={`${BASE_URL}/${src}.png`} 
    alt="" 
    width={size} 
    height={size} 
    className={className}
    style={{ imageRendering: 'pixelated', width: size, height: size }} 
    draggable={false}
  />
);

export const StartIcon: React.FC = () => (
  <WinIcon src="windows-0" size={24} />
);

export const MyComputerIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="computer_explorer-0" size={size} />
);

export const MyComputerProgramIcon: React.FC = () => (
    <WinIcon src="computer_explorer-0" size={16} />
);

export const RecycleBinIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="recycle_bin_empty-0" size={size} />
);

export const ErrorIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 32 }) => (
  <WinIcon src="msg_error-0" size={size} className={className} />
);

export const ErrorGeneratorIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <WinIcon src="settings_gear-0" size={size} />
);

export const ErrorGeneratorProgramIcon: React.FC = () => (
  <WinIcon src="settings_gear-0" size={16} />
);

export const DriveIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <WinIcon src="hard_disk_drive-0" size={size} />
);

export const InternetExplorerIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <WinIcon src="msie1-0" size={size} />
);

export const InternetExplorerProgramIcon: React.FC = () => (
  <WinIcon src="msie1-0" size={16} />
);

export const NotepadIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="notepad-0" size={size} />
);

export const PaintIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="paint_file-0" size={size} />
);

export const CalculatorIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="calculator-0" size={size} />
);

export const MinesweeperIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="game_mine_1-0" size={size} />
);

export const SolitaireIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="game_solitaire-0" size={size} />
);

export const MsDosIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="console_prompt-0" size={size} />
);

export const OutlookIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="outlook_express-0" size={size} />
);

export const XFramesIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <WinIcon src="directx-0" size={size} />
);

// Toolbar Icons for IE
export const BackIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12H20" stroke="black" strokeWidth="2"/>
    <path d="M10 6L4 12L10 18" stroke="black" strokeWidth="2"/>
  </svg>
);

export const ForwardIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12H4" stroke="black" strokeWidth="2"/>
    <path d="M14 6L20 12L14 18" stroke="black" strokeWidth="2"/>
  </svg>
);

export const RefreshIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="black" strokeWidth="2"/>
    <path d="M12 4L16 8M12 4L8 8" stroke="black" strokeWidth="2"/>
  </svg>
);

export const StopIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L18 18M18 6L6 18" stroke="black" strokeWidth="2"/>
  </svg>
);

export const HomeIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="black" strokeWidth="2"/>
    <path d="M9 22V12H15V22" stroke="black" strokeWidth="2"/>
  </svg>
);

export const MonitorIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="black" strokeWidth="2"/>
    <path d="M8 21H16" stroke="black" strokeWidth="2"/>
    <path d="M12 17V21" stroke="black" strokeWidth="2"/>
    <path d="M6 7H18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Window Control Icons - Pixel Perfect
export const WindowMinimizeIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" shapeRendering="crispEdges">
     <rect x="2" y="9" width="8" height="2" fill="black" />
  </svg>
);

export const WindowMaximizeIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" shapeRendering="crispEdges">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H12V11H0V0ZM1 2V10H11V2H1Z" fill="black"/>
    <rect x="1" y="1" width="10" height="1" fill="black" />
  </svg>
);

export const WindowRestoreIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" shapeRendering="crispEdges">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 0H12V9H11V2H4V1H3V0ZM0 3H9V12H0V3ZM1 4H8V11H1V4Z" fill="black"/>
  </svg>
);

export const WindowCloseIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" shapeRendering="crispEdges">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0L2 0L6 4L10 0L12 0L12 2L8 6L12 10L12 12L10 12L6 8L2 12L0 12L0 10L4 6L0 2L0 0Z" fill="black"/>
  </svg>
);
