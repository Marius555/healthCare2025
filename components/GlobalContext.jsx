import React, { createContext, useContext, useState } from 'react';

// Create context
const GlobalContext = createContext();

// Provider component
export function GlobalProvider({ children }) {
  const [globalValues, setGlobalValues] = useState({
    theme: 'light',
    user: null,
    // Add any other values you want to share globally
  });

  return (
    <GlobalContext.Provider value={{ globalValues, setGlobalValues }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook to use the global values
export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}