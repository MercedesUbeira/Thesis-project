import React, { useState } from 'react';
import './SearchBar.css';
import { FaFilter } from 'react-icons/fa';

const filterOptions = ['Bilka.dk', 'BilkaToGo', 'Flowr.dk', 'føtex.dk', 'GDPR Salling group'];
const languageOptions = ['Danish', 'English', 'Polish', 'German'];

const SearchBar = ({ query, onSearch, tags, onAddTag, onRemoveTag, language, setLanguage }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const handleFilterSelect = (tag) => {
    tags.includes(tag) ? onRemoveTag(tag) : onAddTag(tag);
    setShowFilters(false); 
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguages(false);
  };

  const langCodeMap = {
    Danish: 'DA',
    English: 'EN',
    Polish: 'PL',
    German: 'DE'
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-controls">
        <input
          type="text"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search for articles"
          className="search-input"
        />
        
        <div
          className="icon-button"
          onClick={() => {
            setShowFilters(!showFilters);
            setShowLanguages(false);
          }}
        >
          <FaFilter />
        </div>

        <div
          className="icon-button"
          onClick={() => {
            setShowLanguages(!showLanguages);
            setShowFilters(false);
          }}
        >
          <span className="lang-code">{langCodeMap[language] || '🌐'}</span>
        </div>
      </div>

      {showFilters && (
        <div className="dropdown below-filter">
          {filterOptions.map((tag) => (
            <div
              key={tag}
              className={`dropdown-item ${tags.includes(tag) ? 'active' : ''}`}
              onClick={() => handleFilterSelect(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      {showLanguages && (
        <div className="dropdown below-language">
          {languageOptions.map((lang) => (
            <div
              key={lang}
              className={`dropdown-item ${lang === language ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(lang)}
            >
              {lang}
            </div>
          ))}
        </div>
      )}

      {tags.length > 0 && (
        <div className="tag-container">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
              <span onClick={() => onRemoveTag(tag)} className="remove-tag">×</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
