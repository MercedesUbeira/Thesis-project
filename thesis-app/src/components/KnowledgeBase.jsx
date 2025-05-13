import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './KnowledgeBase.css';

const mockArticles = [
  {
    title: 'Returns',
    updated: '25/04/2025',
    description: 'Guide for processing returns for products purchased on Bilka.dk and through BilkaToGo, including defective items and right of withdrawal.',
    tags: ['Tag1', 'Tag2', 'Tag3']
  },
  {
    title: 'Store Escalation',
    updated: '03/10/2024',
    description: 'Explains what to do when a Bilka store incorrectly redirects a customer. Includes macros, internal notes, and refund/escalation guidelines.',
    tags: ['Tag1', 'Tag2']
  },
  {
    title: 'Order Status',
    updated: '03/09/2024',
    description: "How to verify the status of a customer's Bilka.dk order and respond accurately.",
    tags: ['Tag1']
  }
];

const KnowledgeBase = () => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState(['Tag1', 'Tag2', 'Tag3']);

  const handleSearch = (value) => setQuery(value);
  const handleRemoveTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const filteredArticles = mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="knowledge-base">
      <SearchBar
        query={query}
        onSearch={handleSearch}
        tags={tags}
        onRemoveTag={handleRemoveTag}
        onFilter={() => alert('Filter opened')}
        onLanguage={() => alert('Language toggled')}
      />

      {filteredArticles.length === 0 ? (
        <>
          <div className="no-results">
            <div className="empty-illustration" />
            <h2>There is nothing to see yet</h2>
            <p>Find articles by typing key words in the search bar</p>
            <div className="hint">Pro hint: Get better results by applying filters</div>
          </div>
        </>
      ) : (
        <div className="article-list">
          <p className="article-language-note">This request is in Danish, therefore articles shown are in Danish.</p>
          {filteredArticles.map((article, index) => (
            <div key={index} className="article-card">
              <div className="article-header">
                <h3>{article.title}</h3>
                <span className="updated">Last update: {article.updated}</span>
              </div>
              <p className="description">{article.description}</p>
              <div className="tags">
                {article.tags.map((tag, i) => (
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
