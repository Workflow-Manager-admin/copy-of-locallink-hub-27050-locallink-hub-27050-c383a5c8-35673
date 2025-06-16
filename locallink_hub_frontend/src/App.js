import React, { useState } from 'react';
import './App.css';

/*
  Main Container for LocalLink Hub — REFACTORED & ENHANCED for INTERACTIVITY/RESPONSIVENESS
  - Responsive: optimized for mobile/desktop, flex layout adapts intelligently
  - Interactivity: Tabs are focusable/clickable; overlays (AI, Alerts) can be toggled; suggestions/alerts are dismissible
  - Accessible navigation & visual distinctions
  - Modern UI best practices for layouts and overlays
*/

// THEME CONSTANTS
const PRIMARY = '#2563eb';      // Modern blue
const SECONDARY = '#fbbf24';    // Gold
const ACCENT = '#63d4a7';       // Soft green
const BG_SURFACE = '#f8fafc';
const BG_PANEL = '#e2e8f0';
const TEXT = '#222e36';
const TEXT_SECONDARY = '#506174';
const CARD_BG = '#ffffff';

// HELPER STYLES (for inline dynamic components)
const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 13,
  borderLeft: `4px solid ${ACCENT}`,
  background: CARD_BG,
  borderRadius: 10,
  padding: '13px 16px',
  gap: 13,
  boxShadow: '0 1.5px 8px rgba(57, 87, 127, 0.07)',
  color: TEXT,
  transition: 'background 0.16s'
};
function profilePicStyle(bg) {
  return {
    display: 'inline-block',
    marginRight: 12,
    width: 35, height: 35,
    borderRadius: '50%',
    background: bg,
    border: `2.2px solid ${SECONDARY}`,
    boxShadow: '0 1px 2.5px rgba(85,130,170,0.17)',
  };
}
const badgeStyle = {
  background: ACCENT,
  color: "#273232",
  padding: '3px 8px',
  borderRadius: 11,
  fontSize: 12.5,
  fontWeight: 600,
  marginLeft: 4,
  boxShadow: '0 1.5px 6px rgba(57, 127, 107, 0.08)'
};

// COMPONENTS

function MapDashboard({ isNarrow }) {
  // Responsive placeholder map widget—adapts to screen size
  return (
    <div
      className="map-dashboard"
      style={{
        width: '100%',
        height: isNarrow ? 150 : 240,
        minHeight: isNarrow ? 102 : 168,
        borderRadius: 17,
        background: CARD_BG,
        border: `1.7px solid ${BG_PANEL}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 17,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 14px 0 rgba(67,117,187,.06)'
      }}
    >
      <div style={{
        color: ACCENT,
        fontWeight: 800,
        fontSize: isNarrow ? 15.7 : 21.2,
        marginBottom: 3,
        letterSpacing: 0.35
      }}>
        Your Micro-Community Map
      </div>
      <div style={{
        color: SECONDARY,
        fontSize: isNarrow ? 13 : 15,
        marginBottom: 3,
        fontWeight: 500
      }}>
        (1-2km radius geofenced area)
      </div>
      <div style={{
        width: isNarrow ? 53 : 81,
        height: isNarrow ? 53 : 81,
        borderRadius: '50%',
        background: PRIMARY,
        opacity: 0.15,
        position: 'absolute',
        left: '50%',
        top: isNarrow ? 65 : 101,
        transform: 'translate(-50%,0)',
        zIndex: 1,
      }} />
      <div style={{
        width: isNarrow ? 22 : 31,
        height: isNarrow ? 22 : 31,
        borderRadius: '50%',
        background: ACCENT,
        position: 'relative',
        zIndex: 2,
        border: `2.1px solid ${PRIMARY}`,
      }} />
      <div
        aria-label="Coming soon"
        style={{
          color: TEXT_SECONDARY,
          fontSize: isNarrow ? 10.5 : 13.3,
          opacity: 0.48,
          marginTop: 6.5,
          letterSpacing: 0.2,
          fontWeight: 500
        }}>
        Map coming soon
      </div>
    </div>
  );
}

function TrustBadgeList({ isNarrow }) {
  // Dummy trust indicator badges, responsive stacking
  const badges = [
    { label: 'Peer Verified', color: ACCENT },
    { label: 'Skill Badge: Carpentry', color: '#69a989' },
    { label: 'ID Verified', color: PRIMARY },
  ];
  return (
    <div
      className="trust-badges"
      style={{
        display: 'flex',
        gap: 10,
        marginBottom: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: isNarrow ? 12 : 14,
      }}>
      <span style={{
        color: SECONDARY,
        marginRight: 3,
      }}>Your Trust Level:</span>
      {badges.map((b, i) => (
        <span key={i}
          style={{
            background: b.color,
            color: '#fff',
            padding: isNarrow ? '2px 10px' : '2px 12px',
            borderRadius: 12,
            fontSize: isNarrow ? 11 : 13,
            fontWeight: 500,
            border: '1px solid #444',
            marginRight: 1,
          }}>{b.label}</span>
      ))}
    </div>
  );
}

// Dismissible Overlay/Alert mechanism — for AI Suggestions and Alerts
function Overlay({ visible, onClose, title, color, children }) {
  if (!visible) return null;
  return (
    <div className="overlay-backdrop" aria-modal="true" role="dialog" tabIndex={-1}>
      <div
        className="overlay-content"
        style={{ borderLeft: `7px solid ${color}`, borderRadius: 22, background: CARD_BG, color: TEXT }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
          borderTopLeftRadius: 15
        }}>
          <div style={{
            color: color, fontWeight: 800, fontSize: 17.5, letterSpacing: 1.06,
            textShadow: '0 1px 0 rgba(154,174,221,.06)'
          }}>
            {title}
          </div>
          <button aria-label="Close overlay"
            title="Close"
            className="overlay-close"
            onClick={onClose}
            tabIndex={0}
            style={{ outline: 'none', border: 'none' }}
            onKeyDown={e => {
              if (['Enter',' ','Escape'].includes(e.key)) onClose();
            }}
          >×</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// AI Suggestions Overlay
function AISuggestionsOverlay({ open, onClose, type = 'skill' }) {
  const items = type === 'skill'
    ? [
      'Michael nearby can help with Rooftop Gardening.',
      'A local verified offers Bicycle Repairs within 500m.',
      'Consider lending your power drill—4 neighbors requested tools.',
    ]
    : [
      'Bookshelf available for pickup—reduces landfill waste.',
      'Fresh local apples up for exchange at Main St.',
      'Neighbor supports pet sitters, match for your pet-care badge!',
    ];
  return (
    <Overlay
      visible={open}
      onClose={onClose}
      title="AI Suggestions"
      color={ACCENT}
    >
      <ul style={{
        color: TEXT_SECONDARY,
        margin: 0,
        paddingLeft: 18,
        fontSize: 15.2,
        lineHeight: 1.7
      }}>
        {items.map((s, i) => (
          <li key={i} style={{
            marginBottom: 4,
            padding: "3px 0",
            transition: "background 0.13s"
          }}>{s}</li>
        ))}
      </ul>
    </Overlay>
  );
}

// Alerts Overlay
function AlertsOverlay({ open, onClose }) {
  // Example alerts (could be dynamic)
  const alerts = [
    {
      type: 'crisis',
      message: 'Weather alert: Strong winds in your area. Check crisis support tab if needed!',
      color: PRIMARY,
    },
    {
      type: 'trust',
      message: 'Reminder: Complete your profile to earn the Verified Neighbor badge.',
      color: ACCENT,
    },
  ];
  return (
    <Overlay
      visible={open}
      onClose={onClose}
      title="Community Alerts"
      color={PRIMARY}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {alerts.map((a, i) => (
          <div key={i} style={{
            background: a.type === 'crisis' ? '#fdf3f7' : '#e8f7ef',
            color: a.color,
            padding: '10px 20px',
            borderRadius: 12,
            border: `1.7px solid ${a.color}`,
            fontSize: 15,
            fontWeight: 600,
            outline: a.type === 'crisis' ? `2px solid ${PRIMARY}` : `2px solid ${ACCENT}`,
            outlineOffset: 0
          }}>
            <span style={{
              marginRight: 7,
              fontWeight: 800,
              color: a.type === 'crisis' ? PRIMARY : ACCENT
            }}>
              {a.type === 'crisis' ? 'Urgent' : 'Notice'}:
            </span>
            <span>{a.message}</span>
          </div>
        ))}
      </div>
    </Overlay>
  );
}

// Compact suggestions/alerts bar on the dashboard (triggers overlays)
function DashboardInteractiveBar({ onAISuggest, onAlerts, isNarrow }) {
  return (
    <div
      style={{
        marginTop: 9, marginBottom: isNarrow ? 12 : 18,
        display: 'flex',
        flexDirection: isNarrow ? 'column' : 'row',
        gap: isNarrow ? 8 : 18,
        alignItems: isNarrow ? 'stretch' : 'center',
      }}>
      <button
        className="dash-bar-btn"
        onClick={onAISuggest}
        aria-label="Show AI Suggestions"
        style={{
          background: '#262622',
          color: ACCENT,
          padding: isNarrow ? '9px 8px' : '8px 18px',
          border: 'none',
          borderRadius: 9,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: isNarrow ? 13 : 15,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
        <span role="img" aria-label="bulb" style={{ fontSize: 18 }}>💡</span> AI Suggestions
      </button>
      <button
        className="dash-bar-btn"
        onClick={onAlerts}
        aria-label="Show Alerts"
        style={{
          background: '#260f13',
          color: PRIMARY,
          padding: isNarrow ? '9px 8px' : '8px 18px',
          border: 'none',
          borderRadius: 9,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: isNarrow ? 13 : 15,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
        <span role="img" aria-label="alert" style={{ fontSize: 18 }}>🚨</span> Alerts
      </button>
    </div>
  );
}

// TAB BODIES — minor responsiveness via isNarrow
function SkillExchangeTab({ aiSuggestOverlay }) {
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>Skill Exchange</h3>
      <div style={{ color: SECONDARY, fontSize: 15, marginBottom: 8 }}>
        Offer or request help from neighbors with verified skills.
      </div>
      {/* Inline option for suggestions on mobile */}
      {!aiSuggestOverlay && (
        <div style={{
          background: '#262622',
          borderRadius: 12,
          padding: '13px 14px',
          margin: '14px 0 8px 0',
          borderLeft: `6px solid ${ACCENT}`,
        }}>
          <div style={{
            color: ACCENT, fontWeight: 600, fontSize: 15,
            marginBottom: 4,
          }}>AI Suggestions</div>
          <ul style={{ color: SECONDARY, margin: 0, paddingLeft: 14, fontSize: 14 }}>
            <li>Michael nearby can help with Rooftop Gardening.</li>
            <li>A local verified offers Bicycle Repairs within 500m.</li>
            <li>Consider lending your power drill—4 neighbors requested tools.</li>
          </ul>
        </div>
      )}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={listItemStyle}>
          <span style={profilePicStyle('#69a989')}></span>
          <div>
            <b>Evelyn C.</b> <span style={badgeStyle}>Peer Verified</span> can tutor Math Sat/Sun.
          </div>
        </li>
        <li style={listItemStyle}>
          <span style={profilePicStyle(ACCENT)}></span>
          <div>
            <b>Jan P.</b> offers <span style={badgeStyle}>Guitar Lessons</span> for exchange.
          </div>
        </li>
        <li style={listItemStyle}>
          <span style={profilePicStyle(PRIMARY)}></span>
          <div>
            <b>Sara K.</b> requests <span style={badgeStyle}>IT Help</span> this weekend!
          </div>
        </li>
      </ul>
    </section>
  );
}
function ResourceReupTab({ aiSuggestOverlay }) {
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>Resource Re-Up</h3>
      <div style={{ color: SECONDARY, fontSize: 15, marginBottom: 8 }}>
        List unneeded items for exchange or free within your micro-community.
      </div>
      {!aiSuggestOverlay && (
        <div style={{
          background: '#262622', borderRadius: 12,
          padding: '13px 14px', margin: '14px 0 8px 0', borderLeft: `6px solid ${ACCENT}`,
        }}>
          <div style={{
            color: ACCENT, fontWeight: 600, fontSize: 15,
            marginBottom: 2,
          }}>AI Suggestions</div>
          <ul style={{ color: SECONDARY, margin: 0, paddingLeft: 14, fontSize: 14 }}>
            <li>Bookshelf available for pickup—reduces landfill waste.</li>
            <li>Fresh local apples up for exchange at Main St.</li>
            <li>Neighbor supports pet sitters, match for your pet-care badge!</li>
          </ul>
        </div>
      )}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={listItemStyle}>
          <span style={profilePicStyle(ACCENT)}></span>
          <div>
            <b>Stacy Y.</b> is giving away <span style={badgeStyle}>Board Games</span>.
          </div>
        </li>
        <li style={listItemStyle}>
          <span style={profilePicStyle(SECONDARY)}></span>
          <div>
            <b>Roger Q.</b> offers <span style={badgeStyle}>Homegrown Tomatoes</span>.
          </div>
        </li>
        <li style={listItemStyle}>
          <span style={profilePicStyle('#964B00')}></span>
          <div>
            <b>Lina P.</b> requests <span style={badgeStyle}>Stackable Shelves</span> for a local project.
          </div>
        </li>
      </ul>
    </section>
  );
}
function CommunityFundTab() {
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>Community Fund</h3>
      <div style={{ color: SECONDARY, fontSize: 15, marginBottom: 14 }}>
        Earn or donate credits—support neighbors in need!
      </div>
      <div style={{
        background: ACCENT,
        borderRadius: 8,
        padding: '14px 24px',
        color: '#fff',
        marginBottom: 10,
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        <span style={{ fontWeight: 600, fontSize: 19 }}>1730 credits</span>
        <span style={{
          background: '#fff2',
          padding: '3px 10px',
          borderRadius: 7,
          fontSize: 13,
        }}>Community Total Fund</span>
        <span style={{
          marginLeft: 'auto',
          background: '#b1b483',
          color: '#191919',
          padding: '3px 14px',
          borderRadius: 16,
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
        }}>+ Donate</span>
      </div>
      <div style={{
        color: '#fff', fontSize: 14, marginBottom: 4, fontWeight: 500
      }}>Recent Micro-Grants</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={listItemStyle}>
          <span style={profilePicStyle(SECONDARY)}></span>
          <div>
            <b>Lia V.</b> received <span style={badgeStyle}>40 credits</span> for <i>medicine support</i>.
          </div>
        </li>
        <li style={listItemStyle}>
          <span style={profilePicStyle(ACCENT)}></span>
          <div>
            <b>Chelsea O.</b> earned <span style={badgeStyle}>25 credits</span> by tutoring.
          </div>
        </li>
      </ul>
    </section>
  );
}
function CrisisSupportTab() {
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>Crisis & Disaster Support</h3>
      <div style={{
        color: '#FAFAD2', background: PRIMARY,
        borderRadius: 10, padding: '10px 16px', margin: '12px 0 16px 0',
        fontWeight: 600, fontSize: 15,
      }}>
        Crisis mode active: Strong winds today! If you or your neighbor need urgent help (shelter, food, first aid), use this feature.
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <button className="btn" style={{ background: ACCENT, color: 'white' }}>Request Help</button>
        <button className="btn" style={{ background: PRIMARY, color: 'white' }}>Offer Support</button>
      </div>
      <div style={{
        color: SECONDARY, margin: '18px 0 7px 0',
        fontSize: 14,
      }}>Urgent Help Listings (Real-time)</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={listItemStyle}>
          <span style={profilePicStyle(PRIMARY)}></span>
          <div>
            <b>Mike L.</b> offered <span style={badgeStyle}>First Aid Kit</span>
          </div>
        </li>
        <li style={listItemStyle}>
          <span style={profilePicStyle(SECONDARY)}></span>
          <div>
            <b>Anya S.</b> requests <span style={badgeStyle}>Power backup</span> for elderly parent.
          </div>
        </li>
      </ul>
    </section>
  );
}

// PUBLIC_INTERFACE
function App() {
  // RESPONSIVENESS: Listen for window width for compact/mobile mode
  const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 720);

  React.useEffect(() => {
    function handleResize() {
      setIsNarrow(window.innerWidth < 720);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // TABS and navigation
  const TABS = [
    { label: "Skill Exchange", id: "skills", component: <SkillExchangeTab aiSuggestOverlay={!isNarrow} /> },
    { label: "Resource Re-Up", id: "resources", component: <ResourceReupTab aiSuggestOverlay={!isNarrow} /> },
    { label: "Community Fund", id: "fund", component: <CommunityFundTab /> },
    { label: "Crisis Support", id: "crisis", component: <CrisisSupportTab /> },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  // Overlay state
  const [aiOverlay, setAiOverlay] = useState(false);
  const [alertsOverlay, setAlertsOverlay] = useState(false);

  // Tab keyboard navigation
  function handleTabsKey(e, idx) {
    if (e.key === 'ArrowRight') {
      setActiveTab(TABS[(idx + 1) % TABS.length].id);
    } else if (e.key === 'ArrowLeft') {
      setActiveTab(TABS[(idx - 1 + TABS.length) % TABS.length].id);
    }
  }

  return (
    <div className="app" style={{ background: '#161617', minHeight: '100vh' }}>
      {/* Main Nav */}
      <nav className="navbar" style={{
        background: '#19191c',
        borderBottom: `2px solid ${ACCENT}`,
      }}>
        <div className="container" style={{ maxWidth: 1125 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
          }}>
            <div className="logo" style={{ fontFamily: 'monospace', letterSpacing: 1, color: '#fff' }}>
              <span className="logo-symbol" style={{ color: PRIMARY, fontSize: 27, marginRight: 4 }}>⦿</span>
              LocalLink Hub
            </div>
            <div style={{
              fontWeight: 400, fontSize: 14,
              color: '#fff',
              background: ACCENT, borderRadius: 8,
              padding: '7px 16px',
              letterSpacing: 1,
            }}>
              <span style={{ marginRight: 9 }}>Beta</span>
            </div>
          </div>
        </div>
      </nav>
      {/* Page Main */}
      <main>
        <div
          className="container"
          style={{
            maxWidth: 1125,
            paddingTop: isNarrow ? 80 : 114,
            paddingLeft: isNarrow ? 5 : 24,
            paddingRight: isNarrow ? 5 : 24,
          }}
        >
          <MapDashboard isNarrow={isNarrow} />
          <TrustBadgeList isNarrow={isNarrow} />
          <DashboardInteractiveBar
            onAISuggest={() => setAiOverlay(true)}
            onAlerts={() => setAlertsOverlay(true)}
            isNarrow={isNarrow}
          />
          {/* Tab navigation */}
          <div
            className="tab-bar"
            style={{
              display: 'flex',
              gap: isNarrow ? 5 : 16,
              marginBottom: isNarrow ? 18 : 32,
              borderBottom: `2px solid ${ACCENT}`,
              paddingBottom: 2,
              overflowX: 'auto',
            }}>
            {TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? PRIMARY : 'transparent',
                  color: activeTab === tab.id ? '#fff' : SECONDARY,
                  border: 'none',
                  fontWeight: 600,
                  fontSize: isNarrow ? 14 : 16,
                  padding: isNarrow ? '7px 9px' : '9px 20px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  marginBottom: -2,
                  borderBottom: activeTab === tab.id
                    ? `4px solid ${ACCENT}`
                    : '4px solid transparent',
                  transition: 'all .18s',
                  outline: activeTab === tab.id ? `2px solid ${SECONDARY}` : 'none',

                }}
                className={activeTab === tab.id ? 'selected' : ''}
                tabIndex={0}
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                onKeyDown={(e) => handleTabsKey(e, idx)}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Tab Body */}
          <section
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={activeTab}
            style={{
              minHeight: isNarrow ? 220 : 290,
              paddingBottom: isNarrow ? 24 : 45,
              transition: 'min-height 0.1s',
            }}
          >
            {TABS.find(tab => tab.id === activeTab)?.component}
          </section>
        </div>
        {/* Overlays */}
        <AISuggestionsOverlay open={aiOverlay} onClose={() => setAiOverlay(false)} type={activeTab === 'resources' ? 'resource' : 'skill'} />
        <AlertsOverlay open={alertsOverlay} onClose={() => setAlertsOverlay(false)} />
      </main>
    </div>
  );
}

export default App;
