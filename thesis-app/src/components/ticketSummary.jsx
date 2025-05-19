import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import './TicketSummary.css';

const TicketSummary = () => {
  const [ticketData, setTicketData] = useState({
    client: [],
    internal: [],
    external: [],
  });
  const [oversight, setOversight] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        client: [
          'The customer attempted to return a faulty microwave at Bilka Aarhus but was referred to customer service.',
          'She has contacted us multiple times without a resolution.'
        ],
        internal: [
          'Agents reviewed the case and decided support should take over.',
          'Refund or compensation may be offered depending on the situation.'
        ],
        external: [
          'No contact with external parties has been made yet.'
        ]
      };
      setTicketData(data);
    };

    fetchData();
  }, []);

  const generateOversight = () => {
    const summary = `${ticketData.client.join(' ')} ${ticketData.internal.join(' ')} ${ticketData.external.join(' ')}`;
    setOversight(summary);
  };

  const copyToClipboard = (section) => {
    const text = ticketData[section].join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="ticket-summary">
      <h1>Ticket Summary</h1>

      {['client', 'internal', 'external'].map((section) => (
        <div key={section} className="section">
          <div className="section-header">
            <span className="section-title">{section.charAt(0).toUpperCase() + section.slice(1)} ({ticketData[section].length})</span>
            <button className="copy-button" onClick={() => copyToClipboard(section)}>
              <ClipboardIcon className="clipboard-icon" />
              Copy to clipboard
            </button>
          </div>
          <div className="section-body">
            {ticketData[section].length > 0
              ? ticketData[section].map((line, i) => <p key={i}>{line}</p>)
              : <p>No entries.</p>}
          </div>
        </div>
      ))}

      <div className={`oversight-wrapper ${oversight ? 'expanded' : ''}`}>
        {oversight ? (
          <p className="oversight-text">{oversight}</p>
        ) : (
          <span className="placeholder">No suggestions</span>
        )}
      </div>

      <div className="centered-button">
        <button className="generate-btn" onClick={generateOversight}>
          Generate oversight
        </button>
      </div>
    </div>
  );
};

export default TicketSummary;
