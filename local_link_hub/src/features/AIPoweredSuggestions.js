// AIPoweredSuggestions: AI-driven match tips and suggestions
import React from "react";

/**
 * AIPoweredSuggestions: Sidebar AI-driven skill/resource match suggestions.
 */
// PUBLIC_INTERFACE
function AIPoweredSuggestions({ user }) {
  // Simulated AI suggestions
  const suggestions = [
    "You matched 95% with Colin J. (Dog Walking ↔ Gardening)",
    "There are 3 new local requests for 'Bike Repair' skills."
  ];

  return (
    <div className="llh-ai-suggestions">
      <div className="llh-ai-header">
        <span role="img" aria-label="ai">🤖</span> AI Suggestions
      </div>
      <ul className="llh-ai-list">
        {suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

export default AIPoweredSuggestions;
