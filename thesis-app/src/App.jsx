import React, { useState } from 'react';
import SidePanel from './components/SidePanel.jsx';
import TicketSummary from './components/TicketSummary.jsx';
import KnowledgeBase from './components/KnowledgeBase.jsx';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('Ticket Summary');

  return (
    <div className="app-container">
      <SidePanel activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        {activeTab === 'Ticket Summary' && <TicketSummary />}
        {activeTab === 'Knowledge Base' && <KnowledgeBase />}
      </main>
    </div>
  );
}

export default App;
