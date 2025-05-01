import { useState } from "react";

export default function FeedCard({ feed, isFollowed, onFollow, onUnfollow }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`feed-card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      <div className="feed-header">
        <h3>{feed.name}</h3>
        <a
          href={feed.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="feed-url"
        >
          Visit Feed
        </a>
      </div>

      {isExpanded && (
        <div className="feed-details">
          <p>Created: {new Date(feed.created_at).toLocaleDateString()}</p>
          {isFollowed ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUnfollow(feed.id);
              }}
              className="unfollow-btn"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFollow(feed.id);
              }}
              className="follow-btn"
            >
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
}
