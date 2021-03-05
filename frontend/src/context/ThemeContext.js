import React, { useState, createContext, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = props => {
  function getTheme() {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) {
      return 'dark';
    }
    return 'light';
  }

  const [theme, setTheme] = useState(getTheme());
  return <ThemeContext.Provider value={[theme, setTheme]} {...props} ></ThemeContext.Provider>;
};

export const useThemeStore = () => useContext(ThemeContext);
