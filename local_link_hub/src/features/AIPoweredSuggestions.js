// AIPoweredSuggestions: AI-driven match tips and suggestions
import React from "react";

/**
 * AIPoweredSuggestions: Sidebar AI-driven skill/resource match suggestions.
 */
// PUBLIC_INTERFACE
function AIPoweredSuggestions({ user }) {
  // Expanded, varied AI suggestions for demonstration
  const suggestions = [
    "You matched 95% with Colin J. (Dog Walking ↔ Gardening)",
    "There are 3 new local requests for 'Bike Repair' skills.",
    "Top suggestion: Reach out to Priya Patel for shared childcare swaps.",
    "Offer: Your 'Tool Lending' badge has 4 neighbor interest pings.",
    "Safety Alert: 2 micro-community members marked 'in need' in Crisis tab.",
    "AI Match: Alison W.'s Home Organizing service fits your requests."
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
