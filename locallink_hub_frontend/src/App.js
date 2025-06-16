import React, { useState } from 'react';
import './App.css';
import {
  requestNotificationPermission,
  triggerNotification,
  isNotificationEnabled,
  loadNotificationSettings
} from './notifications';
import NotificationSettingsDialog from './NotificationSettingsDialog';
import CalendarScheduler from "./CalendarScheduler";
import InviteQR from "./InviteQR";
import Leaderboard from "./Leaderboard";

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

/* global google */
function MapDashboard({ isNarrow }) {
  // PUBLIC_INTERFACE
  // This component loads Google Maps JS API dynamically and renders a map.
  // It ensures responsiveness by using container size and re-centering on resize.
  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);
  const [hasError, setHasError] = React.useState(false);

  // Google Maps API key (should be moved to env/secure config in production)
  const GOOGLE_MAPS_API_KEY = "AIzaSyBQxy5JfKUN0UyPTKMKbMyrnFBY3TVzrkE";

  // Helper to dynamically load Google Maps JS API if window.google is not present
  function loadGoogleMapsApi(cb) {
    if (window.google && window.google.maps) {
      cb();
    } else if (document.getElementById('google-maps-js')) {
      document.getElementById('google-maps-js').addEventListener('load', cb);
    } else {
      const script = document.createElement('script');
      script.id = 'google-maps-js';
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = cb;
      script.onerror = () => setHasError(true);
      document.body.appendChild(script);
    }
  }

  React.useEffect(() => {
    let didCancel = false;
    function initializeMap() {
      if (!mapRef.current || (window.google && !window.google.maps)) return;
      // Choose a rough default: city center of a large area or user location fallback
      const center = { lat: 37.773972, lng: -122.431297 }; // San Francisco, placeholder
      // If already initialized, just update size
      if (mapInstance.current) {
        const mapDiv = mapRef.current;
        google.maps.event.trigger(mapDiv, 'resize');
        mapInstance.current.setCenter(center);
        return;
      }
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
        // You'll want to tune the map styles to fit dark/light as desired
        disableDefaultUI: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
      // Add radius/geofenced overlay circle (1km/2km radius)
      new window.google.maps.Circle({
        strokeColor: ACCENT,
        strokeOpacity: 0.68,
        strokeWeight: 3,
        fillColor: ACCENT,
        fillOpacity: 0.13,
        map: mapInstance.current,
        center,
        radius: 1000, // 1 km radius
      });
    }
    // Dynamically load only once per mount
    loadGoogleMapsApi(() => {
      if (!didCancel) initializeMap();
    });
    // Responsive: Resize/re-center on width change
    function handleResize() {
      if (
        mapInstance.current &&
        window.google &&
        window.google.maps &&
        mapRef.current
      ) {
        window.google.maps.event.trigger(mapRef.current, "resize");
        // Optionally adjust zoom/center here for extreme mobile screens
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      didCancel = true;
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
  }, [isNarrow]);

  return (
    <div
      className="map-dashboard"
      style={{
        width: '100%',
        height: isNarrow ? 170 : 310,
        minHeight: isNarrow ? 108 : 188,
        borderRadius: 17,
        background: CARD_BG,
        border: `1.7px solid ${BG_PANEL}`,
        boxShadow: '0 2px 14px 0 rgba(67,117,187,.06)',
        marginBottom: 17,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        transition: "height 0.18s"
      }}
    >
      {hasError ? (
        <div style={{ padding: 32, color: 'red', textAlign: 'center', fontWeight: 600 }}>
          Error loading Google Maps.<br />Please check your internet or API key.
        </div>
      ) : (
        <>
          <div
            ref={mapRef}
            style={{
              width: '100%',
              height: '100%',
              minHeight: isNarrow ? 108 : 188,
              borderRadius: 17,
              position: 'relative',
              zIndex: 2,
              background: '#deddcc'
            }}
            aria-label="Local Community Map"
            tabIndex={0}
          />
          <div
            style={{
              position: 'absolute',
              top: 13,
              left: 14,
              color: ACCENT,
              fontWeight: 800,
              fontSize: isNarrow ? 15.7 : 21.2,
              letterSpacing: 0.35,
              zIndex: 11,
              background: "rgba(255,255,255,0.89)",
              borderRadius: 10,
              padding: isNarrow ? "3px 8px" : "5px 12px",
              boxShadow: "0 1px 7px rgba(70,90,110,0.08)"
            }}
          >
            Your Micro-Community Map
          </div>
          <div
            style={{
              position: 'absolute',
              left: 15,
              top: isNarrow ? 36 : 44,
              color: SECONDARY,
              fontSize: isNarrow ? 11.5 : 15,
              fontWeight: 500,
              background: "rgba(248,239,210,0.85)",
              borderRadius: 6,
              padding: isNarrow ? "2px 6px" : "4px 9px",
              zIndex: 10
            }}
          >
            (1-2km radius geofenced area)
          </div>
        </>
      )}
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

/**
 * PostFilterBar
 * Props:
 *   - filter: { distance, needTypes, availOnly }
 *   - onChange: callback(newFilter)
 *   - options: { availableNeedTypes: [str], minDistance, maxDistance }
 *   - isNarrow: bool (for layout)
 */
function PostFilterBar({ filter, onChange, options, isNarrow }) {
  const { availableNeedTypes, minDistance, maxDistance } = options;
  // Controlled filter form elements
  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 1.5px 5px rgba(44,77,99,.09)",
      padding: isNarrow ? "10px 4px" : "12px 22px",
      marginBottom: isNarrow ? 10 : 19,
      marginTop: 2,
      display: 'flex',
      flexDirection: isNarrow ? "column" : "row",
      gap: isNarrow ? 8 : 17,
      alignItems: isNarrow ? "stretch" : "center"
    }}>
      <label style={{display:"flex",alignItems:"center",gap:6, fontSize: isNarrow?13.8:15}}>
        Distance:&nbsp;
        <select
          value={filter.distance}
          onChange={e => onChange({...filter, distance: Number(e.target.value)})}
          style={{
            fontSize: isNarrow?13.8:15, padding: "2px 8px", borderRadius: 7, border: "1.1px solid #bbb"
          }}
        >
          {[0.5, 1, 2, 3, 5].map(n => n >= minDistance && n <= maxDistance ? (
            <option key={n} value={n}>{n} km</option>
          ) : null)}
        </select>
      </label>
      <label style={{display:"flex",alignItems:"center",gap:6, fontSize: isNarrow?13.8:15}}>
        Need:&nbsp;
        <select
          multiple
          value={filter.needTypes}
          size={isNarrow?2:availableNeedTypes.length}
          style={{
            fontSize: isNarrow?13.5:15, borderRadius: 7, border: "1.1px solid #bbb", width: isNarrow?90: undefined
          }}
          onChange={e => {
            const opts = [...e.target.options].filter(o => o.selected).map(o => o.value);
            onChange({...filter, needTypes: opts});
          }}
        >
          {availableNeedTypes.map(nt =>
            <option key={nt} value={nt}>{nt}</option>
          )}
        </select>
      </label>
      <label style={{display:"flex",alignItems:"center",gap:6, fontSize:isNarrow?13.5:15}}>
        <input
          type="checkbox"
          checked={filter.availOnly}
          style={{ width: 16, height: 16 }}
          onChange={e => onChange({...filter, availOnly: e.target.checked})}
        />
        Available Only
      </label>
    </div>
  );
}

// FAKE post/mock data with metadata for filtering
const skillMockPosts = [
  {
    id: 1,
    user: "Evelyn C.",
    verified: true,
    type: "Offer",
    needType: "Tutoring",
    label: "can tutor Math Sat/Sun.",
    distance: 0.9,
    availability: "weekend",
    available: true,
    color: "#69a989"
  },
  {
    id: 2,
    user: "Jan P.",
    verified: false,
    type: "Offer",
    needType: "Music",
    label: "offers Guitar Lessons for exchange.",
    distance: 1.2,
    availability: "weekday",
    available: true,
    color: ACCENT
  },
  {
    id: 3,
    user: "Sara K.",
    verified: false,
    type: "Request",
    needType: "IT Help",
    label: "requests IT Help this weekend!",
    distance: 0.4,
    availability: "weekend",
    available: false,
    color: PRIMARY
  },
];

const skillNeedTypes = ["Tutoring", "Music", "IT Help"];


function SkillExchangeTab({ aiSuggestOverlay, postFilter, onFilterChange, isNarrow, onBookMeetingClick }) {
  // Filter posts
  const filtered = skillMockPosts.filter(post =>
    post.distance <= postFilter.distance &&
    (postFilter.needTypes.length===0 || postFilter.needTypes.includes(post.needType)) &&
    (!postFilter.availOnly || post.available)
  );
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>
        Skill Exchange
        <button
          className="btn"
          style={{
            marginLeft: 18,
            background: ACCENT,
            color: "#19191c",
            fontWeight: 600,
            fontSize: isNarrow ? 13.4 : 15,
            padding: isNarrow ? "8px 9px" : "8px 15px",
            borderRadius: 7,
            border: "none"
          }}
          onClick={onBookMeetingClick}
        >Book Exchange/Meeting</button>
      </h3>
      <div style={{ color: SECONDARY, fontSize: 15, marginBottom: 8 }}>
        Offer or request help from neighbors with verified skills.
      </div>
      <PostFilterBar
        filter={postFilter}
        onChange={onFilterChange}
        options={{ availableNeedTypes: skillNeedTypes, minDistance: 0.5, maxDistance: 5 }}
        isNarrow={isNarrow}
      />
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
        {filtered.length === 0 &&
          <li style={{ color: "#c83842", fontWeight: 500, padding: 12 }}>
            No posts match these filters.
          </li>
        }
        {filtered.map(post => (
          <li style={listItemStyle} key={post.id}>
            <span style={profilePicStyle(post.color)}></span>
            <div>
              <b>{post.user}</b>
              {post.verified && <span style={badgeStyle}>Peer Verified</span>}{" "}
              {post.label}
              <span style={{
                background: "#eee9",
                color: "#333",
                marginLeft: 8,
                borderRadius: 7,
                padding: "2px 7px",
                fontSize: 12
              }}>
                {post.type} - {post.needType}, {post.distance}km, {post.available ? "Available" : "Not Available"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const resourceMockPosts = [
  {
    id: 1,
    user: "Stacy Y.",
    verified: false,
    type: "Offer",
    needType: "Board Games",
    label: "is giving away Board Games.",
    distance: 1.1,
    available: true,
    color: ACCENT
  },
  {
    id: 2,
    user: "Roger Q.",
    verified: false,
    type: "Offer",
    needType: "Homegrown Tomatoes",
    label: "offers Homegrown Tomatoes.",
    distance: 2.0,
    available: false,
    color: SECONDARY
  },
  {
    id: 3,
    user: "Lina P.",
    verified: false,
    type: "Request",
    needType: "Stackable Shelves",
    label: "requests Stackable Shelves for a local project.",
    distance: 0.7,
    available: true,
    color: "#964B00"
  },
];
const resourceNeedTypes = ["Board Games", "Homegrown Tomatoes", "Stackable Shelves"];

function ResourceReupTab({ aiSuggestOverlay, postFilter, onFilterChange, isNarrow, onBookMeetingClick }) {
  const filtered = resourceMockPosts.filter(post =>
    post.distance <= postFilter.distance &&
    (postFilter.needTypes.length===0 || postFilter.needTypes.includes(post.needType)) &&
    (!postFilter.availOnly || post.available)
  );
  return (
    <section>
      <h3 style={{ color: PRIMARY, fontWeight: 600 }}>
        Resource Re-Up
        <button
          className="btn"
          style={{
            marginLeft: 18,
            background: ACCENT,
            color: "#19191c",
            fontWeight: 600,
            fontSize: isNarrow ? 13.4 : 15,
            padding: isNarrow ? "8px 9px" : "8px 15px",
            borderRadius: 7,
            border: "none"
          }}
          onClick={onBookMeetingClick}
        >Book Exchange/Meeting</button>
      </h3>
      <div style={{ color: SECONDARY, fontSize: 15, marginBottom: 8 }}>
        List unneeded items for exchange or free within your micro-community.
      </div>
      <PostFilterBar
        filter={postFilter}
        onChange={onFilterChange}
        options={{ availableNeedTypes: resourceNeedTypes, minDistance: 0.5, maxDistance: 5 }}
        isNarrow={isNarrow}
      />
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
        {filtered.length === 0 &&
          <li style={{ color: "#c83842", fontWeight: 500, padding: 12 }}>
            No posts match these filters.
          </li>
        }
        {filtered.map(post => (
          <li style={listItemStyle} key={post.id}>
            <span style={profilePicStyle(post.color)}></span>
            <div>
              <b>{post.user}</b>
              {post.verified && <span style={badgeStyle}>Peer Verified</span>}{" "}
              {post.label}
              <span style={{
                background: "#eee9",
                color: "#333",
                marginLeft: 8,
                borderRadius: 7,
                padding: "2px 7px",
                fontSize: 12
              }}>
                {post.type} - {post.needType}, {post.distance}km, {post.available ? "Available" : "Not Available"}
              </span>
            </div>
          </li>
        ))}
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

/*
 * PUBLIC_INTERFACE
 * App with post filtering state for Skill Exchange and Resource Re-Up, passes filter state/handlers to relevant tab components.
 */
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

  // Post filter state for each main filterable tab
  const [skillPostFilter, setSkillPostFilter] = React.useState({
    distance: 2,
    needTypes: [],
    availOnly: false
  });
  const [resourcePostFilter, setResourcePostFilter] = React.useState({
    distance: 2,
    needTypes: [],
    availOnly: false
  });

  // Calendar/scheduler state (simply store events in memory for demo - would come from backend)
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [calendarEvents, setCalendarEvents] = React.useState([
    // Example: { title: "Skill Exchange", datetime: "2024-06-19T14:00:00", type: "meeting", participant: "You" }
  ]);
  // Gamification/Points and leaderboard state
  const [userPoints, setUserPoints] = React.useState({
    "You": { name: "You", points: 55, verified: true }, // current user
    "Evelyn C.": { name: "Evelyn C.", points: 108, verified: true },
    "Sara K.": { name: "Sara K.", points: 79, verified: false },
    "Jan P.": { name: "Jan P.", points: 40, verified: false },
    "Lina P.": { name: "Lina P.", points: 22, verified: false },
    "Roger Q.": { name: "Roger Q.", points: 10, verified: false }
  });
  const loggedInUser = "You";
  // Show leaderboard overlay
  const [leaderboardOpen, setLeaderboardOpen] = React.useState(false);

  // Simulate updating user points - called when user does something helpful/supportive
  function incrementPoints(user, num = 10, reason = "") {
    setUserPoints(points => {
      if (!(user in points)) return points; // skip if not exist
      return {
        ...points,
        [user]: {
          ...points[user],
          points: points[user].points + num,
          lastAction: reason || null
        }
      };
    });
  }
  // Example: After verified exchange, meeting, or request fulfillment
  function handleHelpAction(type = "skill") {
    incrementPoints(loggedInUser, 15, "Fulfilling a request");
  }
  function handleVerifiedExchange() {
    incrementPoints(loggedInUser, 25, "Verified Exchange");
  }
  function handleSupportGiven() {
    incrementPoints(loggedInUser, 20, "Support Given");
  }

  function handleBookSlot({ date }) {
    // Check if already booked by user, toggle remove/cancel if so
    const idx = calendarEvents.findIndex(ev => {
      const ed = new Date(ev.datetime);
      return ed.getTime() === date.getTime() && ev.participant === loggedInUser;
    });
    if (idx > -1) {
      // Remove user's own booking
      setCalendarEvents(evts => evts.filter((_, i) => i !== idx));
      // Optionally deduct points? Leave unchanged for simplicity.
    } else {
      setCalendarEvents(evts => [
        ...evts,
        {
          title: "Exchange/Meeting",
          datetime: date.toISOString(),
          type: "meeting",
          participant: loggedInUser
        }
      ]);
      // Reward booking a meeting/exchange
      incrementPoints(loggedInUser, 5, "Booked Exchange/Meeting");
    }
  }

  // TABS and navigation
  // Add Gamification button at dashboard, tie helpful actions to points (simulate for demo)
  const TABS = [
    {
      label: "Skill Exchange",
      id: "skills",
      // Provide filter state/handlers
      component: (
        <SkillExchangeTab
          aiSuggestOverlay={!isNarrow}
          postFilter={skillPostFilter}
          onFilterChange={setSkillPostFilter}
          isNarrow={isNarrow}
          onBookMeetingClick={() => setCalendarOpen(true)}
        />
      )
    },
    {
      label: "Resource Re-Up",
      id: "resources",
      component: (
        <ResourceReupTab
          aiSuggestOverlay={!isNarrow}
          postFilter={resourcePostFilter}
          onFilterChange={setResourcePostFilter}
          isNarrow={isNarrow}
          onBookMeetingClick={() => setCalendarOpen(true)}
        />
      )
    },
    { label: "Community Fund", id: "fund", component: <CommunityFundTab /> },
    { label: "Crisis Support", id: "crisis", component: <CrisisSupportTab /> },
    // Optionally: add leaderboard here as a tab. For now, show as overlay.
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  // QR Invite overlay state
  const [inviteOverlay, setInviteOverlay] = useState(false);

  // Overlay state
  const [aiOverlay, setAiOverlay] = useState(false);
  const [alertsOverlay, setAlertsOverlay] = useState(false);


  // Simulated invite link logic (in real app, could be user or community-dependent)
  // For demo, use a fixed link pattern; in production this would be dynamically generated.
  const inviteLink = "https://locallink.app/join/demo-community-001";

  // Handle join attempt from scanned QR
  function handleInviteJoin(link) {
    window.alert(
      "Join via invite:\n" +
      link +
      "\n(This would start the join flow in a real app!)"
    );
    setInviteOverlay(false);
  }

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
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                fontWeight: 400, fontSize: 14,
                color: '#fff',
                background: ACCENT, borderRadius: 8,
                padding: '7px 16px',
                letterSpacing: 1,
              }}>
                <span style={{ marginRight: 9 }}>Beta</span>
              </div>
              <button
                className="btn"
                style={{
                  background: PRIMARY,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 8,
                  border: "none",
                  marginLeft: 7,
                  padding: "7px 15px",
                  outline: "none",
                  cursor: "pointer"
                }}
                onClick={() => setInviteOverlay(true)}
                aria-label="Invite to Community"
                title="Share or scan QR code to invite/join"
              >
                <span style={{ fontSize: 17, marginRight: 4 }} role="img" aria-label="qr">🔗</span>
                Invite
              </button>
              <button
                className="btn"
                style={{
                  background: ACCENT,
                  color: "#23250f",
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 8,
                  border: "none",
                  marginLeft: 7,
                  padding: "7px 15px",
                  outline: "none",
                  cursor: "pointer"
                }}
                onClick={() => setLeaderboardOpen(true)}
                aria-label="Show leaderboard"
                title="Show Community Leaderboard"
              >
                <span role="img" aria-label="trophy" style={{ fontSize: 16, marginRight: 4 }}>🏆</span>
                Leaderboard
              </button>
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
          {/* Mini Gamification: My Points and encourage actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 9 }}>
            <span style={{
              background: "#63d4a7", color: "#fff", fontWeight: 800,
              fontSize: 16, borderRadius: 9, padding: "4px 16px"
            }}>
              <span style={{ marginRight: 6, fontSize: 19 }}>⭐</span>
              My Points: {userPoints[loggedInUser]?.points ?? 0}
            </span>
            <button
              className="btn"
              style={{
                background: PRIMARY, color: "#fff", fontWeight: 600, fontSize: 13,
                borderRadius: 7, padding: "7px 16px"
              }}
              title="Simulate: Help a neighbor/fulfill request"
              onClick={() => handleHelpAction()}
            >+ Helped Neighbor</button>
            <button
              className="btn"
              style={{
                background: ACCENT, color: "#163213", fontWeight: 600, fontSize: 13,
                borderRadius: 7, padding: "7px 13px"
              }}
              title="Simulate: Verified Exchange"
              onClick={() => handleVerifiedExchange()}
            >+ Verified Exchange</button>
            <button
              className="btn"
              style={{
                background: SECONDARY, color: "#494700", fontWeight: 600, fontSize: 13,
                borderRadius: 7, padding: "7px 13px"
              }}
              title="Simulate: Provided Support"
              onClick={() => handleSupportGiven()}
            >+ Support Given</button>
            <span style={{ marginLeft: "auto" }}>
              <button
                style={{ background: "transparent", border: "none", color: ACCENT, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setLeaderboardOpen(true)}
                aria-label="Show Leaderboard"
              >
                See Leaderboard &gt;
              </button>
            </span>
          </div>
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
        {/* Overlays (AI Suggestions, Alerts, Calendar Scheduling, Leaderboard) */}
        <AISuggestionsOverlay open={aiOverlay} onClose={() => setAiOverlay(false)} type={activeTab === 'resources' ? 'resource' : 'skill'} />
        <AlertsOverlay open={alertsOverlay} onClose={() => setAlertsOverlay(false)} />
        <CalendarScheduler
          open={calendarOpen}
          onClose={() => setCalendarOpen(false)}
          onBookSlot={handleBookSlot}
          events={calendarEvents}
          user={loggedInUser}
        />
        <InviteQR
          open={inviteOverlay}
          onClose={() => setInviteOverlay(false)}
          inviteLink={inviteLink}
          onJoin={handleInviteJoin}
        />
        {/* Gamification Leaderboard */}
        <Leaderboard
          users={Object.values(userPoints).map((u) =>
            u.name === loggedInUser ? { ...u, isCurrentUser: true } : u
          )}
          open={leaderboardOpen}
          onClose={() => setLeaderboardOpen(false)}
          accentColor={ACCENT}
          primaryColor={PRIMARY}
        />
      </main>
    </div>
  );
}

export default App;
