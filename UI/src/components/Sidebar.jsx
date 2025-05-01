import { useState } from "react";

export default function Sidebar({ activeTab, setActiveTab, onAddFeed }) {
  const [showAddFeedForm, setShowAddFeedForm] = useState(false);
  const [feedName, setFeedName] = useState("");
  const [feedUrl, setFeedUrl] = useState("");

  const handleAddFeedSubmit = async (e) => {
    e.preventDefault();
    await onAddFeed({ name: feedName, url: feedUrl });
    setFeedName("");
    setFeedUrl("");
    setShowAddFeedForm(false);
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-nav">
          <li>
            <button
              className={activeTab === "posts" ? "active" : ""}
              onClick={() => setActiveTab("posts")}
            >
              Your Posts
            </button>
          </li>
          <li>
            <button
              className={activeTab === "followed" ? "active" : ""}
              onClick={() => setActiveTab("followed")}
            >
              Followed Feeds
            </button>
          </li>
          <li>
            <button
              className={activeTab === "discover" ? "active" : ""}
              onClick={() => setActiveTab("discover")}
            >
              Discover Feeds
            </button>
          </li>
        </ul>
      </nav>

      <div className="add-feed-section">
        <button
          onClick={() => setShowAddFeedForm(!showAddFeedForm)}
          className="add-feed-toggle"
        >
          {showAddFeedForm ? "Cancel" : "+ Add Feed"}
        </button>

        {showAddFeedForm && (
          <form onSubmit={handleAddFeedSubmit} className="add-feed-form">
            <div className="form-group">
              <label htmlFor="feed-name">Feed Name</label>
              <input
                id="feed-name"
                type="text"
                value={feedName}
                onChange={(e) => setFeedName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="feed-url">Feed URL</label>
              <input
                id="feed-url"
                type="url"
                value={feedUrl}
                onChange={(e) => setFeedUrl(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add Feed</button>
          </form>
        )}
      </div>
    </aside>
  );
}
