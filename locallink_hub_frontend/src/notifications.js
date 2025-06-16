//
// notifications.js
// Browser notification helper for LocalLink Hub (new+crisis posts integration)
//
/* PUBLIC_INTERFACE */
/**
 * Requests browser permission for notifications if not already granted/denied.
 * Resolves with 'granted', 'denied', or 'default'.
 */
export function requestNotificationPermission() {
  if (!('Notification' in window)) return Promise.resolve('unsupported');
  if (Notification.permission === 'granted') return Promise.resolve('granted');
  if (Notification.permission === 'denied') return Promise.resolve('denied');
  return Notification.requestPermission();
}

/* PUBLIC_INTERFACE */
/**
 * Triggers a browser notification. Permissions checked here.
 * @param {string} title - Notification title.
 * @param {object} options - Notification options (body, icon, tag, data, etc.).
 * @returns {Promise<boolean>} true if shown, false otherwise
 */
export async function triggerNotification(title, options) {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') {
    try {
      new Notification(title, options);
      return true;
    } catch (e) { return false; }
  }
  return false;
}

/* PUBLIC_INTERFACE */
/**
 * Whether permission is currently granted for notifications.
 */
export function isNotificationEnabled() {
  return ('Notification' in window) && Notification.permission === 'granted';
}

/**
 * LocalStorage state for notification settings (future expansion)
 */
const NOTIF_SETTINGS_KEY = 'localLinkNotificationSettings';
export function saveNotificationSettings(settings) {
  window.localStorage.setItem(NOTIF_SETTINGS_KEY, JSON.stringify(settings));
}
export function loadNotificationSettings() {
  const val = window.localStorage.getItem(NOTIF_SETTINGS_KEY);
  return val ? JSON.parse(val) : { enabled: isNotificationEnabled() };
}
