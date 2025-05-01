import PostCard from "./PostCard";

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        No posts available. Follow some feeds to see content here.
      </div>
    );
  }
  if (!posts || !Array.isArray(posts)) {
    return <div className="empty-state">Loading posts...</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
