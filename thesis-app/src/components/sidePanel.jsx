import React from 'react';
import './SidePanel.css';

const SidePanel = ({ activeTab, onTabChange }) => {
  const tabs = ['Ticket Summary', 'Knowledge Base', 'Other Tools'];

  return (
    <aside className="side-panel">
      {tabs.map(tab => (
        <div
          key={tab}
          className={`side-tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </div>
      ))}
    </aside>
  );
};

export default SidePanel;
