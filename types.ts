
import type React from 'react';

export interface WindowInstance {
  id: number;
  key: number;
  title: string;
  icon: React.ReactNode;
  content: React.ReactElement;
  zIndex: number;
  position: { x: number; y: number };
  isMinimized: boolean;
  isMaximized: boolean;
}
