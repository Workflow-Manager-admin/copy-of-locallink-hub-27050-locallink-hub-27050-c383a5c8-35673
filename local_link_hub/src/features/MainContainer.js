import React, { useState } from "react";
import "./MainContainer.css";
import MapDashboard from "./MapDashboard";
import SkillsExchangeTab from "./SkillsExchangeTab";
import ResourceReUpTab from "./ResourceReUpTab";
import CommunityFundTab from "./CommunityFundTab";
import CrisisSupportTab from "./CrisisSupportTab";
import AIPoweredSuggestions from "./AIPoweredSuggestions";

/**
 * MainContainer: The top-level hub container for LocalLink.
 * Handles tab navigation and renders the map and feature panels.
 */
// PUBLIC_INTERFACE
function MainContainer() {
  const [activeTab, setActiveTab] = useState("skills");

  // simulated user context/profile (with more badges for demo)
  const user = {
    name: "Alex Rivera",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    microCommunity: "Greenfield North",
    verified: true,
    trustScore: 98,
    badges: [
      { skill: "Bike Repair", verified: true },
      { skill: "Gardening", verified: false },
      { skill: "First Aid", verified: true },
      { skill: "AI Facilitation", verified: false }
    ]
  };

  // Alerts and AI suggestions (in real app, fetched from API)
  const urgentAlerts = [
    {
      type: "Crisis",
      message: "Power outage reported in your area. See Crisis Support tab for help.",
      priority: "high"
    }
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "skills":
        return <SkillsExchangeTab user={user} />;
      case "resources":
        return <ResourceReUpTab user={user} />;
      case "fund":
        return <CommunityFundTab user={user} />;
      case "crisis":
        return <CrisisSupportTab user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="llh-main-container">
      <nav className="llh-navbar">
        <div className="llh-logo">
          <span className="llh-logo-symbol">●</span> LocalLink Hub
        </div>
        <div className="llh-profile-summary">
          <img className="llh-profile-pic" src={user.profilePic} alt="Profile"/>
          <span className="llh-profile-name">{user.name}</span>
          {user.verified && (
            <span className="llh-verified" title="Verified User">
              <svg height="16" width="16" viewBox="0 0 24 24" fill="#8f0a0a"><circle cx="12" cy="12" r="10" fill="#262626"/><path d="M7 13l3 3 7-7" stroke="#b1b483" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
              <span className="llh-verified-badge">Verified</span>
            </span>
          )}
        </div>
      </nav>

      <main className="llh-content">
        <aside className="llh-mappanel">
          <MapDashboard microCommunity={user.microCommunity} />
          <AIPoweredSuggestions user={user} />
          {urgentAlerts.map((alert, i) => (
            <div key={i} className={`llh-alert llh-alert-${alert.priority}`}>
              <span className="llh-alert-icon">!</span>
              <span>{alert.message}</span>
            </div>
          ))}
        </aside>
        <section className="llh-tabs-section">
          <div className="llh-tabs">
            <button
              className={activeTab === "skills" ? "llh-tab active" : "llh-tab"}
              onClick={() => setActiveTab("skills")}
            >Skill Exchange</button>
            <button
              className={activeTab === "resources" ? "llh-tab active" : "llh-tab"}
              onClick={() => setActiveTab("resources")}
            >Resource Re-Up</button>
            <button
              className={activeTab === "fund" ? "llh-tab active" : "llh-tab"}
              onClick={() => setActiveTab("fund")}
            >Community Fund</button>
            <button
              className={activeTab === "crisis" ? "llh-tab active" : "llh-tab"}
              onClick={() => setActiveTab("crisis")}
            >Crisis Support</button>
          </div>
          <div className="llh-tab-content">
            {renderTab()}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainContainer;
