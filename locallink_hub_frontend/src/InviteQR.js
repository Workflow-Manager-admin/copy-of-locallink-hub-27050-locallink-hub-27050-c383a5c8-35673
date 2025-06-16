import React, { useState } from "react";
import QRCode from "qrcode.react";
import { QrReader } from "react-qr-reader";

/*
  PUBLIC_INTERFACE

  InviteQR
  - QR code invitation: generate QR of a join/invite link, and scan QR to join.
  Props:
    - open: boolean (show overlay)
    - onClose: function
    - inviteLink: string (the base invite URL; if absent, will show disabled)
    - onJoin: function(link) (called if a valid link is detected from scan)
*/
const ACCENT = "#63d4a7";
const SECONDARY = "#fbbf24";
const PRIMARY = "#2563eb";
export default function InviteQR({ open, onClose, inviteLink, onJoin }) {
  const [mode, setMode] = useState("show"); // "show" or "scan"
  const [scanResult, setScanResult] = useState("");
  const [error, setError] = useState(null);

  if (!open) return null;
  return (
    <div className="overlay-backdrop" aria-modal="true" role="dialog" tabIndex={-1}>
      <div
        className="overlay-content"
        style={{
          maxWidth: 400,
          borderLeft: `7px solid ${mode === "show" ? ACCENT : PRIMARY}`,
          borderRadius: 22,
          background: "#fff",
          color: "#222e36"
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8
        }}>
          <div style={{
            color: mode === "show" ? ACCENT : PRIMARY,
            fontWeight: 800, fontSize: 18, letterSpacing: 1
          }}>
            {mode === "show" ? "Share QR Invite" : "Scan QR to Join"}
          </div>
          <button className="overlay-close"
            aria-label="Close QR"
            onClick={onClose}
            tabIndex={0}
            style={{ outline: 'none', border: 'none', fontSize: 25, color: SECONDARY }}
            onKeyDown={e => { if (["Enter", " ", "Escape"].includes(e.key)) onClose(); }}
          >×</button>
        </div>
        <div style={{ display: "flex", gap: 9, marginBottom: 17 }}>
          <button onClick={() => setMode("show")}
            style={{
              fontWeight: 600, color: mode === "show" ? "#fff" : ACCENT,
              background: mode === "show" ? ACCENT : "#eee",
              borderRadius: 9, border: "none", padding: "7px 17px", fontSize: 15, cursor: "pointer"
            }}>Show QR</button>
          <button onClick={() => setMode("scan")}
            style={{
              fontWeight: 600, color: mode === "scan" ? "#fff" : PRIMARY,
              background: mode === "scan" ? PRIMARY : "#eee",
              borderRadius: 9, border: "none", padding: "7px 17px", fontSize: 15, cursor: "pointer"
            }}>Scan QR</button>
        </div>
        {mode === "show" ? (
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            {inviteLink ? (
              <>
                <QRCode value={inviteLink} size={170} fgColor={PRIMARY} bgColor="#fff" />
                <div style={{ fontSize: 14, color: "#1c2929", margin: "11px 0 0 0", wordBreak: "break-all" }}>
                  <b>Invite Link:</b>
                  <div style={{ background: "#f8fafc", borderRadius: 6, marginTop: 2, padding: "3px 5px" }}>{inviteLink}</div>
                </div>
              </>
            ) : (
              <div style={{ color: "#c83842" }}>No invite link available</div>
            )}
            <div style={{ fontSize: 13.2, color: "#686", marginTop: 7 }}>
              Show this code to a neighbor; they can scan to join!
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ minHeight: 170, marginBottom: 8 }}>
              <QrReader
                constraints={{ facingMode: 'environment' }}
                scanDelay={500}
                onResult={result => {
                  if (result?.text) {
                    setScanResult(result.text);
                    setError(null);
                  }
                }}
                videoStyle={{ borderRadius: 12, width: "96%" }}
                containerStyle={{ display: "flex", justifyContent: "center" }}
              />
            </div>
            {scanResult &&
              <div style={{ margin: "10px 0", color: "#2563eb", wordBreak: "break-all", fontSize: 14 }}>
                <div>
                  <b>Scanned Link:</b>
                  <div style={{ background: "#f6f8ee", borderRadius: 5, padding: "3px 8px", marginTop: 3 }}>{scanResult}</div>
                </div>
                <button
                  className="btn"
                  style={{
                    marginTop: 13, background: ACCENT, color: "#fff",
                    fontWeight: 600, borderRadius: 7, border: "none", padding: "7px 19px", fontSize: 14
                  }}
                  onClick={() => {
                    if (onJoin) { onJoin(scanResult); }
                  }}
                >Join Community</button>
              </div>
            }
            {error && <div style={{ color: "#c83842" }}>{error}</div>}
            <div style={{ fontSize: 12.5, color: "#888" }}>
              Scan a LocalLink micro-community invite QR from another member.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
