import React, { useState } from 'react';
import KnowledgeTab from './components/KnowledgeTab';
import TicketSummary from './components/TicketSummary';

function App() {
  const [activeTab, setActiveTab] = useState('ticket');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-6 w-[1100px] h-[650px] flex flex-col">
        {/* Tabs */}
        <div className="flex space-x-4 border-b pb-2 mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'knowledge' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
            onClick={() => setActiveTab('knowledge')}
          >
            Knowledge Base
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'ticket' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
            onClick={() => setActiveTab('ticket')}
          >
            Ticket Summary
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'knowledge' ? <KnowledgeTab /> : <TicketSummary />}
        </div>
      </div>
    </div>
  );
}

export default App;
