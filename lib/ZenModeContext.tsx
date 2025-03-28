"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type ZenModeContextType = {
  zenMode: boolean;
  toggleZenMode: () => void;
};

const ZenModeContext = createContext<ZenModeContextType | undefined>(undefined);

export function ZenModeProvider({ children }: { children: ReactNode }) {
  const [zenMode, setZenMode] = useState(false);

  const toggleZenMode = () => {
    setZenMode((prev) => !prev);
  };

  return (
    <ZenModeContext.Provider value={{ zenMode, toggleZenMode }}>
      {children}
    </ZenModeContext.Provider>
  );
}

export function useZenMode() {
  const context = useContext(ZenModeContext);
  if (context === undefined) {
    throw new Error('useZenMode must be used within a ZenModeProvider');
  }
  return context;
}
