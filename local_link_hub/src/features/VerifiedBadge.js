// VerifiedBadge: Trust/Verification symbol for user/items
import React from "react";

/**
 * VerifiedBadge: Displays a checkmark or badge if verified.
 * Use 'small' prop for minimal badge.
 */
// PUBLIC_INTERFACE
function VerifiedBadge({ verified, small }) {
  if (!verified) return null;
  return (
    <span className={small ? "llh-verified-icon-small" : "llh-verified-icon"}
      title="Peer/Credential Verified">
      <svg height={small ? 13 : 18} width={small ? 13 : 18} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#23221e" stroke="#8f0a0a" strokeWidth="2.2"/>
        <path d="M8 13l2 2 5-5" stroke="#b1b483" strokeWidth={small ? 2 : 2.5} fill="none" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

export default VerifiedBadge;
