// CommunityFundTab: Community micro-grants, support and balance
import React from "react";

/**
 * CommunityFundTab: Feature tab for micro-grants, support and giving.
 */
// PUBLIC_INTERFACE
function CommunityFundTab({ user }) {
  // Expanded demo data and varied requests
  const fundBalance = 1235;
  const requests = [
    {
      name: "Elsa M.",
      need: "Emergency groceries for 2 kids",
      amount: 25,
      profilePic: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      name: "Jacob N.",
      need: "Help with heating bill (disconnect notice)",
      amount: 50,
      profilePic: "https://randomuser.me/api/portraits/men/17.jpg"
    },
    {
      name: "Linda W.",
      need: "Medicine co-pay after accident",
      amount: 18,
      profilePic: "https://randomuser.me/api/portraits/women/24.jpg"
    },
    {
      name: "Alan C.",
      need: "School supplies for refugee teens",
      amount: 35,
      profilePic: "https://randomuser.me/api/portraits/men/21.jpg"
    },
    {
      name: "Natalie S.",
      need: "Urgent home repair (burst pipe)",
      amount: 70,
      profilePic: "https://randomuser.me/api/portraits/women/55.jpg"
    }
  ];

  return (
    <div>
      <h2 className="llh-tab-title">Community Fund <span className="llh-tab-desc"> — Support, request, or earn credits for real needs</span></h2>
      <div className="llh-fund-balance">
        <span>Fund Total:</span>
        <span className="llh-fund-total">${fundBalance}</span>
        <button
          className="llh-form-btn"
          style={{marginLeft:8}}
          aria-label="Contribute to community fund"
          tabIndex={0}
          onClick={() => window.alert('Thank you for your contribution! [Demo Action]')}
        >
          Contribute
        </button>
      </div>
      <h3>Current Requests</h3>
      <div className="llh-cards-row">
        {requests.map((r, i) => (
          <div className="llh-fund-card" key={i}>
            <img className="llh-profile-pic" src={r.profilePic} alt="" />
            <div><b>{r.name}</b></div>
            <div className="llh-fund-need">{r.need}</div>
            <div className="llh-fund-amount">Required: ${r.amount}</div>
            <button
              className="llh-form-btn"
              aria-label={`Support request for ${r.name}`}
              tabIndex={0}
              onClick={() => window.alert(`You chose to support: ${r.name} [Demo Action]`)}
            >
              Support
            </button>
          </div>
        ))}
      </div>
      <form className="llh-fund-form" style={{marginTop:18,display:'flex',gap:'8px'}}>
        <input className="llh-fund-input" placeholder="Describe your need or proposal (e.g. urgent repair)" />
        <input className="llh-fund-input" placeholder="Amount" type="number" min={1} />
        <button
          className="llh-form-btn"
          type="button"
          aria-label="Request community funds"
          tabIndex={0}
          onClick={() => window.alert('Your request would be submitted! [Demo Action]')}
        >
          Request
        </button>
      </form>
    </div>
  );
}

export default CommunityFundTab;
