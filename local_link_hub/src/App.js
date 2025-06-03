import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function MainNavigation({ activeTab, onSelectTab }) {
  const tabs = [
    { name: "Map", key: "map", icon: "🗺️" },
    { name: "Skill Exchange", key: "skills", icon: "🏅" },
    { name: "Resource Re‑Up", key: "resource", icon: "🔄" },
    { name: "Community Fund", key: "fund", icon: "💳" },
    { name: "AI Matchmaking", key: "ai", icon: "🤖" },
    { name: "Crisis Support", key: "crisis", icon: "🚨" },
  ];
  return (
    <nav className="main-nav" aria-label="Main Navigation">
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => onSelectTab(tab.key)}
            tabIndex={0}
            aria-label={tab.name}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// PUBLIC_INTERFACE
function UserProfileMini() {
  return (
    <div className="user-profile-mini">
      <div className="avatar-skeleton" aria-label="User Avatar"></div>
      <div className="user-info">
        <span className="user-name">Alex P.</span>
        <span className="badge-row">
          {/* Professional badge placeholders */}
          <span className="badge verified" title="ID Verified">✔️</span>
          <span className="badge expert" title="Skill Badge">🎨</span>
        </span>
      </div>
      <span className="profile-trust">Neighborhood Trust: <strong>High</strong></span>
    </div>
  );
}

// PUBLIC_INTERFACE
function AIBannerSuggestion() {
  return (
    <div className="ai-banner-suggestion">
      <span className="ai-icon">🤖</span>
      <div>
        <strong>AI Suggestion:</strong>{" "}
        <span>Need a ladder swap? Sarah (2 blocks away) has one for lending!</span>
      </div>
      <button className="btn-ghost" tabIndex={0}>View Detail</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function AlertBanner() {
  // Placeholder: Show if crisis mode is active.
  return (
    <div className="alert-banner" aria-live="polite">
      <span className="alert-icon" role="img" aria-label="Alert">🚨</span>
      <span><strong>Crisis/Disaster Mode Active:</strong> Local storm—4 urgent requests nearby.</span>
      <button className="btn-ghost" tabIndex={0}>View Requests</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function MapView() {
  return (
    <div className="map-view">
      <div className="map-placeholder">
        {/* Placeholder for a Map (interactive when implemented) */}
        <div className="map-legend">[Map showing 2km micro-community radius]</div>
        <div className="map-skeleton"></div>
      </div>
      <div className="micro-community-info">
        <h3>Your Micro‑Community</h3>
        <p>You're in the <strong>Westside Oakridge</strong> micro‑community (1.4km radius, 189 neighbors).</p>
        <p>
          <span className="map-pin-emoji" role="img" aria-label="Pin">📍</span>
          Location: Oakridge Park, 0.3 km from you
        </p>
        {/* Place for community metrics/stats */}
        <div className="community-metrics">
          <span>Trust Level: <strong>4.8</strong>/5</span>
          <span>Active Exchanges: <strong>32</strong></span>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function SkillExchangeTab() {
  return (
    <div className="tab-content">
      <h2>Skill Exchange</h2>
      <p>
        Browse neighbors' skills or offer your own. Earn badges through peer verifications or upload certificates!
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Skill cards & filters come here.</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ResourceReupTab() {
  return (
    <div className="tab-content">
      <h2>Resource Re‑Up</h2>
      <p>Give away or exchange items like books, tools, produce, etc.</p>
      <div className="placeholder-box">
        <div className="placeholder-label">Resource list/feed comes here.</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function CommunityFundTab() {
  return (
    <div className="tab-content">
      <h2>Community Fund</h2>
      <p>
        Earn or contribute credits and support micro‑grants for neighbors in need.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Fund interface & grant requests here.</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function AIMatchmakingTab() {
  return (
    <div className="tab-content">
      <h2>AI Matchmaking</h2>
      <p>
        Smart suggestions for exchanges and matches powered by local needs & AI!
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Suggested matches and requests here.</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function CrisisSupportTab() {
  return (
    <div className="tab-content">
      <h2>Crisis/Disaster Support</h2>
      <p>
        Rapidly connect with verified neighbors for urgent help in emergencies.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Urgent help requests/offerings listed here.</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function MainContainer() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="main-container app">
      <header className="navbar">
        <div className="navbar-left">
          <span className="logo-symbol" aria-label="LocalLink Hub Logo">🧭</span>
          <span className="app-title" style={{ letterSpacing: 2 }}>LocalLink Hub</span>
        </div>
        <UserProfileMini />
      </header>
      <div className="spacer-navbar" />
      <MainNavigation activeTab={activeTab} onSelectTab={setActiveTab} />
      <main className="main-content" tabIndex={0}>
        <div className="dashboard">
          <AIBannerSuggestion />
          <AlertBanner />
          {activeTab === "map" && <MapView />}
          {activeTab === "skills" && <SkillExchangeTab />}
          {activeTab === "resource" && <ResourceReupTab />}
          {activeTab === "fund" && <CommunityFundTab />}
          {activeTab === "ai" && <AIMatchmakingTab />}
          {activeTab === "crisis" && <CrisisSupportTab />}
        </div>
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} LocalLink Hub – Fostering hyper-local connections
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return <MainContainer />;
}

export default App;
