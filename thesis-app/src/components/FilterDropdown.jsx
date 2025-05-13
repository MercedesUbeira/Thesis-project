import React from 'react';
import './SearchBar.css';

const tagOptions = ['Bilka.dk', 'BilkaToGo', 'Flowr.dk', 'føtex.dk', 'GDPR Salling group'];

const FilterDropdown = ({ tags, onAddTag, onRemoveTag }) => {
  return (
    <div className="filter-dropdown">
      {tagOptions.map((tag, i) => (
        <div
          key={i}
          className={`filter-option ${tags.includes(tag) ? 'active' : ''}`}
          onClick={() => {
            tags.includes(tag) ? onRemoveTag(tag) : onAddTag(tag);
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default FilterDropdown;