import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import SearchBar from './SearchBar';
import './KnowledgeTab.css';

function KnowledgeTab() {
  const [articles, setArticles] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setArticles(list);
      }
    });
  }, []);

  const filtered = selectedStore
    ? articles.filter((a) => a.store === selectedStore)
    : articles;

  return (
    <div className="kb-container">
      <div className="kb-header">
        <SearchBar />
        <button
          className="filter-toggle"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="filter-bar">
          {['BILKA', 'FOOTEX', 'NETTO'].map((store) => (
            <button
              key={store}
              className={`filter-btn ${selectedStore === store ? 'active' : ''}`}
              onClick={() => setSelectedStore(store)}
            >
              {store}
            </button>
          ))}
          {selectedStore && (
            <button className="clear-btn" onClick={() => setSelectedStore(null)}>
              Clear
            </button>
          )}
        </div>
      )}

      <div className="article-list">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <div className="article-card" key={article.id}>
              <h3>{article.title || article.id}</h3>
              <p>{article.content || 'No content available'}</p>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}

export default KnowledgeTab;
