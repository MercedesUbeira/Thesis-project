import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import SearchBar from './SearchBar';
import SidePanel from './SidePanel';
import './KnowledgeTab.css';

function KnowledgeTab() {
  const [articles, setArticles] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

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
    <div className="knowledge-layout">
      <div className="left">
        <SearchBar />
        <div className="articles">
          {filtered.map((a) => (
            <div className="article" key={a.id}>
              <h3>{a.title || a.id}</h3>
              <p>{a.content || 'No content available'}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="center">
        {['BILKA', 'FOOTEX', 'NETTO'].map((store) => (
          <button
            key={store}
            className={`store-btn ${selectedStore === store ? 'active' : ''}`}
            onClick={() => setSelectedStore(store)}
          >
            {store}
          </button>
        ))}
        {selectedStore && (
          <button className="clear-btn" onClick={() => setSelectedStore(null)}>Clear</button>
        )}
      </div>
      <div className="right">
        <SidePanel />
      </div>
    </div>
  );
}

export default KnowledgeTab;
