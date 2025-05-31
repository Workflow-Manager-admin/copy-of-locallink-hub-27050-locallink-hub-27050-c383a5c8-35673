// MapDashboard: Side panel displaying user's micro-community on a map with geofence
import React from "react";

/**
 * MapDashboard component: shows static or dynamic map with user's micro-community area.
 */
// PUBLIC_INTERFACE
function MapDashboard({ microCommunity }) {
  // In a real app, integrate with Map APIs (Mapbox/Google Maps) and geo-data
  return (
    <div className="llh-map-card">
      <div className="llh-map-card-header">
        <span role="img" aria-label="map">🗺️</span> Community Map
      </div>
      <div className="llh-map-imgbox">
        {/* Simulated map image with a circle for geofence */}
        <svg width="100%" height="120" viewBox="0 0 320 120">
          <rect width="320" height="120" fill="#23221e" rx="13"/>
          <circle cx="160" cy="60" r="45" fill="#8f0a0a44" stroke="#8f0a0a" strokeWidth="3"/>
          <text x="50%" y="62" fill="#fff" textAnchor="middle" fontSize="18" fontWeight="bold">
            {microCommunity}
          </text>
        </svg>
      </div>
      <div className="llh-map-geofence-note">
        You're in: <span>{microCommunity}</span>
      </div>
    </div>
  )
}

export default MapDashboard;
