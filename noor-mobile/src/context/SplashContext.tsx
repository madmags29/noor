import React, { createContext, useContext, useState, useCallback } from 'react';

interface SplashContextType {
  showSplash: boolean;
  replaySplash: () => void;
  hideSplash: () => void;
}

const SplashContext = createContext<SplashContextType>({
  showSplash: true,
  replaySplash: () => {},
  hideSplash: () => {},
});

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const replaySplash = useCallback(() => {
    setShowSplash(true);
  }, []);

  const hideSplash = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SplashContext.Provider value={{ showSplash, replaySplash, hideSplash }}>
      {children}
    </SplashContext.Provider>
  );
};

export const useSplash = () => useContext(SplashContext);
