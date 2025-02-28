import React from 'react';
import { useRef } from 'react';
import MagnifyingGlass from '../img/lupa.svg?react';
import MagnifyingGlassWhite from '../img/lupa branca.svg?react';
import ArrowDown from '../img/arrow down.svg?react';
import Moon from '../img/lua.svg?react';
import Sun from '../img/sol.svg?react';
import './Header.module.css';

const Header = ({ todoList, setDisplayedList, setSearch, theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('All');
  const menuRef = useRef(false);
  const [isFixed, setIsFixed] = React.useState(false);

  const handleShowAll = () => {
    setDisplayedList(todoList);
    setFilter('All');
    setIsMenuOpen(false);
  };
  const handleDone = () => {
    setDisplayedList(todoList.filter((task) => task.status === 'Done'));
    setFilter('Done');
    setIsMenuOpen(false);
  };
  const handleIncomplete = () => {
    setDisplayedList(todoList.filter((task) => task.status === 'Incomplete'));
    setFilter('Incomplete');
    setIsMenuOpen(false);
  };
  function toggleTheme() {
    if (theme === 'light') {
      return setTheme('dark');
    }
    if (theme === 'dark') {
      return setTheme('light');
    }
  }

  const handleClick = () => {
    setIsFixed((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (!menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  React.useEffect(() => {
    if (filter === 'All') {
      handleShowAll();
    }
    if (filter === 'Incomplete') {
      handleIncomplete();
    }
    if (filter === 'Done') {
      handleDone();
    }
  }, [todoList]);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <div className="container">
      <h1 className="title">TODO LIST</h1>
      <div className="formContainer">
        <div className="searchContainer">
          <input
            onChange={({ target }) => setSearch(target.value)}
            className="search"
            type="text"
            placeholder="Search note..."
          />
          {theme === 'light' ? (
            <img
              className="magnifyingGlass"
              src={MagnifyingGlass}
              alt="magnifying glass"
            />
          ) : (
            <img
              className="magnifyingGlass"
              src={MagnifyingGlassWhite}
              alt="MagnifyingGlassWhite"
            />
          )}
        </div>
        <div ref={menuRef} className="buttonAllContainer" onClick={handleClick}>
          <button
            data-filter={filter}
            className="all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {filter}
            <img
              className={`arrowDown ${isFixed ? 'fixed' : ''}`}
              src={ArrowDown}
              alt="arrowDown"
            />
          </button>
          {isMenuOpen && (
            <div className="filterButton">
              <button className="filter" onClick={handleShowAll}>
                All
              </button>
              <button className="filter" onClick={handleIncomplete}>
                Incomplete
              </button>
              <button className="filter" onClick={handleDone}>
                Done
              </button>
            </div>
          )}
        </div>
        <button className="darkMode" onClick={toggleTheme}>
          {theme === 'light' ? (
            <img className="moon" src={Moon} alt="Moon" />
          ) : (
            <img className="sun" src={Sun} alt="Sun" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
