import React, { useState } from 'react';
import KnowledgeTab from './KnowledgeTab';
import TicketSummary from './TicketSummary';
import './SidePanel.css';

function SidePanel() {
  const [activeTab, setActiveTab] = useState('ticket'); // default: ticket summary

  return (
    <div className="layout-container">
      {/* Main content */}
      <div className="main-panel">
        {activeTab === 'knowledge' ? <KnowledgeTab /> : <TicketSummary />}
      </div>

      {/* Tabs on the right */}
      <div className="tab-panel">
      <button
          className={`tab-button ${activeTab === 'ticket' ? 'active' : ''}`}
          onClick={() => setActiveTab('ticket')}
        >
          TICKET SUMMARY
        </button>
        <button
          className={`tab-button ${activeTab === 'knowledge' ? 'active' : ''}`}
          onClick={() => setActiveTab('knowledge')}
        >
          KNOWLEDGE BASE
        </button>
       
      </div>
    </div>
  );
}

export default SidePanel;
