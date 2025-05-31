// ResourceReUpTab: UI for listing/sharing items and free exchanges
import React from "react";

/**
 * ResourceReUpTab: Feature tab for listing and sharing free/exchange items.
 */
// PUBLIC_INTERFACE
function ResourceReUpTab({ user }) {
  // Expanded, realistic resource listings
  const resourceItems = [
    {
      name: "Bookshelf (free)",
      details: "Solid wood. Pick up today.",
      user: "Ava Kyle",
      profilePic: "https://randomuser.me/api/portraits/women/85.jpg"
    },
    {
      name: "Garden Tools",
      details: "Swap for any board games.",
      user: "Ben H.",
      profilePic: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      name: "Fresh Tomatoes (organic)",
      details: "Harvested from backyard, no pesticides. Free/share.",
      user: "Jorge M.",
      profilePic: "https://randomuser.me/api/portraits/men/58.jpg"
    },
    {
      name: "Winter Jackets (3, kids & adults)",
      details: "Gently used – please take whatever fits.",
      user: "Susan Lim",
      profilePic: "https://randomuser.me/api/portraits/women/11.jpg"
    },
    {
      name: "Laptop Charger (Lenovo)",
      details: "Extra, 65W USB-C. Can lend for semester.",
      user: "Victor Greer",
      profilePic: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      name: "Puzzles & Boardgames",
      details: "Free cycle or exchange for plants.",
      user: "Jenny P.",
      profilePic: "https://randomuser.me/api/portraits/women/41.jpg"
    },
    {
      name: "Bike Helmet (youth)",
      details: "Gently used, clean, safe.",
      user: "Aun M.",
      profilePic: "https://randomuser.me/api/portraits/men/87.jpg"
    }
  ];

  return (
    <div>
      <h2 className="llh-tab-title">Resource Re-Up <span className="llh-tab-desc">— Give/claim items or swap within your micro-community</span></h2>
      <form className="llh-resource-form">
        <input className="llh-resource-input" placeholder="List something to share (e.g. spare seeds, books, toys)" />
        <button className="llh-form-btn" type="button">List</button>
      </form>
      <h3>Available now:</h3>
      <div className="llh-cards-row">
        {resourceItems.map((item, idx) => (
          <div className="llh-resource-card" key={idx}>
            <img src={item.profilePic} className="llh-profile-pic" alt="" />
            <div className="llh-resource-title">{item.name}</div>
            <div className="llh-resource-details">{item.details}</div>
            <span className="llh-resource-listing-user">Listed by {item.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceReUpTab;
