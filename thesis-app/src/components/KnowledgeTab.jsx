import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import SearchBar from './SearchBar';
import './KnowledgeTab.css';

function KnowledgeTab() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Search for Articles</h2>

      <div className="flex items-center border rounded px-2 py-1 mb-3">
        <input
          type="text"
          placeholder="Search articles..."
          className="flex-grow outline-none px-2"
        />
        <button className="text-gray-500 hover:text-gray-800">
          🔍
        </button>
        <button className="ml-2 text-blue-600 hover:text-blue-800">
          ⛃
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {['Tag1', 'Tag2', 'Tag3'].map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-700"
          >
            {tag} ✕
          </span>
        ))}
      </div>


      <div className="flex flex-col items-center text-center mb-4">
        <div className="w-32 h-32 bg-gray-100 border rounded mb-2 flex items-center justify-center">
          📄🔍
        </div>
        <p className="font-medium">There is nothing to see yet</p>
        <p className="text-sm text-gray-500">
          Find articles by typing key words in the search bar
        </p>
      </div>

      {/* Pro tip box */}
      <div className="border border-yellow-400 bg-yellow-100 text-yellow-800 p-2 rounded text-sm">
        Pro hint: Get better results by applying filters
      </div>
    </div>
  );
}

export default KnowledgeTab;
