// SkillsExchangeTab: Main Skill Exchange section with verified skill badges, profiles, and requests
import React from "react";
import VerifiedBadge from "./VerifiedBadge";

/**
 * SkillsExchangeTab: Feature tab for exchanging/advertising skills in micro-community.
 */
// PUBLIC_INTERFACE
function SkillsExchangeTab({ user }) {
  // Simulated skills/offers list
  const skillOffers = [
    {
      name: "Maria B.",
      skill: "Math Tutoring",
      profilePic: "https://randomuser.me/api/portraits/women/67.jpg",
      verified: true,
      trustScore: 92,
      badges: [{ skill: "Math Tutoring", verified: true }]
    },
    {
      name: "Colin J.",
      skill: "Dog Walking",
      profilePic: "https://randomuser.me/api/portraits/men/83.jpg",
      verified: false,
      trustScore: 71,
      badges: []
    }
  ];

  const yourBadges = user.badges;

  return (
    <div>
      <h2 className="llh-tab-title">Skill Exchange <span className="llh-tab-desc"> — Offer or Request skills trusted within your locality</span></h2>
      <div className="llh-section">
        <div className="llh-profile-card">
          <img src={user.profilePic} className="llh-profile-pic" alt="" />
          <div>
            <div className="llh-profile-title">
              {user.name}
              <VerifiedBadge verified={user.verified} />
            </div>
            <div className="llh-badges-list">
              {yourBadges.map((b, i) => (
                <span className={b.verified ? "llh-badge llh-badge-verified" : "llh-badge"} key={i}>
                  {b.skill}
                  {b.verified && <VerifiedBadge verified={true} small />}
                </span>
              ))}
            </div>
            <div className="llh-profile-trust-score">
              Trust: <span>{user.trustScore}</span>
            </div>
          </div>
        </div>
        <form className="llh-skill-form">
          <input className="llh-skill-input" placeholder="What can you offer or request? (e.g. Piano lessons)" />
          <button className="llh-form-btn" type="button">Post</button>
        </form>
      </div>
      <h3>People offering skills nearby</h3>
      <div className="llh-cards-row">
        {skillOffers.map((offer, idx) => (
          <div className="llh-skill-card" key={idx}>
            <img src={offer.profilePic} className="llh-profile-pic" alt=""/>
            <div className="llh-profile-title">
              {offer.name} <VerifiedBadge verified={offer.verified} />
            </div>
            <span className="llh-badge llh-badge-verified">{offer.skill}</span>
            <div className="llh-profile-trust-score">Trust: {offer.trustScore}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsExchangeTab;
