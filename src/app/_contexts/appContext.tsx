"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our context
interface AppContextType {
  isProfileOpen: boolean;
  setIsProfileOpen: (isOpen: boolean) => void;
  isBankingOpen: boolean;
  setIsBankingOpen: (isOpen: boolean) => void;
  isTaskOpen: boolean;
  setIsTaskOpen: (isOpen: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBankingOpen, setIsBankingOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const value = {
    isProfileOpen,
    setIsProfileOpen,
    isBankingOpen,
    setIsBankingOpen,
    isTaskOpen,
    setIsTaskOpen,
    isChatOpen,
    setIsChatOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Create a custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
