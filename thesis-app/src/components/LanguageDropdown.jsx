import React from 'react';
import './SearchBar.css';

const languages = ['Danish', 'English', 'Polish', 'German'];

const LanguageDropdown = ({ selected, onSelect }) => {
  return (
    <div className="filter-dropdown">
      {languages.map((lang, i) => (
        <div
          key={i}
          className={`filter-option ${selected === lang ? 'active' : ''}`}
          onClick={() => onSelect(lang)}
        >
          {lang}
        </div>
      ))}
    </div>
  );
};

export default LanguageDropdown;