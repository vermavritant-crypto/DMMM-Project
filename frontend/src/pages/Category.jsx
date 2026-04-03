import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { fetchPosts, fetchCategories } from '../utils/api';
import { ChevronLeft } from 'lucide-react';

export default function Category() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchCategories(),
      fetchPosts(`?category=${id}`)
    ]).then(([cats, fetchedPosts]) => {
      setCategory(cats.find(c => c.id === id) || { name: id.replace('-', ' '), description: '' });
      setPosts(fetchedPosts);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-elevated)] transition-colors mb-12">
        <ChevronLeft size={16} /> Back to home
      </Link>

      <div className="mb-16 pb-8 border-b border-[var(--border)]">
        <div className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
          Topic / Category
        </div>
        <h1 className="font-display text-4xl font-bold mb-4 capitalize">
          {category?.name}
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl">
          {category?.description}
        </p>
      </div>

      {loading ? (
        <div className="w-8 h-8 rounded-full border-4 border-[var(--accent)] border-t-transparent animate-spin mx-auto" />
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-[var(--muted)]">No posts found in this category.</div>
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
