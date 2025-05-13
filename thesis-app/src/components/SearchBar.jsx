import React from 'react';
import './SearchBar.css';

const SearchBar = ({ query, onSearch, tags, onRemoveTag, onFilter, onLanguage }) => {
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
        <button onClick={onFilter} className="filter-btn">🔽</button>
        <button onClick={onLanguage} className="lang-btn">🌐</button>
      </div>

      {tags.length > 0 && (
        <div className="tag-container">
          {tags.map((tag, i) => (
            <span className="tag" key={i}>
              {tag} <span onClick={() => onRemoveTag(tag)}>×</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;