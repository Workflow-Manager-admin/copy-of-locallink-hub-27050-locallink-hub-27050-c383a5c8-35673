import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function MainContainer() {
  // Tab names correspond to key features
  const TABS = [
    { id: 'micro-communities', label: 'Micro-Communities' },
    { id: 'skills', label: 'Skill Badges' },
    { id: 'resources', label: 'Resource Re-Up' },
    { id: 'grants', label: 'Micro Grants' },
    { id: 'crisis', label: 'Crisis Support' }
  ];
  const [activeTab, setActiveTab] = useState('micro-communities');
  const [showCrisisAlert, setShowCrisisAlert] = useState(true);

  // Sample data for demonstration (replace with API integration as needed)
  const microCommunity = {
    name: "Maple Street Neighbors",
    memberCount: 12,
    trustLevel: 0.97
  };
  const profile = {
    name: "Jordan Mendoza",
    badge: "Certified Electrician",
    badgeVerified: true,
    aiSuggestions: [
      "Offer: Home electrical safety check within your block",
      "Request: Looking for someone to help prune the community garden"
    ]
  };
  const urgentAlerts = [
    { type: 'Crisis', message: 'Wildfire advisory active in your area. Tap here to view urgent needs.' }
  ];
  const resources = [
    { item: 'Bookshelf', status: 'Available', offeredBy: 'E. Bright' },
    { item: 'Organic Tomatoes', status: 'Claimed', offeredBy: 'Alex Kim' },
    { item: 'Bike Tools', status: 'Available', offeredBy: 'S. Tran' }
  ];
  const grants = [
    { title: "Back-to-School Supplies Grant", remaining: "$80", total: "$250", status: "Active" },
    { title: "Emergency Ramp Fund", remaining: "$200", total: "$400", status: "Funded" }
  ];
  const crisisAid = [
    { type: 'Food', description: 'Meals for 2 families requested', responder: 'Respond' },
    { type: 'First Aid Kit', description: 'Request from D. Patel (verified)', responder: 'Respond' }
  ];

  return (
    <div className="main-app-container" style={{ minHeight: '100vh', background: 'var(--kavia-dark)' }}>
      {/* AppBar/Header */}
      <nav className="navbar" style={{ background: '#18181e', borderBottom: '1px solid #292929' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ color: '#b1b483' }}>
            <span style={{ color: '#8f0a0a', fontWeight: 'bold', fontSize: '1.6rem', marginRight: 6 }}>●</span>
            LocalLink Hub
          </div>
          <div className="profile-summary" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 18, fontWeight: 500 }}>{profile.name}</span>
            <TrustIndicator trust={microCommunity.trustLevel} />
            <VerifiedBadge name={profile.badge} verified={profile.badgeVerified} />
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(profile.name)}`}
              alt="Profile"
              style={{ width: 36, height: 36, borderRadius: '100%', border: '2px solid #8f0a0a', background: '#222' }}
            />
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 85 }}>
        {/* Urgent Alert */}
        {showCrisisAlert && urgentAlerts.length > 0 && (
          <div className="urgent-alert"
            style={{
              background: 'linear-gradient(90deg, #8f0a0a 60%, #b1b483 110%)',
              color: 'white',
              padding: 14,
              textAlign: 'center',
              fontWeight: 500,
              letterSpacing: 0.5,
              fontSize: '1.05rem',
              cursor: 'pointer',
              marginBottom: 14
            }}
            onClick={() => { setActiveTab('crisis'); setShowCrisisAlert(false); }}
            aria-label="Urgent Crisis Alert"
          >
            <span style={{ marginRight: 12, fontWeight: 700, fontSize: '1.2rem', letterSpacing: 1 }}>⚠</span>
            {urgentAlerts[0].message}
            <span
              style={{ float: 'right', cursor: 'pointer', color: '#eee', marginLeft: 20, fontWeight: 300 }}
              onClick={e => { e.stopPropagation(); setShowCrisisAlert(false); }}
              aria-label="Dismiss urgent alert"
            >✕</span>
          </div>
        )}

        <div className="container">
          {/* Map and Micro-Community Header */}
          <section style={{ display: 'flex', gap: 36, flexWrap: 'wrap-reverse', alignItems: 'flex-start', marginBottom: 32 }}>
            {/* Side Panel: Micro-Community Info, AI Suggestions */}
            <div style={{ minWidth: 260, width: 280, flex: '0 0 280px', background: '#18181e', padding: '18px 20px', borderRadius: 12, boxShadow: '0 2px 10px #1116', border: '1px solid #232323' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '1.06rem', fontWeight: 600, color: '#b1b483' }}>Your Micro-Community</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 3, color: '#fff' }}>{microCommunity.name}</div>
                <div style={{ margin: '8px 0 0 0', fontSize: 15, color: 'var(--text-secondary)' }}>
                  <span style={{ marginRight: 10 }}>👥 {microCommunity.memberCount}</span>
                  <span> | </span>
                  <span style={{ marginLeft: 10 }}>Trust: <TrustIndicator trust={microCommunity.trustLevel} /></span>
                </div>
              </div>
              <AISection suggestions={profile.aiSuggestions} />
            </div>
            {/* Map Display */}
            <div style={{ flex: '1 1 420px', minWidth: 320, minHeight: 320, background: '#282829', borderRadius: '18px', boxShadow: '0 4px 28px #1118', border: '1px solid #303033', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <MapDemo />
              <div style={{ marginTop: 16, color: '#b1b483', fontWeight: 500, fontSize: '1.1rem' }}>
                <span>Community Radius: <b>1.5km</b></span>
              </div>
              <div style={{ color: '#eee', marginTop: 2, fontSize: 14 }}>Map overlays show available resources, skill badges, and urgent crisis requests.</div>
            </div>
          </section>

          {/* Tabs Navigation */}
          <div style={{ borderBottom: "1.5px solid #292c24", marginBottom: 0, width: '100%', display: 'flex', gap: 0 }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? 'activeTab tabNavBtn' : 'tabNavBtn'}
                style={{
                  border: 'none',
                  background: activeTab === tab.id ? '#18181e' : 'transparent',
                  color: activeTab === tab.id ? '#8f0a0a' : '#b1b483',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontSize: '1.08rem',
                  borderBottom: activeTab === tab.id ? '3px solid #8f0a0a' : '3px solid transparent',
                  borderRadius: '8px 8px 0 0',
                  padding: '13px 28px',
                  cursor: 'pointer',
                  marginRight: 2,
                  outline: 'none',
                  transition: 'all 0.16s'
                }}
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feature Tabs */}
          <section style={{ width: '100%', background: '#18181e', borderRadius: '0 0 12px 12px', boxShadow: '0 1px 5px #151516', minHeight: 220, padding: '20px 8px 30px 8px', marginBottom: 46, overflow: 'auto' }}>
            {activeTab === 'micro-communities' && (
              <MicroCommunityTab microCommunity={microCommunity} />
            )}
            {activeTab === 'skills' && (
              <SkillsTab badge={profile.badge} badgeVerified={profile.badgeVerified} />
            )}
            {activeTab === 'resources' && (
              <ResourcesTab resources={resources} />
            )}
            {activeTab === 'grants' && (
              <GrantsTab grants={grants} />
            )}
            {activeTab === 'crisis' && (
              <CrisisTab aidRequests={crisisAid} />
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ color: '#888', textAlign: 'center', padding: 24, fontSize: 15, background: 'transparent', marginTop: 40 }}>
        <span style={{ color: '#8f0a0a', fontWeight: 'bold' }}>LocalLink Hub</span> &copy; 2024 &mdash; Hyper-local skill/resource exchange &amp; trust technology.
      </footer>
    </div>
  );
}

// MAP DEMO COMPONENT (replace with real map for production)
function MapDemo() {
  return (
    <div style={{
      width: 270, height: 240, borderRadius: 16, background: "linear-gradient(135deg, #232831 80%, #8f0a0a 110%)",
      display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
    }}>
      {/* Simulated geofence circle */}
      <div style={{
        position: "absolute", top: 30, left: 35,
        width: 190, height: 190, borderRadius: "50%",
        background: "radial-gradient(circle, #b1b48344 66%, transparent 100%)",
        border: "3px solid #68580899"
      }} />
      {/* Point: user location */}
      <div style={{
        position: "absolute", top: 110, left: 120,
        width: 18, height: 18, borderRadius: "50%",
        background: "#8f0a0a",
        border: "2px solid #fff",
        zIndex: 2
      }} />
      {/* Points: other micro-community */}
      <div style={{
        position: "absolute", top: 135, left: 150,
        width: 11, height: 11, borderRadius: "50%",
        background: "#b1b483", border: "1px solid #8f0a0a"
      }} />
      <div style={{
        position: "absolute", top: 95, left: 65,
        width: 11, height: 11, borderRadius: "50%",
        background: "#b1b483", border: "1px solid #8f0a0a"
      }} />
      {/* Resource icon */}
      <div style={{
        position: "absolute", top: 170, left: 123,
        width: 16, height: 16, borderRadius: "50%",
        background: "#685808", display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ color: "#fff", fontSize: 12 }}>🛠</span>
      </div>
      {/* Skill badge icon */}
      <div style={{
        position: "absolute", top: 88, left: 180,
        width: 13, height: 13, borderRadius: "3px", background: "#8f0a0a",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ color: "#fff", fontSize: 10 }}>★</span>
      </div>
      {/* Crisis alert (if present) */}
      <div style={{
        position: "absolute", top: 75, left: 120,
        width: 24, height: 24, borderRadius: "50%", background: "#8f0a0ab2",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ color: "#fff000", fontSize: 17 }}>⚠</span>
      </div>
    </div>
  );
}

// AI SUGGESTIONS & URGENT ALERTS
function AISection({ suggestions }) {
  return (
    <div style={{ background: '#212127', borderRadius: 8, boxShadow: '0 1px 5px #101219', padding: '11px 14px 8px 12px', margin: '8px 0 0 0' }}>
      <div style={{ color: '#8f0a0a', fontWeight: 600, fontSize: 15, marginBottom: 5 }}>
        <span style={{ marginRight: 6, fontWeight: 800 }}>∴</span> AI Suggestions
      </div>
      <ul style={{ listStyle: 'none', margin: 0, paddingLeft: 0 }}>
        {suggestions.map((s, i) => (
          <li key={i} style={{
            color: '#c6c2a0', fontSize: '1rem', padding: '4px 0', borderBottom: i !== suggestions.length - 1 ? '1px solid #282828' : 'none'
          }}>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Trust Indicator
function TrustIndicator({ trust }) {
  // trust: float 0..1
  const percent = Math.round(100 * trust);
  return (
    <span title={`Trust level: ${percent}%`} style={{ color: percent >= 95 ? '#b1b483' : '#FFE600', marginLeft: 6, fontWeight: 600 }}>
      <span style={{ fontSize: 13, verticalAlign: 'middle', marginRight: 2 }}>★</span>{percent}%
    </span>
  );
}

// Verified Badge
function VerifiedBadge({ name, verified }) {
  if (!name) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: '#232', borderRadius: 7, padding: '2.5px 10px', marginLeft: 13,
      color: '#b1b483', fontWeight: 500, fontSize: 13, border: '1px solid #444'
    }}>
      {name}
      {verified &&   <span title="Verified" style={{
        color: "#8f0a0a", fontWeight: 900, marginLeft: 4
      }}>✓</span>}
    </span>
  );
}

// TABS IMPLEMENTATION

// Micro-Communities Tab
function MicroCommunityTab({ microCommunity }) {
  return (
    <div>
      <h2 style={{ color: '#b1b483', margin: '5px 0 8px 0', fontWeight: 700, fontSize: '1.1rem' }}>Welcome to your Micro-Community</h2>
      <div style={{ color: '#eee', marginBottom: 13 }}>
        All exchanges here are geofenced (within 1-2km) for hyper-local trust-based connections.<br />
        Your micro-community: <strong>{microCommunity.name}</strong> <span style={{ color: '#b1b483' }}>({microCommunity.memberCount} members)</span>.
      </div>
      <div style={{ display: 'flex', gap: 18, margin: '12px 0' }}>
        <button className="btn" style={{ background: '#8f0a0a', padding: '8px 20px', borderRadius: 5 }}>Invite a Neighbor</button>
        <button className="btn" style={{ background: '#b1b483', color: '#111', fontWeight: 600, padding: '8px 20px', borderRadius: 5 }}>View Members</button>
      </div>
      <div style={{ color: '#b1b483', marginTop: 10 }}>Shape your local network. All users are verified by local consensus.</div>
    </div>
  );
}

// Verified Skill Badges Tab
function SkillsTab({ badge, badgeVerified }) {
  return (
    <div>
      <h2 style={{ color: '#b1b483', margin: '5px 0 8px 0', fontWeight: 700, fontSize: '1.1rem' }}>Your Verified Skills</h2>
      <div style={{ color: '#eee', marginBottom: 16 }}>
        Earn skill badges via peer-verified endorsements or upload certifications.<br />
        <VerifiedBadge name={badge} verified={badgeVerified} />
      </div>
      <button className="btn" style={{ background: '#8f0a0a', borderRadius: 5 }}>Upload Certification</button>
      <span style={{ marginLeft: 20, color: '#8f0a0a', fontWeight: 500, fontSize: 15, letterSpacing: 0.2 }}>| Peer Endorsements: <span style={{ color: '#b1b483' }}>3</span></span>
      <div style={{ color: '#b1b483', marginTop: 19 }}>
        {badgeVerified ?
          <>All badges displayed are <b>community-verified</b>. Verified skills increase your visibility for skill-based exchanges.</>
          :
          <>No badge verified yet. Submit or request endorsements to get started!</>
        }
      </div>
    </div>
  );
}

// Resource Re-Up Tab
function ResourcesTab({ resources }) {
  return (
    <div>
      <h2 style={{ color: '#b1b483', margin: '5px 0 8px 0', fontWeight: 700, fontSize: '1.1rem' }}>Resources & Items Available</h2>
      <div style={{ color: '#eee', marginBottom: 10 }}>
        Share, claim, or exchange items with nearby neighbors. Reduce waste & promote sharing!
      </div>
      <table style={{ width: '100%', background: '#212127', borderCollapse: 'collapse', borderRadius: 7, marginBottom: 8 }}>
        <thead style={{ background: '#232325', color: '#8f0a0a', fontWeight: 700 }}>
          <tr>
            <th style={{ padding: 7 }}>Item</th>
            <th>Status</th>
            <th>By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res, idx) => (
            <tr key={idx} style={{ background: idx % 2 === 0 ? '#212127' : '#18181e' }}>
              <td style={{ padding: 7 }}>{res.item}</td>
              <td>{res.status === 'Available' ? <span style={{ color: '#b1b483', fontWeight: 600 }}>Available</span> : <span style={{ opacity: 0.7 }}>Claimed</span>}</td>
              <td style={{ color: '#b1b483', fontWeight: 500 }}>{res.offeredBy}</td>
              <td>
                {res.status === 'Available'
                  ? <button className="btn" style={{ fontSize: 13, padding: '5px 9px', background: '#685808' }}>Claim</button>
                  : <button className="btn" style={{ fontSize: 13, padding: '5px 9px', background: '#8f0a0a44', color: '#888', cursor: 'not-allowed' }} disabled>Unavailable</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn" style={{ background: '#8f0a0a', borderRadius: 5 }}>List New Item</button>
    </div>
  );
}

// Micro-Grants Tab
function GrantsTab({ grants }) {
  return (
    <div>
      <h2 style={{ color: '#b1b483', margin: '5px 0 8px 0', fontWeight: 700, fontSize: '1.1rem' }}>Community Micro-Grants & Support Fund</h2>
      <div style={{ color: '#eee', marginBottom: 13 }}>
        Donate or earn credits by helping others. Requests below are reviewed by the local community.
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {grants.map((grant, i) => (
          <div key={i} style={{
            background: '#232325', borderRadius: 9, padding: '13px 15px', minWidth: 200,
            color: '#fff', boxShadow: '0 1px 6px #191919'
          }}>
            <div style={{ color: '#b1b483', fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
              {grant.title}
              <span style={{
                marginLeft: 10, color: '#8f0a0a', fontWeight: 700, fontSize: 13, padding: '2px 7px',
                borderRadius: 6, background: grant.status === "Active" ? "#b1b48322" : "#212127"
              }}>{grant.status}</span>
            </div>
            <div style={{ fontSize: 15 }}>
              Funded: <span style={{ color: '#b1b483' }}>{grant.total}</span><br />
              Remaining: <span style={{ color: '#8f0a0a', fontWeight: 600 }}>{grant.remaining}</span>
            </div>
            <button className="btn" style={{ fontSize: 13, padding: '7px 11px', marginTop: 8, background: '#b1b483', color: '#111', fontWeight: 700 }}>
              Contribute
            </button>
          </div>
        ))}
      </div>
      <div style={{ color: '#b1b483', marginTop: 18 }}>
        Community micro-grants help those in need access local skills/resources when they can't afford it.
      </div>
    </div>
  );
}

// Crisis/Disaster Support Tab
function CrisisTab({ aidRequests }) {
  return (
    <div>
      <h2 style={{ color: '#b1b483', margin: '5px 0 8px 0', fontWeight: 700, fontSize: '1.1rem' }}>
        ⚠ Crisis/Disaster Support
      </h2>
      <div style={{ color: '#eee', marginBottom: 14 }}>
        In local emergencies, quickly request help or offer support. Only verified members shown below.
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {aidRequests.map((req, i) => (
          <li key={i} style={{
            marginBottom: 12, background: '#232325', border: '1.5px solid #8f0a0a33', padding: '12px 14px', borderRadius: 8,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <span>
              <span style={{
                background: '#8f0a0a', color: '#fff', borderRadius: 6, fontWeight: 700, padding: "4px 11px 4px 6px", marginRight: 9, fontSize: 17
              }}>{req.type}</span>
              <span>{req.description}</span>
            </span>
            <button className="btn" style={{ background: '#8f0a0a', borderRadius: 7, padding: '6px 16px', fontSize: 15 }}>
              {req.responder}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: 15, marginTop: 15 }}>
        <button className="btn" style={{ background: '#685808', color: '#fff', borderRadius: 5 }}>Request Help</button>
        <button className="btn" style={{ background: '#b1b483', color: '#111', borderRadius: 5, fontWeight: 600 }}>Offer Aid</button>
      </div>
      <div style={{ color: '#b1b483', marginTop: 12 }}>
        Crisis mode is enabled. Connections open only to verified local neighbors for security.
      </div>
    </div>
  );
}

export default MainContainer;
