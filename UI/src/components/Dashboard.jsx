import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import PostList from "./PostList";
import FeedList from "./FeedList";
import * as api from "../utils/api";

export default function Dashboard({ user, activeTab, setActiveTab }) {
  const [feeds, setFeeds] = useState([]);
  const [followedFeeds, setFollowedFeeds] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [allFeeds, follows, userPosts] = await Promise.all([
        api.getFeeds(),
        api.getFeedFollows(user.apiKey),
        api.getUserPosts(user.apiKey),
      ]);

      setFeeds(allFeeds);
      setFollowedFeeds(follows);
      setPosts(userPosts);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowFeed = async (feedId) => {
    try {
      await api.createFeedFollow(feedId, user.apiKey);
      const follows = await api.getFeedFollows(user.apiKey);
      setFollowedFeeds(follows);

      const updatedPosts = await api.getUserPosts(user.apiKey);
      setPosts(updatedPosts);
    } catch (err) {
      setError("Failed to follow feed");
    }
  };

  const handleUnfollowFeed = async (feedFollowId) => {
    try {
      await api.deleteFeedFollow(feedFollowId, user.apiKey);
      const follows = await api.getFeedFollows(user.apiKey);
      setFollowedFeeds(follows);
      // Refresh posts after unfollowing feed
      const updatedPosts = await api.getUserPosts(user.apiKey);
      setPosts(updatedPosts);
    } catch (err) {
      setError("Failed to unfollow feed");
    }
  };

  const handleAddFeed = async (feedData) => {
    try {
      await api.createFeed(feedData, user.apiKey);
      const allFeeds = await api.getFeeds();
      setFeeds(allFeeds);
      setError(null);
    } catch (err) {
      setError("Failed to add feed");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddFeed={handleAddFeed}
      />

      <main className="main-content">
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            {activeTab === "posts" && <PostList posts={posts} />}
            {activeTab === "followed" && (
              <FeedList
                feeds={followedFeeds.map((ff) => {
                  const feed = feeds.find((f) => f.id === ff.feed_id);
                  return { ...feed, feed_follow_id: ff.id };
                })}
                isFollowed={true}
                onUnfollow={handleUnfollowFeed}
              />
            )}
            {activeTab === "discover" && (
              <FeedList
                feeds={feeds.filter(
                  (f) => !followedFeeds.some((ff) => ff.feed_id === f.id)
                )}
                isFollowed={false}
                onFollow={handleFollowFeed}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
