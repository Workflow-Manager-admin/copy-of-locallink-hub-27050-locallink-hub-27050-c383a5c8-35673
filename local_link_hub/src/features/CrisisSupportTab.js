// CrisisSupportTab: Overlay for urgent help - shelter, first aid, support
import React from "react";

/**
 * CrisisSupportTab: Feature panel for rapid requests/offers in emergencies.
 */
// PUBLIC_INTERFACE
function CrisisSupportTab({ user }) {
  // Simulated urgent requests/offers
  const requests = [
    {
      type: "Need",
      description: "Medical first aid at Pine/Park St.",
      owner: "D. Green",
      urgent: true
    },
    {
      type: "Offer",
      description: "Spare generator for charging phones",
      owner: "Monica O.",
      urgent: false
    }
  ];

  return (
    <div>
      <h2 className="llh-tab-title llh-crisis-h2">
        Crisis/Disaster Support <span className="llh-tab-desc">— Immediate neighborhood help in emergencies</span>
      </h2>
      <div className="llh-alert llh-alert-high" style={{marginBottom:12}}>
        <span className="llh-alert-icon">!</span>
        Platform is in Crisis Mode. Rapid request/offer available.
      </div>
      <form className="llh-crisis-form" style={{display:'flex',gap:'8px',marginBottom:16}}>
        <input className="llh-crisis-input" placeholder="Request help or offer aid (shelter, supplies, etc)" />
        <button className="llh-form-btn" type="button">Send</button>
      </form>
      <h3>Active Crisis Requests/Offers</h3>
      <div className="llh-cards-row">
        {requests.map((req, idx) => (
          <div className={"llh-crisis-card" + (req.urgent ? " llh-crisis-urgent" : "")} key={idx}>
            <div className="llh-crisis-type">{req.type}</div>
            <div className="llh-crisis-desc">{req.description}</div>
            <div className="llh-crisis-owner">by {req.owner}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:18, fontSize:'0.93em', color:'var(--llh-text-muted)'}}>
        <b>Note:</b> Only verified neighbors' requests will appear here.
      </div>
    </div>
  );
}

export default CrisisSupportTab;
