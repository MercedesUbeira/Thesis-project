import React, { useState, useEffect } from 'react';
import './TicketSummary.css';

const TicketSummary = () => {
  const [data, setData] = useState({
    client: ['Some summary of the case'],
    internal: ['A summary of the internal discussions'],
    external: []
  });

  const [oversight, setOversight] = useState('');

  const generateOversight = () => {
    const summary = `
Client:
${data.client.join('\n\n')}

Internal:
${data.internal.join('\n\n')}

External:
${data.external.length ? data.external.join('\n\n') : 'No external discussions.'}
    `;
    setOversight(summary);
  };

  return (
    <div className="ticket-summary">
      <h1>Ticket Summary</h1>

      {['client', 'internal', 'external'].map((section) => (
        <div className="section" key={section}>
          <div className="section-header">
            <span>{section[0].toUpperCase() + section.slice(1)} ({data[section].length})</span>
            <button onClick={() => navigator.clipboard.writeText(data[section].join('\n'))}>
              Copy section/last updated
            </button>
          </div>
          <p>{data[section].length ? data[section] : 'Discussions with other departments will be summarized here'}</p>
        </div>
      ))}

      <button className="generate-btn" onClick={generateOversight}>Generate oversight</button>

      {!oversight && <div className="no-suggestions">No suggestions</div>}

      {oversight && (
        <div className="oversight-box">{oversight}</div>
      )}
    </div>
  );
};

export default TicketSummary;
