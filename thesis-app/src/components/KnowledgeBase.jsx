import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../firebase';
import './KnowledgeBase.css';

const KnowledgeBase = () => {
  const [articles, setArticles] = useState([]);
  const [queryText, setQueryText] = useState('');
  const [stores, setStores] = useState([]);
  const [language, setLanguage] = useState('Danish');

  useEffect(() => {
    const baseRef = ref(db, 'articles');

    let articlesRef = baseRef;
    if (stores.length === 1) {
      articlesRef = query(baseRef, orderByChild('filter'), equalTo(stores[0]));
    }

    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      setArticles(data ? Object.values(data) : []);
    });
  }, [stores.join(',')]);

  const filtered = articles.filter((article) => {
    const searchText = queryText.toLowerCase();

    const matchesText =
      article.title?.toLowerCase().includes(searchText) ||
      article.shortDescription?.toLowerCase().includes(searchText) ||
      article.longDescription?.toLowerCase().includes(searchText);

    const matchesLanguage = !language || article.language === language;

    return matchesText && matchesLanguage;
  });

  return (
    <div className="knowledge-base">
      <SearchBar
        query={queryText}
        onSearch={setQueryText}
        tags={stores}
        onAddTag={(store) => setStores([...stores, store])}
        onRemoveTag={(store) => setStores(stores.filter((s) => s !== store))}
        language={language}
        setLanguage={setLanguage}
      />

      {filtered.length === 0 ? (
        <div className="no-results">
          <div className="empty-illustration" />
          <h2>There is nothing to see yet</h2>
          <p>Find articles by typing key words in the search bar</p>
          <div className="hint">Pro hint: Get better results by applying filters</div>
        </div>
      ) : (
        <div className="article-list">
          {filtered.map((article, index) => (
            <div key={index} className="article-card">
              <div className="article-header">
                <h3>{article.title}</h3>
                <span className="updated">Last update: {article.updated || 'N/A'}</span>
              </div>
              <p className="description">{article.shortDescription}</p>
              <div className="tags">
                <span className="tag">{article.filter}</span>
                <span className="tag">{article.language}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
