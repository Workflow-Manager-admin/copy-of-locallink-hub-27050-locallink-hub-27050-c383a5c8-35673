import React, { useState } from 'react';
import './App.css';

/*
  Main Container for LocalLink Hub
  - Map-centric dashboard
  - Tabs: Skill Exchange, Resource Listings, Community Fund, Crisis Support
  - Trust indicators, AI suggestions, alerts
  - Dark theme & custom color scheme
*/

// Theme Colors - also update these in App.css :root
const PRIMARY = '#8f0a0a';
const SECONDARY = '#b1b483';
const ACCENT = '#685808';

function MapDashboard() {
  // Placeholder map widget for geofenced micro-community
  // In production, integrate with a map framework (e.g., Leaflet, Mapbox)
  return (
    <div style={{
      width: '100%',
      height: 260,
      borderRadius: 16,
      background: '#19191c',
      border: `2px solid ${SECONDARY}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 32,
      position: 'relative'
    }}>
      <div style={{
        color: ACCENT, fontWeight: 700, fontSize: 20,
        marginBottom: 12
      }}>Your Micro-Community Map</div>
      <div style={{
        color: SECONDARY, fontSize: 14,
        marginBottom: 10
      }}>
        (1-2km radius geofenced area)
      </div>
      <div style={{
        width: 80, height: 80,
        borderRadius: '50%',
        background: PRIMARY,
        opacity: 0.12,
        position: 'absolute', left: '50%', top: 110,
        transform: 'translate(-50%,0)'
      }}></div>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: ACCENT, position: 'relative', zIndex: 2, border: `2px solid ${PRIMARY}`
      }} />
      <div style={{ color: '#fff', fontSize: 13, opacity: 0.5, marginTop: 8 }}>
        Map coming soon
      </div>
    </div>
  );
}

function TrustBadgeList() {
  // Dummy trust indicator badges
  const badges = [
    { label: 'Peer Verified', color: ACCENT },
    { label: 'Skill Badge: Carpentry', color: '#69a989' },
    { label: 'ID Verified', color: PRIMARY },
  ];
  return (
    <div style={{
      display: 'flex', gap: 16, marginBottom: 20,
      alignItems: 'center', flexWrap: 'wrap'
    }}>
      <span style={{
        color: SECONDARY, fontSize: 14, marginRight: 4
      }}>Your Trust Level:</span>
      {badges.map((b, i) => (
        <span key={i}
          style={{
            background: b.color,
            color: '#fff',
            padding: '2px 12px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 500,
            border: '1px solid #444'
          }}>{b.label}</span>
      ))}
    </div>
  );
}

function AISuggestions({ type = 'skill' }) {
  // Example AI suggestions
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
    <div style={{
      background: '#262622',
      borderRadius: 12,
      padding: '16px 20px',
      margin: '18px 0 10px 0',
      borderLeft: `6px solid ${ACCENT}`,
    }}>
      <div style={{ color: ACCENT, fontWeight: 600, fontSize: 15, marginBottom: 5 }}>
        AI Suggestions
      </div>
      <ul style={{
        color: SECONDARY,
        margin: 0, paddingLeft: 16, fontSize: 14
      }}>
        {items.map((s, i) => <li key={i} style={{ marginBottom: 2 }}>{s}</li>)}
      </ul>
    </div>
  );
}

function AlertsBar() {
  // Example alerts (in production, dynamic)
  const alerts = [
    {
      type: 'crisis',
      message: 'Weather alert: Strong winds in your area. Check crisis support tab if needed!',
      color: PRIMARY
    },
    {
      type: 'trust',
      message: 'Reminder: Complete your profile to earn the Verified Neighbor badge.',
      color: ACCENT
    }
  ];
  return (
    <div style={{
      marginTop: 10, marginBottom: 20,
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      {alerts.map((a, i) =>
        <div key={i} style={{
          background: '#260f13',
          color: a.color,
          padding: '7px 18px',
          borderRadius: 8,
          border: `1px solid ${a.color}`,
          fontSize: 13,
        }}>
          <b style={{marginRight: 6}}>{a.type === 'crisis' ? 'Urgent' : 'Notice'}:</b> {a.message}
        </div>)}
    </div>
  );
}

function SkillExchangeTab() {
  // List of example skill exchanges
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>Skill Exchange</h3>
      <div style={{ color: SECONDARY, fontSize: 15, marginBottom: 8 }}>
        Offer or request help from neighbors with verified skills.
      </div>
      <AISuggestions type="skill" />
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

function ResourceReupTab() {
  // List of example resource listings
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>Resource Re-Up</h3>
      <div style={{ color: SECONDARY, fontSize: 15, marginBottom: 8 }}>
        List unneeded items for exchange or free within your micro-community.
      </div>
      <AISuggestions type="resource" />
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
  // Example micro-grant fund UI
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
        display: 'flex', alignItems: 'center', gap: 18
      }}>
        <span style={{ fontWeight: 600, fontSize: 19 }}>1730 credits</span>
        <span style={{
          background: '#fff2',
          padding: '3px 10px',
          borderRadius: 7,
          fontSize: 13
        }}>Community Total Fund</span>
        <span style={{
          marginLeft: 'auto',
          background: '#b1b483',
          color: '#191919',
          padding: '3px 14px',
          borderRadius: 16,
          fontWeight: 600,
          fontSize: 15
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
  // Example of crisis/disaster support overlay
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>Crisis & Disaster Support</h3>
      <div style={{
        color: '#FAFAD2', background: PRIMARY,
        borderRadius: 10, padding: '10px 16px', margin: '12px 0 16px 0',
        fontWeight: 600, fontSize: 15
      }}>
        Crisis mode active: Strong winds today! If you or your neighbor need urgent help (shelter, food, first aid), use this feature.
      </div>
      <div style={{display: "flex", gap: 14}}>
        <button className="btn" style={{background: ACCENT, color:'white'}}>Request Help</button>
        <button className="btn" style={{background: PRIMARY, color:'white'}}>Offer Support</button>
      </div>
      <div style={{
        color: SECONDARY, margin: '18px 0 7px 0',
        fontSize: 14
      }}>Urgent Help Listings (Real-time)</div>
      <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
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



// Helper Styles
const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 14,
  borderLeft: `4px solid ${ACCENT}`,
  background: '#181819',
  borderRadius: 9,
  padding: '9px 12px',
  gap: 11
};

function profilePicStyle(bg) {
  return {
    display: 'inline-block',
    marginRight: 10,
    width: 34, height: 34,
    borderRadius: '50%',
    background: bg,
    border: '2px solid #233',
    boxShadow: '0 0 0 2px #272727'
  };
}
const badgeStyle = {
  background: ACCENT,
  color: "#fff",
  padding: '2px 8px',
  borderRadius: 7,
  fontSize: 12,
  marginLeft: 4,
};


// PUBLIC_INTERFACE
function App() {
  // Tab navigation state
  const TABS = [
    { label: "Skill Exchange", id: "skills", component: <SkillExchangeTab /> },
    { label: "Resource Re-Up", id: "resources", component: <ResourceReupTab /> },
    { label: "Community Fund", id: "fund", component: <CommunityFundTab /> },
    { label: "Crisis Support", id: "crisis", component: <CrisisSupportTab /> },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="app" style={{background:'#161617', minHeight: '100vh'}}>
      {/* Main Nav */}
      <nav className="navbar" style={{
        background: '#19191c',
        borderBottom: `2px solid ${ACCENT}`
      }}>
        <div className="container" style={{maxWidth: 1125}}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'
          }}>
            <div className="logo" style={{fontFamily:'monospace',letterSpacing:1,color:'#fff'}}>
              <span className="logo-symbol" style={{color:PRIMARY,fontSize:27,marginRight:4}}>⦿</span>
              LocalLink Hub
            </div>
            <div style={{
              fontWeight: 400, fontSize: 14,
              color: '#fff',
              background:ACCENT, borderRadius:8,
              padding: '7px 16px',
              letterSpacing:1
            }}>
              <span style={{marginRight:9}}>Beta</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Page main */}
      <main>
        <div className="container" style={{maxWidth:1125, paddingTop: 114}}>
          <MapDashboard />
          <TrustBadgeList />
          <AlertsBar />
          <div style={{
            display: 'flex', gap:16, marginBottom: 32,
            borderBottom: `2px solid ${ACCENT}`,
            paddingBottom: 2
          }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? PRIMARY : 'transparent',
                  color: activeTab === tab.id ? '#fff' : SECONDARY,
                  border: 'none',
                  fontWeight: 600,
                  fontSize:16,
                  padding: '9px 20px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  marginBottom: -2,
                  borderBottom: activeTab === tab.id
                    ? `4px solid ${ACCENT}`
                    : '4px solid transparent',
                  transition: 'all .18s'
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div style={{
            minHeight: 290,
            paddingBottom: 45
          }}>
            {TABS.find(tab => tab.id === activeTab)?.component}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
