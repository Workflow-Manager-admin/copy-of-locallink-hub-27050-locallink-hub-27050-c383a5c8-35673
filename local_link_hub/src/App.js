import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function MainNavigation({ activeTab, onSelectTab }) {
  const tabs = [
    { name: "Dashboard", key: "dashboard", icon: "🏠" },
    { name: "Skill Bartering", key: "skillbarter", icon: "⏳" },
    { name: "Pay-It-Forward", key: "payforward", icon: "🔗" },
    { name: "Emergency", key: "emergency", icon: "📢" },
    { name: "Aid Hub", key: "aidhub", icon: "🤝" },
    { name: "Resource Tracker", key: "resources", icon: "🔄" },
    { name: "Eco Recs", key: "eco", icon: "🌱" },
    { name: "Impact Score", key: "impact", icon: "🏆" },
    { name: "Groups", key: "groups", icon: "👥" },
    { name: "Events", key: "events", icon: "📅" },
    { name: "Mental Health", key: "mental", icon: "🧠" },
    { name: "Wellness", key: "wellness", icon: "💚" },
    { name: "Knowledge", key: "knowledge", icon: "📚" },
    { name: "Skill Recommender", key: "recommender", icon: "🤖" },
    { name: "Impact Tracker", key: "tracker", icon: "📊" },
    { name: "Disaster Tools", key: "disaster", icon: "🛡️" },
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
        <span>Need eco-advice? Check the community’s latest zero-waste tips!</span>
      </div>
      <button className="btn-ghost" tabIndex={0}>See Tips</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function AlertBanner() {
  // Crisis broadcast placeholder
  return (
    <div className="alert-banner" aria-live="polite">
      <span className="alert-icon" role="img" aria-label="Alert">🚨</span>
      <span><strong>Crisis/Disaster:</strong> Severe weather—2 urgent safety messages nearby.</span>
      <button className="btn-ghost" tabIndex={0}>Read Broadcasts</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function DashboardTab() {
  return (
    <div className="dashboard">
      <AIBannerSuggestion />
      <AlertBanner />
      <MapView />
    </div>
  );
}

// PUBLIC_INTERFACE
function MapView() {
  return (
    <div className="map-view">
      <div className="map-placeholder">
        {/* Placeholder for a Map (interactive when implemented) */}
        <div className="map-legend">[Map showing your micro-community]</div>
        <div className="map-skeleton"></div>
      </div>
      <div className="micro-community-info">
        <h3>Your Micro‑Community</h3>
        <p>
          You're in <strong>Westside Oakridge</strong> (<strong>1.4km</strong> radius, 189 neighbors).
        </p>
        <p>
          <span className="map-pin-emoji" role="img" aria-label="Pin">📍</span>
          Location: Oakridge Park, 0.3 km from you
        </p>
        <div className="community-metrics">
          <span>Trust Level: <strong>4.8</strong>/5</span>
          <span>Exchanges: <strong>32</strong></span>
          <span>Impact Score: <strong>4205</strong></span>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function SkillBarterTab() {
  return (
    <div className="tab-content">
      <h2>Skill Bartering Tokens</h2>
      <p>
        Trade time or credits—exchange your skills for hours or community barter tokens. Track your balance and history.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Barter wallet, transaction feed, offer/earn forms (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function PayItForwardTab() {
  return (
    <div className="tab-content">
      <h2>Pay-It-Forward Chain</h2>
      <p>
        Visualize the generosity chain—see who’s helped whom and inspire more good deeds in the community.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Chain visualization, gratitude stories (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function EmergencyTab() {
  return (
    <div className="tab-content">
      <h2>Emergency Broadcasts</h2>
      <p>
        Receive urgent messages (within your geofence) from neighbors or authorities. Broadcast requests for help fast.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Broadcast feed, create/view requests interface (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function AidHubTab() {
  return (
    <div className="tab-content">
      <h2>Local Aid Coordination Hub</h2>
      <p>
        Connect with NGOs, see volunteer needs, and coordinate local efforts. Post or find aid requests.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">NGO/Org postings, volunteer signups, event list (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ResourceTrackerTab() {
  return (
    <div className="tab-content">
      <h2>Resource Lifecycle Tracker</h2>
      <p>
        Track the lifecycle of shared items—reused, donated, recycled. Help reduce local waste.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Item histories, recycling leaderboards, stats (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function EcoRecsTab() {
  return (
    <div className="tab-content">
      <h2>Eco-Friendly Recommendations</h2>
      <p>
        Suggestions for making posts, exchanges, and community actions greener and more sustainable.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Green tips, eco-impact cards, actionable advice (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ImpactScoreTab() {
  return (
    <div className="tab-content">
      <h2>Community Impact Score</h2>
      <p>
        See your personal, group, and neighborhood stats: exchanges, hours, eco-points, and leaderboard ranking.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Score dashboard, badges, leaderboard (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function GroupsTab() {
  return (
    <div className="tab-content">
      <h2>Skill Circles & Interest Groups</h2>
      <p>
        Join, manage, or found groups: skill teams, eco clubs, volunteer crews, and more.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Group directory, join/leave, chat (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function EventsTab() {
  return (
    <div className="tab-content">
      <h2>Local Event Calendar</h2>
      <p>
        View and RSVP for community events, workshops, meetups, and drives.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Event list, calendar, RSVP forms (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function MentalHealthTab() {
  return (
    <div className="tab-content">
      <h2>Mental Health First-Aid Connect</h2>
      <p>
        Confidentially find volunteers or professionals for mental health support.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Help directory, opt-in system, safety resources (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function WellnessTab() {
  return (
    <div className="tab-content">
      <h2>Wellness & Check-In</h2>
      <p>
        Daily/weekly prompts for self check-in, mood tracking, peer wellness nudges.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Mood tracker, check-in log, prompt generator (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function KnowledgeArchiveTab() {
  return (
    <div className="tab-content">
      <h2>Local Knowledge Archive</h2>
      <p>
        Browse tips, tutorials, hacks, and Q&A. Search and add local knowledge.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Search/browse UI for knowledge cards, post Q&A (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function SkillRecommenderTab() {
  return (
    <div className="tab-content">
      <h2>AI-Powered Skill Recommender</h2>
      <p>
        Get personalized skill recommendations based on your interests, needs, and neighborhood gaps.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Recommended skill cards, AI explainer (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function TrackerTab() {
  return (
    <div className="tab-content">
      <h2>Impact Tracker Dashboard</h2>
      <p>
        Visual stats: your skill hours, eco impact, volunteering, and community milestones.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Impact charts, milestones visualization (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function DisasterToolsTab() {
  return (
    <div className="tab-content">
      <h2>Disaster Readiness Tools</h2>
      <p>
        Quickly prep for emergencies—access checklists, shelter maps, and volunteer dashboards.
      </p>
      <div className="placeholder-box">
        <div className="placeholder-label">Guide/checklist cards, live shelter map (placeholder).</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function MainContainer() {
  const [activeTab, setActiveTab] = useState("dashboard");

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
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "skillbarter" && <SkillBarterTab />}
        {activeTab === "payforward" && <PayItForwardTab />}
        {activeTab === "emergency" && <EmergencyTab />}
        {activeTab === "aidhub" && <AidHubTab />}
        {activeTab === "resources" && <ResourceTrackerTab />}
        {activeTab === "eco" && <EcoRecsTab />}
        {activeTab === "impact" && <ImpactScoreTab />}
        {activeTab === "groups" && <GroupsTab />}
        {activeTab === "events" && <EventsTab />}
        {activeTab === "mental" && <MentalHealthTab />}
        {activeTab === "wellness" && <WellnessTab />}
        {activeTab === "knowledge" && <KnowledgeArchiveTab />}
        {activeTab === "recommender" && <SkillRecommenderTab />}
        {activeTab === "tracker" && <TrackerTab />}
        {activeTab === "disaster" && <DisasterToolsTab />}
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
