import React, { forwardRef } from 'react';
import { 
    ErrorGeneratorProgramIcon, NotepadIcon, PaintIcon, CalculatorIcon, 
    MinesweeperIcon, SolitaireIcon, MsDosIcon, InternetExplorerProgramIcon, OutlookIcon
} from '../constants';

interface StartMenuProps {
  onClose: () => void;
  onOpenErrorGenerator: () => void;
}

export const StartMenu = forwardRef<HTMLDivElement, StartMenuProps>(({ onClose, onOpenErrorGenerator }, ref) => {
  const handleItemClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      ref={ref}
      className="absolute bottom-10 left-0 w-52 bg-[#C0C0C0] win98-button p-1 flex z-[1001] text-lg"
    >
      <div className="bg-[#000080] w-8 flex items-end justify-center py-2">
        <h2 className="text-white font-bold text-2xl -rotate-90 whitespace-nowrap tracking-widest">
          <span className="text-[#C0C0C0]">Windows</span>98
        </h2>
      </div>
      <ul className="flex-1">
         <li className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2">
             <span className="w-4 flex justify-center"><InternetExplorerProgramIcon /></span>
             <span>Internet</span>
        </li>
        <li className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2">
             <span className="w-4 flex justify-center"><OutlookIcon size={16}/></span>
             <span>Outlook Express</span>
        </li>
        <li className="h-px w-full bg-gray-500 my-1 border-b border-b-white"></li>
        <li className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2">
           <span className="w-4 flex justify-center"><NotepadIcon size={16}/></span>
           <span>Bloc-notes</span>
        </li>
         <li className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2">
            <span className="w-4 flex justify-center"><PaintIcon size={16}/></span>
            <span>Paint</span>
        </li>
         <li className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2">
            <span className="w-4 flex justify-center"><CalculatorIcon size={16}/></span>
            <span>Calculatrice</span>
        </li>
        <li className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2">
            <span className="w-4 flex justify-center"><MsDosIcon size={16}/></span>
            <span>Commandes MS-DOS</span>
        </li>
         <li className="h-px w-full bg-gray-500 my-1 border-b border-b-white"></li>
         <li className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2">
             <span className="w-4 flex justify-center"><MinesweeperIcon size={16}/></span>
             <span>Démineur</span>
        </li>
         <li className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2">
             <span className="w-4 flex justify-center"><SolitaireIcon size={16}/></span>
             <span>Solitaire</span>
        </li>
        <li className="h-px w-full bg-gray-500 my-1 border-b border-b-white"></li>
        <li
          className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center space-x-2"
          onClick={() => handleItemClick(onOpenErrorGenerator)}
        >
           <span className="w-4 flex justify-center"><ErrorGeneratorProgramIcon /></span>
          <span>ErrorGen 98</span>
        </li>
      </ul>
    </div>
  );
});