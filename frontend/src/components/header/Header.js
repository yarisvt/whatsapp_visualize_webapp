import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { usePeopleStore } from '../../context/PeopleContext';
import { useThemeStore } from '../../context/ThemeContext';

import './header.scss';

function Header() {
  const location = useLocation();
  const [theme, setTheme] = useThemeStore();
  const [people, setPeople] = usePeopleStore();
  const [lastAttempt, setLastAttempt] = useState(-1);

  document.getElementById('root').className = theme;

  useEffect(() => {
    if (!people.length && (lastAttempt === -1 || Date.now() - lastAttempt >= 30000)) {
      setLastAttempt(Date.now());
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/people`)
        .then(res => res.json())
        .then((response) => {
          if (response.success) {
            setPeople(response.result);
          }
        }).catch(console.error);
    }
  }, [lastAttempt, people.length, setPeople]);

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  return (
    <header>
      <nav>
        <Link to='/group'>
          <div className={`header-item ${location.pathname === '/group' || location.pathname === '/' ? 'active' : ''}`}>
            <span>Group</span>
          </div>
        </Link>
        <Link to='/personal'>
          <div className={`header-item ${location.pathname === '/personal' ? 'active' : ''}`}>
            <span>Personal</span>
          </div>
        </Link>
      </nav>
      <button onClick={toggleTheme} className='header-item'>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 486.883 486.883"><path d="M243.451 0C109.226 0 .001 109.191.001 243.417c0 134.244 109.226 243.466 243.45 243.466s243.431-109.222 243.431-243.466C486.882 109.191 377.676 0 243.451 0zm0 437.958c-.237 0-.479-.033-.716-.033V48.96c.237 0 .479-.035.716-.035 107.247 0 194.506 87.246 194.506 194.492 0 107.265-87.259 194.541-194.506 194.541z"/></svg>
      </button>
    </header>
  );
}

export default Header;
