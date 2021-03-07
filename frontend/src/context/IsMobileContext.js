import React, { useState, useEffect, createContext, useContext } from 'react';

export const IsMobileContext = createContext();

export const IsMobileProvider = props => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  
  const updateMedia = () => {
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
  });
  
  return <IsMobileContext.Provider value={[isMobile, setIsMobile]} {...props} ></IsMobileContext.Provider>;
};

export const useIsMobileStore = () => useContext(IsMobileContext);
