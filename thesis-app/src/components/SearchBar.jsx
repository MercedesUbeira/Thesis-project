import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." className="search-input" />
      <button className="search-icon">🔍</button>
    </div>
  );
}

export default SearchBar;
