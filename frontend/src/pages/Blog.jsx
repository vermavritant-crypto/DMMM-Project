import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../utils/api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-screen">
      <div className="mb-16 border-b border-[var(--border)] pb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">All Stories</h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl">
          Dive into our entire archive. Honest essays about making a living on the internet.
        </p>
      </div>

      {loading ? (
        <div className="w-8 h-8 rounded-full border-4 border-[var(--accent)] border-t-transparent animate-spin mx-auto" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <PostCard key={post.id} post={post} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
