import { useState } from "react";
export default function PostCard({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`post-card ${isExpanded ? "expanded" : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="post-header">
        <h3>{post.title}</h3>
        <span className="post-date">
          {new Date(post.published_at).toLocaleDateString()}
        </span>
      </div>

      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="post-link"
      >
        Read Original
      </a>

      {isExpanded && post.description && (
        <div
          className="post-description"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      )}
    </div>
  );
}
