import React from "react";

/*
  PUBLIC_INTERFACE

  Leaderboard
  Community points leaderboard UI for gamification.
  Props:
    - users: array of { name, points, verified, isCurrentUser }
    - open: boolean (show or not, for modal overlay style)
    - onClose: function called to close modal/overlay
    - accentColor, primaryColor: strings (for styling)
*/
export default function Leaderboard({ users, open = false, onClose, accentColor = "#63d4a7", primaryColor = "#2563eb" }) {
  if (open === false && typeof open !== "undefined") return null;
  const sorted = users ? [...users].sort((a, b) => b.points - a.points) : [];
  return (
    <div
      style={{
        position: open ? "fixed" : "relative",
        zIndex: open ? 12001 : 1,
        left: open ? 0 : undefined,
        top: open ? 0 : undefined,
        width: open ? "100vw" : "100%",
        height: open ? "100vh" : undefined,
        background: open ? "rgba(48,67,99,0.16)" : "none",
        display: open ? "flex" : "block",
        alignItems: open ? "center" : "unset",
        justifyContent: open ? "center" : "unset"
      }}
      aria-modal={open ? "true" : undefined}
      role={open ? "dialog" : undefined}
      tabIndex={open ? -1 : undefined}
      className={open ? "overlay-backdrop" : ""}
    >
      <div
        className="overlay-content"
        style={{
          maxWidth: 430,
          minWidth: 260,
          borderLeft: `7px solid ${accentColor}`,
          borderRadius: 17,
          background: "#fff",
          color: "#1d2e36"
        }}
      >
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{
            color: accentColor, fontWeight: 800, fontSize: 19, letterSpacing: 0.7
          }}>
            Community Leaderboard
          </span>
          {onClose && open && (
            <button
              className="overlay-close"
              aria-label="Close leaderboard"
              onClick={onClose}
              style={{ fontSize: 25, color: primaryColor, background: "transparent", border: 0 }}
            >
              ×
            </button>
          )}
        </div>
        <div style={{ color: "#506174", fontSize: 15, marginBottom: 6 }}>
          Top contributors earn points for helping, fulfilling requests, and verified support!
        </div>
        <ol style={{
          listStyle: "none", padding: 0, margin: "0 0 8px 0"
        }}>
          {sorted.map((user, i) => (
            <li key={user.name}
              style={{
                display: "flex", alignItems: "center",
                background: user.isCurrentUser ? accentColor : (i < 3 ? "#fcfcf2" : "transparent"),
                color: user.isCurrentUser ? "#fff" : "#293432",
                fontWeight: user.isCurrentUser ? 700 : 500,
                margin: "3px 0", padding: "8px 11px",
                borderRadius: 9,
                borderLeft: i === 0 ? `5px solid ${primaryColor}` : (i < 3 ? `4px solid ${accentColor}` : `3px solid #eee`),
                fontSize: 15.5,
                transition: "background 0.16s"
              }}>
              <span style={{
                background: i === 0 ? primaryColor : (i < 3 ? accentColor : "#e2e2e4"),
                color: "#fff",
                fontWeight: 800,
                minWidth: 27, borderRadius: 13, textAlign: "center", marginRight: 12, padding: "3px 0 3px 0"
              }}>{i + 1}</span>
              <span style={{
                marginRight: 8, fontWeight: 600
              }}>{user.name}</span>
              {user.verified && (
                <span style={{
                  background: "#fcf1a6",
                  color: "#f5a100",
                  borderRadius: 8,
                  padding: "2px 7px",
                  fontSize: 11,
                  fontWeight: 700,
                  marginLeft: 2,
                  marginRight: 2
                }}>✔ Peer Verified</span>
              )}
              <span style={{
                marginLeft: "auto",
                background: "#edf8f1",
                borderRadius: 7,
                color: "#278555",
                fontWeight: 700,
                fontSize: 14,
                padding: "2px 10px",
              }}>
                {user.points} pts
              </span>
              {user.isCurrentUser &&
                <span style={{
                  background: "#fff2",
                  borderRadius: 8,
                  fontWeight: 500,
                  fontSize: 11.5,
                  color: accentColor,
                  marginLeft: 7,
                  padding: "2.5px 6px"
                }}>[You]</span>
              }
            </li>
          ))}
        </ol>
        <div style={{color: "#adb6b2", fontSize: 13, fontStyle: "italic" }}>
          Earn more: Fulfill help requests, verified exchanges, & offer support!
        </div>
      </div>
    </div>
  );
}
