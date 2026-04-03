import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../utils/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <Testimonials />
      
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-display text-2xl font-bold">Latest Articles</h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 rounded-full border-4 border-[var(--accent)] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <PostCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
