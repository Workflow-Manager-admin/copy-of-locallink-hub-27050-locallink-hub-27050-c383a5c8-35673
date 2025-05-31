// SkillsExchangeTab: Main Skill Exchange section with verified skill badges, profiles, and requests
import React from "react";
import VerifiedBadge from "./VerifiedBadge";

/**
 * SkillsExchangeTab: Feature tab for exchanging/advertising skills in micro-community.
 */
// PUBLIC_INTERFACE
function SkillsExchangeTab({ user }) {
  // Expanded, varied example skill offers/requests
  const skillOffers = [
    {
      name: "Maria B.",
      skill: "Math Tutoring",
      profilePic: "https://randomuser.me/api/portraits/women/67.jpg",
      verified: true,
      trustScore: 92,
      badges: [
        { skill: "Math Tutoring", verified: true },
        { skill: "SAT Prep", verified: false }
      ]
    },
    {
      name: "Colin J.",
      skill: "Dog Walking",
      profilePic: "https://randomuser.me/api/portraits/men/83.jpg",
      verified: false,
      trustScore: 71,
      badges: [
        { skill: "Dog Walking", verified: false }
      ]
    },
    {
      name: "Priya Patel",
      skill: "Childcare (CPR Cert.)",
      profilePic: "https://randomuser.me/api/portraits/women/37.jpg",
      verified: true,
      trustScore: 87,
      badges: [
        { skill: "Childcare", verified: true },
        { skill: "First Aid", verified: true }
      ]
    },
    {
      name: "Lee Q.",
      skill: "Garden Design",
      profilePic: "https://randomuser.me/api/portraits/men/61.jpg",
      verified: true,
      trustScore: 95,
      badges: [
        { skill: "Gardening", verified: true }
      ]
    },
    {
      name: "Alison W.",
      skill: "Home Organizing",
      profilePic: "https://randomuser.me/api/portraits/women/90.jpg",
      verified: false,
      trustScore: 66,
      badges: [
        { skill: "Decluttering", verified: false }
      ]
    },
    {
      name: "Sam E.",
      skill: "Bicycle Repair (Mobile)",
      profilePic: "https://randomuser.me/api/portraits/men/48.jpg",
      verified: true,
      trustScore: 93,
      badges: [
        { skill: "Bike Repair", verified: true },
        { skill: "Tool Lending", verified: false }
      ]
    },
    {
      name: "Mavis L.",
      skill: "Language Exchange (Spanish ↔ English)",
      profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
      verified: false,
      trustScore: 78,
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
          <button
            className="llh-form-btn"
            type="button"
            aria-label="Post skill offer or request"
            tabIndex={0}
            onClick={() => window.alert('This would post your skill to the community feed! [Demo Action]')}
          >
            Post
          </button>
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
