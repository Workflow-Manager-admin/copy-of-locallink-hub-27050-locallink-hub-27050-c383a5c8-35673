import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

/**
 * ToastContext & toast system for luxury app
 * - Allows any child to show a contextual message or status with premium styling.
 */
// PUBLIC_INTERFACE
const ToastContext = React.createContext({
  showToast: (message, type = "info") => {},
});

// PUBLIC_INTERFACE
function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  // PUBLIC_INTERFACE
  const showToast = useCallback((msg, toastType = "info") => {
    setMessage(msg);
    setType(toastType);
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 2700);
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`lux-toast-msg${visible ? " show" : ""}`}
        aria-live="assertive"
        role="status"
        data-type={type}
      >
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
}

// ============ UI COMPONENTS (WRAPPED FOR CONTEXT USAGE) ============

function MainNavigation({ activeTab, onSelectTab }) {
  const { showToast } = React.useContext(ToastContext);
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

  function SidebarBrandingPanel() {
    return (
      <div className="sidebar-branding-panel" aria-label="Brand Logo Panel">
        <span className="branding-logo" aria-label="Brand Emblem">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
            <circle cx="19" cy="19" r="18" stroke="#BFA14B" strokeWidth="2.3" fill="#faf8f3" />
            <path d="M19 11 L21.8 27 L19 24.5 L16.2 27 Z" fill="#921d36" />
            <circle cx="19" cy="19" r="4" fill="#BFA14B" />
          </svg>
        </span>
        <div className="branding-name">
          <span className="branding-main">LocalLink</span>
          <span className="branding-sub">Hub</span>
        </div>
        <span className="branding-flourish" aria-hidden="true"></span>
      </div>
    );
  }

  function SidebarQuickLinks() {
    return (
      <div className="sidebar-quicklinks" aria-label="Sidebar Quick Links Panel">
        <div className="quick-summary">
          <span>
            <span role="img" aria-label="Community size">👥</span>
            <strong>189</strong>
            <span className="quick-label">Neighbors</span>
          </span>
          <span>
            <span role="img" aria-label="Impact Points">🏆</span>
            <strong>4205</strong>
            <span className="quick-label">Impact</span>
          </span>
        </div>
        <div className="quick-actions">
          <button className="quicklink-btn" tabIndex={0} title="Invite Neighbor"
            onClick={() => showToast("Invite link sent to your neighbor!", "success")}>
            <span role="img" aria-label="Invite">✉️</span>
          </button>
          <button className="quicklink-btn" tabIndex={0} title="Settings"
            onClick={() => showToast("Settings will arrive in a premium update.", "info")}>
            <span role="img" aria-label="Settings">⚙️</span>
          </button>
          <button className="quicklink-btn" tabIndex={0} title="Motivation"
            onClick={() => showToast("“Luxury is a state of community & trust.”", "info")}>
            <span role="img" aria-label="Inspire">💡</span>
          </button>
        </div>
        <div className="quick-motivation" aria-label="Motivational Callout">
          <span>“Luxury is a state of community & trust.”</span>
        </div>
      </div>
    );
  }

  return (
    <nav className="sidebar-nav" aria-label="Main Navigation">
      <SidebarBrandingPanel />
      <ul role="tablist" className="sidebar-nav-list">
        {tabs.map((tab, idx) => (
          <li
            key={tab.key}
            className={
              "sidebar-nav-item" +
              (activeTab === tab.key ? " active" : "") +
              (idx === 0 ? " first" : "")
            }
            onClick={() => {
              onSelectTab(tab.key);
              showToast(`${tab.name} panel loaded`, "info");
            }}
            tabIndex={0}
            aria-label={tab.name}
            role="tab"
            aria-selected={activeTab === tab.key}
            onKeyDown={e => {
              if (["Enter", " "].includes(e.key)) {
                onSelectTab(tab.key);
                showToast(`${tab.name} panel loaded`, "info");
              }
            }}
          >
            <span className="nav-icon" aria-hidden="true">{tab.icon}</span>
            <span className="nav-label">{tab.name}</span>
          </li>
        ))}
      </ul>
      <SidebarQuickLinks />
    </nav>
  );
}

// PUBLIC_INTERFACE
function UserProfileMini() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div className="user-profile-mini" tabIndex={0}>
      <div className="avatar-skeleton" aria-label="User Avatar"></div>
      <div className="user-info">
        <span className="user-name">Alex P.</span>
        <span className="badge-row">
          <span className="badge verified" title="ID Verified">✔️</span>
          <span className="badge expert" title="Skill Badge">🎨</span>
        </span>
      </div>
      <span className="profile-trust">Neighborhood Trust: <strong>High</strong></span>
      <button
        className="user-profile-action-btn"
        style={{
          marginLeft: 12, background: "var(--lux-gold-main)",
          color: "var(--lux-maroon-dark)", border: "none", borderRadius: 12, padding: "5px 14px",
          fontFamily: "var(--lux-font-body)", fontWeight: 600, fontSize: "0.97em", cursor: "pointer"
        }}
        onClick={() => showToast("Viewing luxury profile (coming soon)...", "info")}
      >
        Profile
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function AIBannerSuggestion() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div className="ai-banner-suggestion flex-row-center info-panel-lux">
      <span className="ai-icon">🤖</span>
      <div>
        <strong>AI Suggestion:</strong>{" "}
        <span>Need eco-advice? Check the community’s latest zero-waste tips!</span>
      </div>
      <button
        className="btn-ghost"
        tabIndex={0}
        onClick={() => showToast("Displaying latest zero-waste tips!", "success")}
      >
        See Tips
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function AlertBanner() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div className="alert-banner flex-row-center info-panel-lux" aria-live="polite">
      <span className="alert-icon" role="img" aria-label="Alert">🚨</span>
      <span><strong>Crisis/Disaster:</strong> Severe weather—2 urgent safety messages nearby.</span>
      <button
        className="btn-ghost"
        tabIndex={0}
        onClick={() => showToast("Reading the latest luxury local broadcasts.", "warn")}
      >
        Read Broadcasts
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function MapView() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div className="map-view lux-box-wrap">
      <div className="map-placeholder">
        {/* Placeholder for a Map (interactive when implemented) */}
        <div className="map-legend">[Map showing your micro-community]</div>
        <div className="map-skeleton"></div>
        <button
          className="map-refresh-btn"
          onClick={() => showToast("Refreshing your luxury micro-community map…", "info")}
        >
          Refresh
        </button>
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

/**
 * Align and polish DashboardTab. Add clear, luxury toasts/inline feedback for all buttons.
 */
function DashboardTab() {
  const { showToast } = React.useContext(ToastContext);

  // Handler examples for all dashboard buttons.
  const handleVerifySkill = () =>
    showToast("Request sent for luxury skill badge verification! 👑", "info");
  const handleRSVP = () =>
    showToast("You RSVP’d with style. See you at the luxury Compost Workshop! 🥂", "success");
  const handleMoreTips = () =>
    showToast("More luxury eco tips will be revealed soon. 🌿", "info");

  return (
    <div className="dashboard luxury-dashboard">
      <section className="lux-row luxury-dashboard-row" aria-label="Quick Stats and Welcome Panel">
        <div className="lux-stat-card">
          <div className="lux-stat-icon" aria-hidden="true">🪙</div>
          <div>
            <span className="lux-stat-label">Barter Tokens</span>
            <div className="lux-stat-value">6.5</div>
          </div>
        </div>
        <div className="lux-stat-card">
          <div className="lux-stat-icon" aria-hidden="true">👥</div>
          <div>
            <span className="lux-stat-label">Your Neighbors</span>
            <div className="lux-stat-value">189</div>
          </div>
        </div>
        <div className="lux-stat-card">
          <div className="lux-stat-icon" aria-hidden="true">🏆</div>
          <div>
            <span className="lux-stat-label">Impact Score</span>
            <div className="lux-stat-value">4,205</div>
          </div>
        </div>
        <div className="lux-badge-panel">
          <span className="lux-badge verified" title="Verified Neighborhood Trust">✔️ Trusted</span>
          <span className="lux-badge elite" title="Elite Contributor">🌟 Elite</span>
        </div>
      </section>
      <section className="lux-dashboard-hero" aria-label="Profile Hero, Welcome, and Decorative Illustration">
        <div className="lux-welcome-text">
          <h2>Welcome back, <span style={{ color: "var(--lux-maroon)" }}>Alex</span>!</h2>
          <p>
            You are at the heart of <span className="lux-emphasize">Westside Oakridge</span>'s micro‑community.<br />
            <span className="lux-quote">"Luxury is quietly local."</span>
          </p>
        </div>
        <div className="lux-illustration" aria-label="Luxury Illustration">
          <svg width="128" height="72" viewBox="0 0 128 72" fill="none" style={{ opacity: 0.23 }}>
            <ellipse cx="64" cy="36" rx="60" ry="18" fill="#FFD70033" />
            <ellipse cx="39" cy="38" rx="16" ry="5" fill="#921d3622" />
            <ellipse cx="89" cy="33" rx="12" ry="7" fill="#BFA14B33" />
            <ellipse cx="64" cy="47" rx="32" ry="7" fill="#EDD9A477" />
            <path d="M24,54 Q54,36 104,56" stroke="#BFA14B" strokeWidth="2" fill="none" opacity="0.19" />
          </svg>
        </div>
      </section>
      <AIBannerSuggestion />
      <AlertBanner />
      <MapView />
      <section className="lux-info-row">
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🔖</span>
          <span className="widget-title">Verified Skill</span>
          <span className="widget-desc">Gardening</span>
          <button
            className="widget-action-btn"
            onClick={handleVerifySkill}
            aria-label="Request verification for luxury skill badge"
          >
            Verify Skill
          </button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🕒</span>
          <span className="widget-title">Next Event</span>
          <span className="widget-desc">Compost Workshop, Mon 27th</span>
          <button
            className="widget-action-btn"
            onClick={handleRSVP}
            aria-label="RSVP to Compost Workshop with luxury"
          >
            RSVP
          </button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">💡</span>
          <span className="widget-title">Eco Tip</span>
          <span className="widget-desc">Reuse containers with neighbors</span>
          <button
            className="widget-action-btn"
            onClick={handleMoreTips}
            aria-label="Get more luxury-themed eco tips"
          >
            More Tips
          </button>
        </div>
      </section>
    </div>
  );
}

// PUBLIC_INTERFACE
function MainContainer() {
  const [activeTab, setActiveTab] = useState("dashboard");

  function InfobarPanel() {
    return (
      <div className="infobar-panel" role="status">
        <span className="infobar-highlight">Connected as <b>Alex P.</b></span>
        <span className="infobar-divider"></span>
        <span className="infobar-msg">Welcome to <b>LocalLink Hub</b> — “Luxury is quietly local.”</span>
      </div>
    );
  }

  // Layout polished: Remove dead space, perfect align.
  return (
    <div className="main-container app sidebar-layout">
      <header className="lux-header" role="banner">
        <div className="lux-header-content">
          <span className="lux-header-logo">
            <svg width="30" height="30" viewBox="0 0 38 38" fill="none" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
              <circle cx="19" cy="19" r="18" stroke="#BFA14B" strokeWidth="2.3" fill="#faf8f3" />
              <path d="M19 11 L21.8 27 L19 24.5 L16.2 27 Z" fill="#921d36" />
              <circle cx="19" cy="19" r="4" fill="#BFA14B" />
            </svg>
          </span>
          <span className="lux-header-title">
            <span className="branding-main">LocalLink</span>
            <span className="branding-sub">Hub</span>
          </span>
        </div>
        <div className="lux-header-profile"><UserProfileMini /></div>
      </header>
      <InfobarPanel />
      <div className="core-layout">
        <MainNavigation activeTab={activeTab} onSelectTab={setActiveTab} />
        <main className="main-content" tabIndex={0}>
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "skillbarter" && (
            <div>
              <h2>Skill Bartering</h2>
              <p>Barter your skills with trusted neighbors. Exchange time, help, and expertise in a luxury context.</p>
              <button className="btn-ghost" onClick={() => alert("Skill Barter Matchmaking coming soon!")}>Find Match</button>
            </div>
          )}
          {activeTab === "payforward" && (
            <div>
              <h2>Pay-It-Forward</h2>
              <p>Give and receive - spread kindness through neighborly actions and community credits.</p>
            </div>
          )}
          {activeTab === "emergency" && (
            <div>
              <h2>Emergency / Crisis Support</h2>
              <p>Activate local crisis response. Request urgent help or offer aid instantly.</p>
            </div>
          )}
          {activeTab === "aidhub" && (
            <div>
              <h2>Community Aid Hub</h2>
              <p>Micro-grant and support system: Request or offer resources and credits.</p>
            </div>
          )}
          {activeTab === "resources" && (
            <div>
              <h2>Resource Re-Up</h2>
              <p>List spare items, upcycle, or request resources from neighbors.</p>
            </div>
          )}
          {activeTab === "eco" && (
            <div>
              <h2>Eco Recommendations</h2>
              <p>AI-powered zero-waste and eco-action tips tailored for your micro-community.</p>
            </div>
          )}
          {activeTab === "impact" && (
            <div>
              <h2>Impact Score</h2>
              <p>Track your trust and impact ratings within the LocalLink network.</p>
            </div>
          )}
          {activeTab === "groups" && (
            <div>
              <h2>Groups</h2>
              <p>Find and join local micro-groups for shared interests and collaboration.</p>
            </div>
          )}
          {activeTab === "events" && (
            <div>
              <h2>Events</h2>
              <p>View and RSVP to upcoming local events and workshops.</p>
            </div>
          )}
          {activeTab === "mental" && (
            <div>
              <h2>Mental Health</h2>
              <p>Access resilience resources and stress relief support circles.</p>
            </div>
          )}
          {activeTab === "wellness" && (
            <div>
              <h2>Wellness</h2>
              <p>Wellness recommendations and healthy habits from your neighbors.</p>
            </div>
          )}
          {activeTab === "knowledge" && (
            <div>
              <h2>Knowledge</h2>
              <p>Community knowledge base: share, find, and request how-to guides.</p>
            </div>
          )}
          {activeTab === "recommender" && (
            <div>
              <h2>Skill Recommender</h2>
              <p>Personalized AI skill suggestions based on your community profile.</p>
            </div>
          )}
          {activeTab === "tracker" && (
            <div>
              <h2>Impact Tracker</h2>
              <p>Detailed analytics and milestones of your impact journey.</p>
            </div>
          )}
          {activeTab === "disaster" && (
            <div>
              <h2>Disaster Tools</h2>
              <p>Local disaster toolkits: preparedness, real-time updates, and support channels.</p>
            </div>
          )}
        </main>
      </div>
      <footer className="lux-footer" role="contentinfo">
        <span className="lux-footer-content">
          &copy; {new Date().getFullYear()} LocalLink Hub — Fostering hyper-local connections
        </span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <ToastProvider>
      <MainContainer />
    </ToastProvider>
  );
}

export default App;
