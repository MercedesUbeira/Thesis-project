import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import './KnowledgeBase.css';

const KnowledgeBase = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [stores, setStores] = useState([]);
  const [language, setLanguage] = useState('Danish');

  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.values(data);
        setArticles(loaded);
      } else {
        setArticles([]);
      }
    });
  }, []);

  const filtered = articles.filter((article) => {
    const searchText = query.toLowerCase();

    const matchesText =
      article.title?.toLowerCase().includes(searchText) ||
      article.content?.toLowerCase().includes(searchText);

    const matchesStore =
      stores.length === 0 || stores.includes(article.store);

    const matchesLanguage =
      !language || article.language === language;

    return matchesText && matchesStore && matchesLanguage;
  });

  return (
    <div className="knowledge-base">
      <SearchBar
        query={query}
        onSearch={setQuery}
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
          <p className="article-language-note">
            This request is in {language}, therefore articles shown are in {language}.
          </p>
          {filtered.map((article, index) => (
            <div key={index} className="article-card">
              <div className="article-header">
                <h3>{article.title}</h3>
                <span className="updated">Last update: {article.updated || 'N/A'}</span>
              </div>
              <p className="description">{article.content}</p>
              <div className="tags">
                {article.tags?.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;