import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

/*
 * Luxury Toast System Context for full-app status messages:
 * Allows any component to invoke luxury-styled floating toasts for rich feedback.
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

/* === Main Sidebar Navigation: Luxury Style, Accessible === */
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

/**
 * Luxury banner for AI suggestion, crisis, etc.
 */
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

/* Map Display Widget for Dashboard */
function MapView() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div className="map-view lux-box-wrap">
      <div className="map-placeholder">
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
 * DASHBOARD TAB - Main Widget Row (untouched)
 * See further down for other tab mockups.
 */
function DashboardTab() {
  const { showToast } = React.useContext(ToastContext);

  // Dashboard interactions
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

/* === Helper Components for Tab Demos/Mockups: These showcase luxury cards/listings/widgets for each tab. === */

// Resource Re-Up Tab Mockup Cards: Luxury trading/upcycling mini-listings
function ResourceReupMockups() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div>
      <h2>Resource Re‑Up</h2>
      <p>List spare items, upcycle, or request resources from neighbors. All exchanges are trust-verified—for a circular, luxury economy.</p>
      <div className="lux-info-row" style={{flexWrap: "wrap", gap: "28px"}}>
        {/* Rich mockup card #1 */}
        <div className="lux-mini-widget" style={{minWidth: 230}}>
          <span className="widget-icon" aria-hidden="true">📚</span>
          <span className="widget-title">Antique Cookbooks (Set of 4)</span>
          <span className="widget-desc">Like new — available for swap or gift.</span>
          <span className="lux-badge" style={{margin: "8px 0 3px 0"}}>Collection</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Request sent for cookbook exchange!", "success")}>Request</button>
        </div>
        {/* Rich mockup card #2 */}
        <div className="lux-mini-widget" style={{minWidth: 230}}>
          <span className="widget-icon" aria-hidden="true">🧰</span>
          <span className="widget-title">Brass Gardening Tools</span>
          <span className="widget-desc">Vintage luxury, pick up in Oakridge.</span>
          <span className="lux-badge elite" style={{margin: "8px 0 3px 0"}}>Elite Member's Item</span>
          <button className="widget-action-btn"
            onClick={() => showToast("You're set to pick up: Brass Gardening Tools", "success")}>Arrange</button>
        </div>
        {/* Rich mockup card #3 */}
        <div className="lux-mini-widget" style={{minWidth: 230}}>
          <span className="widget-icon" aria-hidden="true">🍎</span>
          <span className="widget-title">Organic Fuji Apples, 12ct</span>
          <span className="widget-desc">Locally grown, available this Saturday.</span>
          <span className="lux-badge verified" style={{margin: "8px 0 3px 0"}}>Fresh</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Apple box reserved! Enjoy your local bounty.", "success")}>Reserve</button>
        </div>
        {/* Rich mockup card #4 */}
        <div className="lux-mini-widget" style={{minWidth: 230}}>
          <span className="widget-icon" aria-hidden="true">🪑</span>
          <span className="widget-title">Designer Patio Chair</span>
          <span className="widget-desc">Lightly used, pick up after 4pm daily.</span>
          <span className="lux-badge" style={{margin: "8px 0"}}>Upcycle</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Pickup arranged for Designer Patio Chair.", "success")}>Pickup</button>
        </div>
      </div>
    </div>
  );
}

// Skill Badges Tab: 3 luxury-styled badges with peer-verify option
function SkillBadgesMockups() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div>
      <h2>Skill Badges</h2>
      <p>Earn luxury skill badges via community or certificate upload. Skills are trust-verified for hyperlocal expertise.</p>
      <div className="luxury-dashboard-row" style={{gap: "27px", flexWrap: "wrap"}}>
        {/* Badge Card 1 */}
        <div className="lux-mini-widget" style={{minWidth:180}}>
          <span className="widget-icon" aria-hidden="true">🌿</span>
          <span className="widget-title">Gardening Guru</span>
          <span className="widget-desc">Peer-verified, active volunteer</span>
          <span className="lux-badge verified">Verified</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Badge peer verification requested!", "info")}>Get Verified</button>
        </div>
        {/* Badge Card 2 */}
        <div className="lux-mini-widget" style={{minWidth:180}}>
          <span className="widget-icon" aria-hidden="true">🎹</span>
          <span className="widget-title">Music Instruction</span>
          <span className="widget-desc">Piano & voice, 8 years</span>
          <span className="lux-badge elite">Elite</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Certificate upload required for badge.", "info")}>Upload Certificate</button>
        </div>
        {/* Badge Card 3 */}
        <div className="lux-mini-widget" style={{minWidth:180}}>
          <span className="widget-icon" aria-hidden="true">👩‍🍳</span>
          <span className="widget-title">Luxury Baking</span>
          <span className="widget-desc">Shared masterclasses</span>
          <span className="lux-badge">Community Skill</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Baking: peer nomination sent!", "success")}>Nominate</button>
        </div>
        {/* Badge Card 4 */}
        <div className="lux-mini-widget" style={{minWidth:180}}>
          <span className="widget-icon" aria-hidden="true">🎨</span>
          <span className="widget-title">Fine Arts</span>
          <span className="widget-desc">Oil, watercolor, sculpture</span>
          <span className="lux-badge" style={{background: "var(--lux-gold-main)", color: "var(--lux-onyx)", borderColor: "var(--lux-maroon)"}}>Verified</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Fine Arts badge: verifying documents...", "info")}>Verify Docs</button>
        </div>
      </div>
    </div>
  );
}

// Crisis Overlay Tab: 3-4 urgent/crisis widgets, styled for urgency but retaining luxury cues
function CrisisOverlayMockups() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div>
      <h2>Crisis / Disaster Support</h2>
      <p>Local emergency? Instantly request or offer critical help to neighbors—safely and confidentially. Only available to trust-verified users.</p>
      <div className="lux-info-row" style={{gap: "26px", flexWrap: "wrap"}}>
        <div className="lux-mini-widget" style={{minWidth:230, borderColor:"#CA5240"}}>
          <span className="widget-icon" aria-hidden="true" style={{color:"#CA5240"}}>🚨</span>
          <span className="widget-title">Urgent Shelter Needed</span>
          <span className="widget-desc">3 requests nearby</span>
          <button className="widget-action-btn"
            style={{background: "#CA5240", color:"#fff"}}
            onClick={() => showToast("Volunteer info sent!", "success")}>Offer Help</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:230}}>
          <span className="widget-icon" aria-hidden="true">🩺</span>
          <span className="widget-title">First Aid Offered</span>
          <span className="widget-desc">On-call, 750m from you</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Request sent for first aid!", "success")}>Request Aid</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:230}}>
          <span className="widget-icon" aria-hidden="true">🍲</span>
          <span className="widget-title">Hot Meals Provided</span>
          <span className="widget-desc">Community kitchen (4 spots left)</span>
          <button className="widget-action-btn"
            onClick={() => showToast("You reserved a hot meal.", "success")}>Reserve Spot</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:230}}>
          <span className="widget-icon" aria-hidden="true">🧃</span>
          <span className="widget-title">Water Distribution</span>
          <span className="widget-desc">Next delivery: 1:30pm</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Pickup reminder set for water.", "info")}>Remind Me</button>
        </div>
      </div>
      <AlertBanner />
    </div>
  );
}

// Pay-It-Forward Tab functional component
function PayItForwardTab() {
  const { showToast } = React.useContext(ToastContext);
  const handleSignUp = () =>
    showToast("Thank you for bringing luxury care to a neighbor's table! 🍽️", "success");
  const handleFlowerRequest = () =>
    showToast("A luxury bouquet will brighten someone's day. 💐", "info");
  const handleCarpoolJoin = () =>
    showToast("Carpool slot secured! Ride in comfort with your community. 🚗", "success");
  return (
    <div>
      <h2>Pay-It-Forward</h2>
      <p>Give and receive - spread kindness through neighborly actions and community credits.</p>
      <div className="lux-info-row" style={{gap: "24px", flexWrap:"wrap"}}>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🥘</span>
          <span className="widget-title">Meal for a Neighbor</span>
          <span className="widget-desc">Give: Sign up to bring dinner tonight</span>
          <button className="widget-action-btn" onClick={handleSignUp}>Sign Up</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">💐</span>
          <span className="widget-title">Free Flower Delivery</span>
          <span className="widget-desc">Request or surprise a friend</span>
          <button className="widget-action-btn" onClick={handleFlowerRequest}>Request</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🚗</span>
          <span className="widget-title">Carpool Slot</span>
          <span className="widget-desc">Oakridge to Downtown</span>
          <button className="widget-action-btn" onClick={handleCarpoolJoin}>Join</button>
        </div>
      </div>
    </div>
  );
}

// Groups Tab functional component
function GroupsTab() {
  const { showToast } = React.useContext(ToastContext);
  const handleJoinHistory = () =>
    showToast("Welcome to History Buffs! The story is richer together. 🏛️", "success");
  const handleLearnArts = () =>
    showToast("Arts Collective: Details coming soon. Celebrate creativity! 🎭", "info");
  const handleJoinCycling = () =>
    showToast("Pedaling into luxury adventures. Cycling Crew joined! 🚴‍♂️", "success");
  return (
    <div>
      <h2>Groups</h2>
      <p>Find and join local micro-groups for shared interests and collaboration.</p>
      <div className="lux-info-row" style={{gap:"26px",flexWrap:"wrap"}}>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🏛️</span>
          <span className="widget-title">History Buffs</span>
          <span className="widget-desc">Weekly meetups, Fridays</span>
          <button className="widget-action-btn" onClick={handleJoinHistory}>Join</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🎭</span>
          <span className="widget-title">Arts Collective</span>
          <span className="widget-desc">Pop-up exhibitions</span>
          <button className="widget-action-btn" onClick={handleLearnArts}>Learn More</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🚴‍♂️</span>
          <span className="widget-title">Cycling Crew</span>
          <span className="widget-desc">Sat rides, all ages welcome</span>
          <button className="widget-action-btn" onClick={handleJoinCycling}>Join</button>
        </div>
      </div>
    </div>
  );
}

// Knowledge Tab functional component
function KnowledgeTab() {
  const { showToast } = React.useContext(ToastContext);
  const handleReadCompost = () =>
    showToast("Luxury compost guide unlocked. Your garden will thank you! 🌱", "info");
  const handleReadBattery = () =>
    showToast("Premium DIY: Battery backup blueprints ready. Stay powered! 🔋", "success");
  const handleReadPlanters = () =>
    showToast("Expert guide opened: Grow pollinator planters in luxury style. 🐝", "info");
  return (
    <div>
      <h2>Community Knowledge</h2>
      <p>Share, find, and request local how-to guides.</p>
      <div className="lux-info-row" style={{gap:"22px",flexWrap:"wrap"}}>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">📄</span>
          <span className="widget-title">How-to: Compost Properly</span>
          <span className="widget-desc">Step-by-step, local soil types</span>
          <button className="widget-action-btn" onClick={handleReadCompost}>Read</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🔌</span>
          <span className="widget-title">DIY: Home Battery Backup</span>
          <span className="widget-desc">Crowdsourced, local supplies</span>
          <button className="widget-action-btn" onClick={handleReadBattery}>Read</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🌱</span>
          <span className="widget-title">Urban Pollinator Planters</span>
          <span className="widget-desc">Guide by neighbor expert Alicia</span>
          <button className="widget-action-btn" onClick={handleReadPlanters}>Read</button>
        </div>
      </div>
    </div>
  );
}

// Skill Recommender Tab functional component
function SkillRecommenderTab() {
  const { showToast } = React.useContext(ToastContext);
  const handleViewBaking = () =>
    showToast("Luxury baking courses previewed — let them eat cake! 🧑‍🍳", "success");
  const handleStartGardening = () =>
    showToast("Green thumb level-up started. Urban Gardening course initiated! 🪴", "success");
  const handleConnectMusic = () =>
    showToast("Music Collaboration: Your peers are ready to play! 🎼", "info");
  return (
    <div>
      <h2>Skill Recommender</h2>
      <p>Personalized AI skill suggestions based on your community profile.</p>
      <div className="lux-info-row" style={{gap:"22px",flexWrap:"wrap"}}>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🧑‍🍳</span>
          <span className="widget-title">Recommended: Baking Courses</span>
          <span className="widget-desc">High local demand</span>
          <button className="widget-action-btn" onClick={handleViewBaking}>View</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🪴</span>
          <span className="widget-title">Recommended: Urban Gardening</span>
          <span className="widget-desc">Matches your badge</span>
          <button className="widget-action-btn" onClick={handleStartGardening}>Start</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🎼</span>
          <span className="widget-title">Music Collaboration</span>
          <span className="widget-desc">Peers nearby</span>
          <button className="widget-action-btn" onClick={handleConnectMusic}>Connect</button>
        </div>
      </div>
    </div>
  );
}

// Community Fund Tab: Micro-Grant cards, rich styles
function CommunityFundMockups() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div>
      <h2>Community Aid Hub (Micro‑Grants)</h2>
      <p>Request or provide micro-grants/credits — neighbors can anonymously contribute, or you can see who helped for greater trust.</p>
      <div className="lux-info-row" style={{gap: "28px", flexWrap: "wrap"}}>
        <div className="lux-mini-widget" style={{minWidth:260}}>
          <span className="widget-icon" aria-hidden="true" style={{color:"var(--lux-gold-main)"}}>💵</span>
          <span className="widget-title">Aid Request: School Supplies</span>
          <span className="widget-desc">Needed: $32 for Emma (Grade 3)</span>
          <span className="lux-badge verified">Verified</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Thanks for your contribution!", "success")}>Contribute</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:260}}>
          <span className="widget-icon" aria-hidden="true" style={{color:"var(--lux-maroon-dark)"}}>🎸</span>
          <span className="widget-title">Support: Youth Music Lessons</span>
          <span className="widget-desc">Goal: $100 • Progress: $82</span>
          <span className="lux-badge">Open</span>
          <button className="widget-action-btn"
            onClick={() => showToast("You pledged for music lessons!", "success")}>Pledge</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:260}}>
          <span className="widget-icon" aria-hidden="true" style={{color:"var(--lux-gold-deep)"}}>🧑‍🦯</span>
          <span className="widget-title">Mobility Aid for Senior</span>
          <span className="widget-desc">Requested by: Community Nurse (24h left)</span>
          <span className="lux-badge" style={{background:"var(--lux-maroon-dark)", color:"var(--lux-gold-main)"}}>Urgent</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Contact info provided for delivery coordination.", "info")}>Arrange Delivery</button>
        </div>
      </div>
    </div>
  );
}

// Impact Score / Tracker Tab: Demo of luxury badges & stats
function ImpactTrackerMockups() {
  return (
    <div>
      <h2>Impact Score & Community Tracker</h2>
      <p>Track your total impact, badges, and milestones within the hyper-local network.</p>
      <div className="luxury-dashboard-row" style={{flexWrap:'wrap', gap:'28px'}}>
        <div className="lux-mini-widget" style={{minWidth:200}}>
          <span className="widget-icon" aria-hidden="true">🌟</span>
          <span className="widget-title">Milestone: 4000+ Impact</span>
          <span className="widget-desc">Community Leader</span>
          <span className="lux-badge elite" style={{marginTop:5}}>Elite</span>
        </div>
        <div className="lux-mini-widget" style={{minWidth:200}}>
          <span className="widget-icon" aria-hidden="true">🤩</span>
          <span className="widget-title">Recent: Most Trusted</span>
          <span className="widget-desc">Avg Trust Score: 4.8/5</span>
          <span className="lux-badge verified" style={{marginTop:5}}>Verified</span>
        </div>
        <div className="lux-mini-widget" style={{minWidth:200}}>
          <span className="widget-icon" aria-hidden="true">🌱</span>
          <span className="widget-title">Eco Actions: Top 1%</span>
          <span className="widget-desc">30+ eco-swaps, 15 posts</span>
          <span className="lux-badge" style={{marginTop:5}}>Eco Leader</span>
        </div>
      </div>
    </div>
  );
}

// Eco Recommendations: Premium AI eco-tips cards
function EcoRecsMockups() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div>
      <h2>Eco Recommendations</h2>
      <p>AI-powered zero-waste and eco-action tips tailored for your micro-community.</p>
      <div className="lux-info-row" style={{gap: "26px", flexWrap:"wrap"}}>
        <div className="lux-mini-widget" style={{minWidth:210}}>
          <span className="widget-icon" aria-hidden="true">♻️</span>
          <span className="widget-title">Upcycle Tip</span>
          <span className="widget-desc">Use glass jars as luxury pantry storage.</span>
          <button className="widget-action-btn"
            onClick={() => showToast("More upcycle tips on the way!", "info")}>See More</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:210}}>
          <span className="widget-icon" aria-hidden="true">🌳</span>
          <span className="widget-title">Eco Garden</span>
          <span className="widget-desc">Plant native maroon camellias for beauty + habitat.</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Garden AI tips delivered!", "success")}>Get Tips</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:210}}>
          <span className="widget-icon" aria-hidden="true">🪴</span>
          <span className="widget-title">Houseplant Swap</span>
          <span className="widget-desc">Join swap event, 9am Sat, Plaza Pavilion</span>
          <button className="widget-action-btn"
            onClick={() => showToast("See events calendar for more.", "info")}>Event Info</button>
        </div>
      </div>
    </div>
  );
}

// Wellness: Showcase luxury wellness cards (mind, body, habits)
function WellnessMockups() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div>
      <h2>Wellness</h2>
      <p>Wellness recommendations and healthy habits from your neighbors.</p>
      <div className="lux-info-row" style={{gap: "29px", flexWrap:"wrap"}}>
        <div className="lux-mini-widget" style={{minWidth:205}}>
          <span className="widget-icon" aria-hidden="true">🧘‍♂️</span>
          <span className="widget-title">Sunrise Yoga</span>
          <span className="widget-desc">Oakridge Park, Sat 7am</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Yoga RSVP sent!", "success")}>RSVP</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:205}}>
          <span className="widget-icon" aria-hidden="true">🥗</span>
          <span className="widget-title">Healthy Recipe: Quinoa Bowl</span>
          <span className="widget-desc">Shared by neighbor Julia</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Recipe opened in luxury mode.", "info")}>Open</button>
        </div>
        <div className="lux-mini-widget" style={{minWidth:205}}>
          <span className="widget-icon" aria-hidden="true">😌</span>
          <span className="widget-title">Mindfulness Minute</span>
          <span className="widget-desc">Play audio session (3min)</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Audio session started!", "success")}>Play</button>
        </div>
      </div>
    </div>
  );
}

// Events: List upcoming events with RSVP mini-cards
function EventsMockups() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div>
      <h2>Upcoming Events</h2>
      <div className="lux-info-row" style={{gap: "28px", flexWrap:"wrap"}}>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">👨‍👩‍👧‍👦</span>
          <span className="widget-title">Block BBQ Bash</span>
          <span className="widget-desc">Sun June 3, 3-7pm</span>
          <button className="widget-action-btn"
            onClick={() => showToast("RSVP confirmed!", "success")}>RSVP</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">👩‍🏫</span>
          <span className="widget-title">Emergency Prep Seminar</span>
          <span className="widget-desc">Weds June 6, 7pm</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Seminar reminder set!", "info")}>Remind Me</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🍀</span>
          <span className="widget-title">Eco Fair</span>
          <span className="widget-desc">Plaza Pavilion, Sat June 10</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Eco Fair calendar link sent.", "success")}>Add to Calendar</button>
        </div>
      </div>
    </div>
  );
}

// Mental Health: Resource mockups
function MentalHealthMockups() {
  const { showToast } = React.useContext(ToastContext);
  return (
    <div>
      <h2>Mental Health Support</h2>
      <div className="lux-info-row" style={{gap: "25px", flexWrap:"wrap"}}>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🫂</span>
          <span className="widget-title">Support Circles</span>
          <span className="widget-desc">Biweekly, neighbor-facilitated</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Support circle RSVP sent.", "success")}>RSVP</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">📞</span>
          <span className="widget-title">Wellness Hotline</span>
          <span className="widget-desc">24/7 peer support</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Call initiated. Help is on the way.", "info")}>Call Now</button>
        </div>
        <div className="lux-mini-widget">
          <span className="widget-icon" aria-hidden="true">🌅</span>
          <span className="widget-title">Morning Check-Ins</span>
          <span className="widget-desc">AI well-being bot, 8am</span>
          <button className="widget-action-btn"
            onClick={() => showToast("Notified for tomorrow's check-in.", "success")}>Notify Me</button>
        </div>
      </div>
    </div>
  );
}

/** === MainContainer handles all composition, tab switching, infobar === */
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

  // === Per-tab luxury widget injection ===
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
          {/* Populate each tab with 3-4 demo luxury cards/min-widgets, richly styled */}
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "skillbarter" && <SkillBadgesMockups />}
          {activeTab === "payforward" && <PayItForwardTab />}
          {activeTab === "emergency" && <CrisisOverlayMockups />}
          {activeTab === "aidhub" && <CommunityFundMockups />}
          {activeTab === "resources" && <ResourceReupMockups />}
          {activeTab === "eco" && <EcoRecsMockups />}
          {activeTab === "impact" && <ImpactTrackerMockups />}
          {activeTab === "groups" && <GroupsTab />}
          {activeTab === "events" && <EventsMockups />}
          {activeTab === "mental" && <MentalHealthMockups />}
          {activeTab === "wellness" && <WellnessMockups />}
          {activeTab === "knowledge" && <KnowledgeTab />}
          {activeTab === "recommender" && <SkillRecommenderTab />}
          {activeTab === "tracker" && <ImpactTrackerMockups />}
          {activeTab === "disaster" && <CrisisOverlayMockups />}
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
