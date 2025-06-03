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
      {/* 
        Layout: 
        - The <ul> acts as a horizontally scrollable row, never wraps to next line.
        - Extra nav items slide in via horizontal scroll, preserving luxury visual rhythm.
        - ARIA role set to tablist for accessibility. 
      */}
      <ul data-nav-scrollable role="tablist">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => onSelectTab(tab.key)}
            tabIndex={0}
            aria-label={tab.name}
            role="tab"
            aria-selected={activeTab === tab.key}
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
  // Sample transaction feed
  const barterTxs = [
    {
      id: 1,
      user: "Jamie F.",
      type: "Offer",
      skill: "Gardening",
      hours: 2,
      status: "Completed",
      date: "2024-05-22",
    },
    {
      id: 2,
      user: "Maria S.",
      type: "Earn",
      skill: "Math Tutoring",
      hours: 1,
      status: "In Progress",
      date: "2024-05-23",
    },
    {
      id: 3,
      user: "Katherine M.",
      type: "Offer",
      skill: "Bicycle Repair",
      hours: 1.5,
      status: "Completed",
      date: "2024-05-18",
    },
  ];
  const tokenBalance = 6.5;

  return (
    <div className="tab-content">
      <h2>Skill Bartering Tokens</h2>
      <p>
        Trade time or credits—exchange your skills for hours or community barter tokens. Track your balance and history.
      </p>
      <div style={{ marginBottom: 18 }}>
        <div style={{
          background: "linear-gradient(101deg, #23232d 80%, #8f0a0a24)",
          border: "1px solid var(--border)",
          borderRadius: 7,
          padding: "14px 18px",
          color: "#f8efdf",
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span><b>Current Barter Balance:</b> <span style={{ color: "#8f0a0a", fontSize: "1.32em" }}>{tokenBalance} tokens</span></span>
          <button className="btn-ghost" tabIndex={0}>Send/Request Tokens</button>
        </div>
        <div>
          <b>Recent Transactions</b>
          <ul style={{padding: 0, margin: "10px 0 0 0", listStyle: "none"}}>
            {barterTxs.map(tx => (
              <li
                key={tx.id}
                style={{
                  background: "var(--nav-hover)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  margin: "8px 0",
                  padding: "9px 13px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12
                }}
              >
                <span style={{ fontWeight: 600, color: "#b1b483" }}>{tx.user}</span>
                <span style={{fontSize: "0.98em"}}> • </span>
                <span>
                  {tx.type === "Offer" ? "Offered" : "Earned"} <b>{tx.skill}</b> ({tx.hours}h)
                </span>
                <span style={{marginLeft: "auto", color: tx.status === "Completed" ? "var(--success)" : "var(--warn)", fontWeight: 600}}>
                  {tx.status}
                </span>
                <span style={{marginLeft: 18, color: "var(--text-faint)", fontSize: "0.97em"}}>{tx.date}</span>
              </li>
            ))}
          </ul>
          <div style={{marginTop: 8, color: "var(--text-secondary)", fontSize: "0.96em"}}>
            <i>Tip: Offer or request skills to earn or spend tokens. All hours exchanged are tracked below!</i>
          </div>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function PayItForwardTab() {
  // Sample data for pay-it-forward graph (simplified text demo)
  const chain = [
    { from: "Alex P.", to: "Grace L.", act: "Loaned a sewing kit", date: "May 12" },
    { from: "Grace L.", to: "Yusuf T.", act: "Helped with groceries", date: "May 15" },
    { from: "Yusuf T.", to: "Samira C.", act: "Babysat for an evening", date: "May 16" },
    { from: "Samira C.", to: "João K.", act: "Shared homegrown veggies", date: "May 20" },
  ];
  const stories = [
    {
      name: "Leah R.",
      story: "Was stranded, neighbor fixed her flat tire within 30 min. Paid it forward by making home-baked muffins for neighbors.",
      date: "May 10"
    },
    {
      name: "Tye W.",
      story: "Received tech help for free—setup a workshop to teach others basic digital skills.",
      date: "May 17"
    }
  ];
  return (
    <div className="tab-content">
      <h2>Pay-It-Forward Chain</h2>
      <p>
        Visualize the generosity chain—see who’s helped whom and inspire more good deeds in the community.
      </p>
      <section>
        <b>Active Generosity Chain</b>
        <ul style={{listStyle: "none", padding: 0, margin: "10px 0"}}>
          {chain.map((c, idx) => (
            <li key={idx} style={{
              padding: "7px 0",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid var(--border)"
            }}>
              <span style={{fontWeight:700, color: "#b1b483"}}>{c.from}</span>
              <span style={{padding: "0 5px", color: "#8f0a0a"}}>→</span>
              <span style={{fontWeight:700, color: "#8f0a0a"}}>{c.to}</span>
              <span style={{color:"var(--accent)", marginLeft: 8}} title={c.act}>{c.act.length > 26 ? c.act.substring(0,24)+"…" : c.act}</span>
              <span style={{marginLeft:'auto', fontSize:"0.96em", color: "var(--text-faint)"}}>{c.date}</span>
            </li>
          ))}
        </ul>
        <div style={{margin:'16px 0'}}><b>Gratitude Stories</b></div>
        <ul style={{listStyle: "none", padding: 0}}>
          {stories.map((st, i) => (
            <li key={i} style={{
              background: "var(--nav-hover)", border: "1px solid var(--border)",
              borderRadius: 8, margin: "9px 0", padding: "10px 15px"
            }}>
              <b style={{color:"#b1b483"}}>{st.name}:</b> <span>{st.story}</span>
              <div style={{marginTop:4, color:"var(--text-faint)", fontSize:'0.94em'}}>{st.date}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// PUBLIC_INTERFACE
function EmergencyTab() {
  // Example alert/broadcast feed
  const broadcasts = [
    { id:1, sender:"Oakridge Fire Dept", msg:"Wildfire warning: Be prepared for potential evacuation. Stay tuned for updates.", time:"5m ago", severity:"critical" },
    { id:2, sender:"Maria S.", msg:"Lost power. Anyone nearby have a charged power bank I can borrow?", time:"8m ago", severity:"request" },
    { id:3, sender:"City Alert", msg:"Scheduled water line maintenance tonight, expect low water pressure 9pm-5am.", time:"1h ago", severity:"info" }
  ];

  return (
    <div className="tab-content">
      <h2>Emergency Broadcasts</h2>
      <p>
        Receive urgent messages (within your geofence) from neighbors or authorities. Broadcast requests for help fast.
      </p>
      <section>
        <b>Recent Broadcasts</b>
        <ul style={{padding: 0, margin: "11px 0 0", listStyle: "none"}}>
          {broadcasts.map(bc => (
            <li key={bc.id} style={{
              border: "1.5px solid " + (bc.severity==="critical"? "var(--primary)": bc.severity==="request"? "var(--accent)": "var(--border)"),
              background: "var(--nav-hover)",
              borderRadius: 8,
              margin: "10px 0",
              padding: "10px 15px"
            }}>
              <div>
                <span style={{
                  fontWeight: 700,
                  color: bc.severity === "critical" ? "var(--primary)"
                          : bc.severity === "request" ? "var(--accent)" : "var(--info)"}}>
                  {bc.sender}
                </span>{" — "}
                <span>{bc.msg}</span>
              </div>
              <div style={{marginTop:4, color:"var(--text-faint)", fontSize:"0.94em"}}>
                {bc.time} {bc.severity==="critical" && <span aria-label="alert">🚨</span>}
                {bc.severity==="request" && <span aria-label="help">🙋‍♂️</span>}
              </div>
            </li>
          ))}
        </ul>
        <div style={{marginTop: 14, textAlign:"right"}}>
          <button className="btn-ghost" tabIndex={0}>Send Emergency Message</button>
        </div>
      </section>
    </div>
  );
}

// PUBLIC_INTERFACE
function AidHubTab() {
  // Example: NGO postings and volunteer needs
  const aidOrgs = [
    { name: "Oakridge Relief Collective", need: "Volunteers for meal packing", urgency:"High", spots:2 },
    { name: "Neighborhood Youth Mentors", need: "Mentors for after-school", urgency:"Medium", spots:3 },
    { name: "Homegrown Food Share", need: "Donate extra produce", urgency:"Low", spots:5 }
  ];
  return (
    <div className="tab-content">
      <h2>Local Aid Coordination Hub</h2>
      <p>
        Connect with NGOs, see volunteer needs, and coordinate local efforts. Post or find aid requests.
      </p>
      <div>
        <b>Live Needs & Volunteer Requests</b>
        <ul style={{padding:0, margin: "10px 0 0",listStyle: "none"}}>
          {aidOrgs.map((org,i) => (
            <li key={i} style={{
              background:"var(--nav-hover)",border:"1px solid var(--border)",
              borderLeft:`5px solid ${org.urgency==='High'?"var(--primary)":org.urgency==='Medium'?"var(--accent)":"var(--secondary)"}`,
              margin:"11px 0", 
              borderRadius:8,padding:"8px 14px"
            }}>
              <b style={{color:"#b1b483"}}>{org.name}</b><span style={{marginLeft:10}}>{org.need}</span>
              <span style={{marginLeft:16, fontWeight:600, color:org.urgency==='High'?'var(--primary)': 'var(--text-faint)'}}>{org.urgency} {org.spots<=2&&<b>• Spots: {org.spots}</b>}</span>
              <button className="btn-ghost" style={{marginLeft:16}}>Sign Up</button>
            </li>
          ))}
        </ul>
        <div style={{marginTop:16}}><button className="btn-ghost">Post New Aid Event</button></div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ResourceTrackerTab() {
  // Example resource lifecycle list
  const resources = [
    { item: "Children's Bike", status: "Reused", owner: "J. Sun", cycle:"3rd", statcol:"var(--success)"},
    { item: "LED Desk Lamp", status: "Donated", owner: "C. DeVito", cycle:"2nd", statcol:"var(--accent)"},
    { item: "Board Games", status: "Exchanged", owner: "A. Kaur", cycle:"4th", statcol:"var(--info)"},
    { item: "Textbooks", status: "Recycled", owner: "E. Forrester", cycle:"Final", statcol:"var(--warn)"},
  ];
  return (
    <div className="tab-content">
      <h2>Resource Lifecycle Tracker</h2>
      <p>
        Track the lifecycle of shared items—reused, donated, recycled. Help reduce local waste.
      </p>
      <div>
        <b>Recent Resource Cycles</b>
        <ul style={{padding:0, margin:"10px 0 0", listStyle: "none", display:"flex", flexWrap:"wrap", gap:"0.8em"}}>
          {resources.map((r,i) => (
            <li key={i} style={{
              background: "var(--nav-hover)", border:"1.5px solid var(--border)",
              borderRadius:7,padding:"10px 13px", minWidth:160,
              color: r.statcol, fontWeight:600
            }}>
              {r.item}<div style={{fontWeight:400, color:"var(--text-secondary)", fontSize:"0.99em"}}>
                Status: <b style={{color:r.statcol}}>{r.status}</b>
                <span style={{marginLeft:8}}>by {r.owner}</span>
              </div>
              <div style={{color:"var(--text-faint)", fontSize:"0.94em"}}>Cycle: {r.cycle}</div>
            </li>
          ))}
        </ul>
        <div style={{marginTop:8, fontSize:"0.97em", color:"var(--text-secondary)"}}>
          <span>Leaderboard: <b style={{color:"var(--success)", fontWeight:700}}>Jamie F. – 9 items reused</b></span>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function EcoRecsTab() {
  // Example green tips
  const ecoTips = [
    { icon:"♻️", label:"Reuse containers from neighbors via circular exchange." },
    { icon:"🌱", label:"Plant native species to conserve local water." },
    { icon:"🚲", label:"Offer bike-share to reduce short car trips in the area." },
    { icon:"🧺", label:"Host a 'repair instead of trash' day for small appliances." },
  ];
  return (
    <div className="tab-content">
      <h2>Eco-Friendly Recommendations</h2>
      <p>
        Suggestions for making posts, exchanges, and community actions greener and more sustainable.
      </p>
      <b>Today's Green Actions</b>
      <ul style={{margin:"10px 0",padding:0,listStyle:"none",display:"flex", gap:"2em"}}>
        {ecoTips.map((tip, idx) => (
          <li key={idx} style={{
            background:"var(--nav-hover)", borderRadius:8, border:"1px solid var(--accent)",
            color:"var(--accent)", fontWeight:600, fontSize:"1.08em",
            minWidth:110, padding:"14px 14px",display:"flex",flexDirection:"column",gap:8,alignItems:"center"
          }}>
            <span style={{fontSize:"2.1em"}} aria-label="icon">{tip.icon}</span>
            <span style={{color:"var(--text-secondary)",fontWeight:400,fontSize:"0.99em"}}>{tip.label}</span>
          </li>
        ))}
      </ul>
      <div style={{marginTop:8, color:"var(--text-faint)", fontSize:"0.95em"}}>
        <i>Tip: Small actions add up – share your own green ideas with your micro-community!</i>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function ImpactScoreTab() {
  // Dummy stats + leaderboard demo
  const stats = {
    exchanges: 32, hours: 27.5, ecoPoints: 185, ranking: 3
  };
  const leaderboard = [
    { name: "Jamie F.", score:225 },
    { name: "Grace L.", score:212 },
    { name: "Alex P.", score:185 },
    { name: "Maria S.", score:171 },
  ];
  return (
    <div className="tab-content">
      <h2>Community Impact Score</h2>
      <p>
        See your personal, group, and neighborhood stats: exchanges, hours, eco-points, and leaderboard ranking.
      </p>
      <div style={{
        display:"flex",flexWrap:"wrap",gap:"22px",margin:"0 0 22px 0",alignItems:"start"
      }}>
        <div style={{
          background:"var(--nav-hover)", borderRadius:8, border:"1px solid var(--primary)",
          padding:"18px 22px",minWidth:212,maxWidth:300
        }}>
          <b style={{color:"var(--primary)"}}>Your Stats</b>
          <ul style={{margin:"9px 0 0",padding:0,listStyle:"none"}}>
            <li>Exchanges: <b>{stats.exchanges}</b></li>
            <li>Skill Hours: <b>{stats.hours}</b></li>
            <li>Eco Points: <b style={{color:"var(--accent)"}}>{stats.ecoPoints}</b></li>
            <li>Leaderboard spot: <b style={{color:"var(--success)"}}>{stats.ranking} 🏆</b></li>
          </ul>
        </div>
        <div>
          <b style={{color:"var(--primary)"}}>Neighborhood Leaderboard</b>
          <ol style={{paddingLeft:20,margin:"9px 0 0"}}>
          {leaderboard.map((lb,i)=>(
            <li key={i} style={{color: i===0?"var(--success)":i===1?"var(--accent)":"var(--text-secondary)",fontWeight:600}}>
              {lb.name} <span style={{fontWeight:400, color:"var(--text-faint)",marginLeft:8}}>{lb.score} points</span>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function GroupsTab() {
  // Sample group data
  const groups = [
    { name:"Urban Gardeners Club",desc:"Learn, share, and build local edible gardens.",members:18, joined:true},
    { name:"Sunrise Yoga",desc:"Outdoor sessions at the park!",members:9, joined:false},
    { name:"Repair Café Crew",desc:"Fix things for neighbors together.",members:11, joined:true},
    { name:"Teen Tech Help",desc:"Mentor teens and bridge the digital gap.",members:7, joined:false}
  ];
  return (
    <div className="tab-content">
      <h2>Skill Circles & Interest Groups</h2>
      <p>
        Join, manage, or found groups: skill teams, eco clubs, volunteer crews, and more.
      </p>
      <ul style={{padding:0,margin:"10px 0",listStyle:"none"}}>
        {groups.map((g,i)=>(
          <li key={i} style={{
            border:"1px solid var(--border)", borderRadius:8,
            background:"var(--nav-hover)",margin:"8px 0",padding:"10px 15px"
          }}>
            <b style={{color:"var(--primary)"}}>{g.name}</b> <span style={{color:"var(--text-secondary)",marginLeft:8}}>
              ({g.members} members)
            </span>
            <p style={{margin:"6px 0 2px", color: "var(--text-faint)"}}>{g.desc}</p>
            <div>
              {g.joined ?
                <span style={{color:"var(--success)", fontWeight:600,fontSize:"0.97em"}}>✓ Joined</span> :
                <button className="btn-ghost" style={{fontSize:"0.97em"}}>Join</button>
              }
            </div>
          </li>
        ))}
      </ul>
      <div style={{marginTop:14}}><button className="btn-ghost">Create New Group</button></div>
    </div>
  );
}

// PUBLIC_INTERFACE
function EventsTab() {
  // Demo events
  const events = [
    { title:"Community Swap Meet", date:"Fri, May 24", desc:"Exchange items and meet your neighbors.", rsvps:19 },
    { title:"Skills Workshop: Compost Basics", date:"Mon, May 27", desc:"Learn home composting in the community garden.", rsvps:7 },
    { title:"Neighborhood Clean-Up", date:"Sat, June 1", desc:"Join the eco-drive to keep Oakridge clean!", rsvps:14 },
  ];
  return (
    <div className="tab-content">
      <h2>Local Event Calendar</h2>
      <p>
        View and RSVP for community events, workshops, meetups, and drives.
      </p>
      <ul style={{padding:0,margin:"10px 0",listStyle:"none"}}>
        {events.map((ev,i)=>(
          <li key={i} style={{
            border:"1px solid var(--border)",borderRadius:9,
            background:"var(--nav-hover)",padding:"14px 18px",margin:"9px 0"
          }}>
            <b style={{color:"var(--accent)"}}>{ev.title}</b>
            <span style={{marginLeft:16, color:"var(--info)"}}>{ev.date}</span>
            <p style={{margin:"7px 0 5px", color:"var(--text-secondary)"}}>{ev.desc}</p>
            <span style={{color:"var(--success)", fontSize:"0.95em"}}>{ev.rsvps} RSVP’d</span>
            <button className="btn-ghost" style={{marginLeft: 20}}>RSVP</button>
          </li>
        ))}
      </ul>
      <div style={{marginTop:15}}><button className="btn-ghost">Post Event</button></div>
    </div>
  );
}

// PUBLIC_INTERFACE
function MentalHealthTab() {
  // Example opt-in helpers for mental health
  const helpers = [
    {name:"Priya C.",skills:["Counseling Volunteer"],contact:"Direct msg",verified:true},
    {name:"Rohan A.",skills:["Peer Listener","Crisis Response"],contact:"Direct msg",verified:false},
    {name:"Shelley D.",skills:["Psychologist"],contact:"Referral only",verified:true}
  ];
  return (
    <div className="tab-content">
      <h2>Mental Health First-Aid Connect</h2>
      <p>
        Confidentially find volunteers or professionals for mental health support.
      </p>
      <ul style={{padding:0,margin:"10px 0",listStyle:"none"}}>
        {helpers.map((h,i)=>(
          <li key={i} style={{
            border:"1px solid var(--border)",borderRadius:8,
            background:"var(--nav-hover)",margin:"8px 0",padding:"10px 15px"
          }}>
            <b style={{color:"var(--accent)"}}>{h.name}</b>
            {h.verified && <span className="badge verified" style={{marginLeft:8}} title="Verified">✔️</span>}{" "}
            <span style={{color:"var(--info)",marginLeft:10,fontSize:"1em"}}>{h.skills.join(", ")}</span>
            <div style={{marginTop: 5, color:"var(--text-faint)", fontSize:"0.95em"}}>Contact: {h.contact}</div>
          </li>
        ))}
      </ul>
      <div style={{marginTop:10,fontSize:"0.98em",color:"var(--text-secondary)"}}>
        <i>All helpers have agreed to confidentiality standards. For emergencies, call your country's appropriate hotline.</i>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function WellnessTab() {
  // Example mood check-ins
  const prompts = [
    {date:"Today", prompt:"How are you feeling today?", mood:"😊"},
    {date:"Yesterday", prompt:"Reflect on something that made you smile.", mood:"😌"},
    {date:"Sunday", prompt:"What helped you unwind?", mood:"💤"}
  ];
  return (
    <div className="tab-content">
      <h2>Wellness & Check-In</h2>
      <p>
        Daily/weekly prompts for self check-in, mood tracking, peer wellness nudges.
      </p>
      <div>
        <b>Recent Prompts & Check-Ins</b>
        <ul style={{padding:0,margin:"10px 0",listStyle:"none",display:"flex",flexWrap:"wrap",gap:"1.1em"}}>
          {prompts.map((p,i)=>(
            <li key={i} style={{
              background:"var(--nav-hover)",border:"1px solid var(--border)",borderRadius:7,
              padding:"11px 17px",minWidth:120
            }}>
              <b>{p.date}</b> <span style={{fontSize:"1.25em"}}>{p.mood}</span>
              <div style={{marginTop:4,color:"var(--text-secondary)", fontSize:"0.99em"}}>{p.prompt}</div>
            </li>
          ))}
        </ul>
        <button className="btn-ghost">New Check-In</button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function KnowledgeArchiveTab() {
  // Example knowledge cards
  const cards = [
    {title:"How to fix a leaky faucet", author:"J. Sun", votes:7},
    {title:"Safe wild edible plants", author:"Alex P.", votes:12},
    {title:"Quick solar phone charger DIY", author:"Grace L.", votes:4}
  ];
  return (
    <div className="tab-content">
      <h2>Local Knowledge Archive</h2>
      <p>
        Browse tips, tutorials, hacks, and Q&A. Search and add local knowledge.
      </p>
      <ul style={{padding:0,margin:"10px 0",listStyle:"none"}}>
        {cards.map((c,i)=>(
          <li key={i} style={{
            background:"var(--nav-hover)",border:"1px solid var(--border)",borderRadius:7,
            margin:"7px 0",padding:"10px 15px",display:"flex",alignItems:"center",gap:14
          }}>
            <span style={{fontSize:"1.18em", color:"var(--accent)"}}>📚</span>
            <span>
              <b style={{color:"var(--primary)"}}>{c.title}</b>
              <div style={{fontSize:"0.97em",color:"var(--text-faint)"}}>By {c.author}</div>
            </span>
            <span style={{marginLeft:'auto',color:"var(--success)"}}>👍 {c.votes}</span>
          </li>
        ))}
      </ul>
      <div>
        <button className="btn-ghost">Add New Article</button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function SkillRecommenderTab() {
  // Sample recommended skills with explanations
  const recommendations = [
    { skill: "First Aid", why: "Sought after during neighborhood meetups, useful for local events." },
    { skill: "DIY Home Repair", why: "Neighbors frequently request minor repairs or tool sharing." },
    { skill: "Composting", why: "Community garden looking for more composting enthusiasts." }
  ];
  return (
    <div className="tab-content">
      <h2>AI-Powered Skill Recommender</h2>
      <p>
        Get personalized skill recommendations based on your interests, needs, and neighborhood gaps.
      </p>
      <div>
        <b>Your Recommended Skills</b>
        <ul style={{padding:0,margin:"10px 0",listStyle:"none"}}>
          {recommendations.map((rec,i)=>(
            <li key={i} style={{
              background:"var(--nav-hover)", borderLeft:"4px solid var(--info)",
              borderRadius:7, border:"1px solid var(--border)", margin:"7px 0",padding:"10px 17px"
            }}>
              <b style={{color:"var(--info)"}}>{rec.skill}</b>
              <div style={{marginTop:3,color:"var(--text-secondary)", fontSize:"0.96em"}}>{rec.why}</div>
            </li>
          ))}
        </ul>
        <div style={{color:"var(--text-faint)",fontSize:"0.96em"}}>AI-generated based on your exchanges and your area's trends.</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function TrackerTab() {
  // Demo milestone and chart cards (mockup)
  const milestones = [
    { label: "10 Skill Hours", icon:"⏰", desc:"Completed 10 hours of skill sharing." },
    { label: "5 Community Events", icon:"🎉", desc:"Attended 5 local gatherings." },
    { label: "Top 5 Eco Points", icon:"🌱", desc:"Ranked in top 5 for eco-friendliness." }
  ];
  return (
    <div className="tab-content">
      <h2>Impact Tracker Dashboard</h2>
      <p>
        Visual stats: your skill hours, eco impact, volunteering, and community milestones.
      </p>
      <div>
        <b>Recent Milestones</b>
        <ul style={{padding:0,margin:"10px 0",listStyle:"none",display:"flex",gap:"1.2em"}}>
          {milestones.map((m,i)=>(
            <li key={i} style={{
              background:"var(--nav-hover)",border:"1px solid var(--border)",borderRadius:8,
              minWidth:120,padding:"14px 17px",display:"flex",flexDirection:"column",alignItems:"center"
            }}>
              <span style={{fontSize:"2em"}}>{m.icon}</span>
              <b>{m.label}</b>
              <span style={{fontSize:"0.97em",color:"var(--text-faint)", marginTop:6}}>{m.desc}</span>
            </li>
          ))}
        </ul>
        <div style={{marginTop:16}}>
          <b style={{color:"var(--success)"}}>Skill/Eco Hour Trend Chart (mockup)</b>
          <div style={{
            background:"repeating-linear-gradient(-45deg, #312d34, #312d34 12px, #233514 12px, #233514 24px)",
            height:64, borderRadius:9, marginTop:6, border:"1px dashed var(--accent)"
          }}><span style={{position:"relative",top:22,left:20,fontSize:"0.93em",color:"var(--accent)"}}>[Graph Placeholder]</span></div>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function DisasterToolsTab() {
  // Sample prep guides and shelters (for demonstration)
  const guides = [
    { title:"72-Hour Emergency Kit",desc:"Checklist: food, water, flashlight, first-aid, phone charger.",icon:"🧰" },
    { title:"Know Your Local Shelters",desc:"Nearest: Oakridge Community Hall, 0.8km from you.",icon:"🏫" },
    { title:"What to do in a blackout",desc:"Store water, unplug appliances, check on neighbors.",icon:"💡" }
  ];
  return (
    <div className="tab-content">
      <h2>Disaster Readiness Tools</h2>
      <p>
        Quickly prep for emergencies—access checklists, shelter maps, and volunteer dashboards.
      </p>
      <ul style={{padding:0,margin:"10px 0",listStyle:"none"}}>
        {guides.map((g,i)=>(
          <li key={i} style={{
            background:"var(--nav-hover)",
            border:"1px solid var(--border)",borderLeft:"6px solid var(--primary)",
            borderRadius:8,margin:"9px 0",padding:"12px 18px",display:"flex",alignItems:"center",gap:20
          }}>
            <span style={{fontSize:"2em"}}>{g.icon}</span>
            <span>
              <b>{g.title}</b>
              <div style={{fontSize:"0.97em",color:"var(--text-faint)"}}>{g.desc}</div>
            </span>
          </li>
        ))}
      </ul>
      <div>
        <button className="btn-ghost">Find Nearest Shelter</button>
        <button className="btn-ghost" style={{marginLeft:14}}>Start Disaster Checklist</button>
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
