import React from "react";
import {
  requestNotificationPermission,
  isNotificationEnabled,
  saveNotificationSettings,
  loadNotificationSettings
} from "./notifications";

/* PUBLIC_INTERFACE */
/**
 * NotificationSettingsDialog
 * Modal/dialog for viewing and modifying browser notification settings.
 * Props:
 * - open: boolean (show/hide dialog)
 * - onClose: function
 */
export default function NotificationSettingsDialog({ open, onClose }) {
  const [permission, setPermission] = React.useState("default");
  const [settings, setSettings] = React.useState(loadNotificationSettings());
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setPermission(Notification?.permission || "unsupported");
    setSettings(loadNotificationSettings());
  }, [open]);

  function handlePermissionRequest() {
    setError(null);
    requestNotificationPermission()
      .then((res) => setPermission(res))
      .catch(() => setError("Could not update browser permissions."));
  }

  function handleToggle(e) {
    const enabled = e.target.checked;
    setSettings((cur) => {
      const ns = { ...cur, enabled };
      saveNotificationSettings(ns);
      return ns;
    });
  }

  if (!open) return null;
  return (
    <div className="overlay-backdrop" tabIndex={-1} aria-modal="true" role="dialog" style={{ zIndex: 11000 }}>
      <div className="overlay-content" style={{ maxWidth: 430, borderLeft: "5px solid #63d4a7" }}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8}}>
          <div style={{ color: "#63d4a7", fontWeight: 800, fontSize: 19, letterSpacing: 0.7}}>
            Notification Settings
          </div>
          <button className="overlay-close" onClick={onClose} aria-label="Close notification settings" style={{fontSize:26}}>×</button>
        </div>
        <div style={{fontSize: 15.3, marginBottom:8, color: "#506174"}}>
          Enable browser push notifications for new posts, urgent alerts, and crisis updates in your local community.
        </div>
        <div>
          <label style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <input type="checkbox"
              checked={settings.enabled && permission==="granted"}
              disabled={permission!=="granted"}
              onChange={handleToggle}
              style={{width:17,height:17}}
            />
            Enable browser notifications for this site
          </label>
          <div style={{ fontSize: 14.2, color: permission==="granted"?"#69a989":"#b98969", marginBottom:6 }}>
            Permission: {permission==="default"
            ? "Not requested" : permission==="granted"
            ? "Granted" : permission==="denied"
            ? "Denied" : "Unsupported"}
            {permission==="default" && (
              <button
                className="btn"
                style={{marginLeft:15,fontSize:13,padding:"7px 19px"}}
                onClick={handlePermissionRequest}
              >Request Permission</button>
            )}
            {permission==="denied" && (
              <span style={{marginLeft:7,color:"#c83842"}}>[You must re-enable in your browser settings]</span>
            )}
          </div>
          {error && <div style={{color:"red", fontSize:13,marginBottom:7}}>{error}</div>}
          <ul style={{fontSize:13.8,marginTop:7,color:"#273232"}}>
            <li>Notifications will only be shown for urgent local posts (crisis/events) and critical new updates.</li>
            <li>You can manage permissions via your browser at any time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
