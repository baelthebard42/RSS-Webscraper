import FeedCard from "./FeedCard";

export default function FeedList({ feeds, isFollowed, onFollow, onUnfollow }) {
  if (feeds.length === 0) {
    return (
      <div className="empty-state">
        {isFollowed
          ? "You are not following any feeds yet."
          : "No feeds available to discover."}
      </div>
    );
  }

  return (
    <div className="feed-list">
      {feeds.map((feed) => (
        <FeedCard
          key={feed.id}
          feed={feed}
          isFollowed={isFollowed}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
        />
      ))}
    </div>
  );
}
