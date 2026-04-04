import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostBySlug, fetchPosts } from '../utils/api';
import { ChevronLeft } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const teamAuthors = [
  { name: 'Vritant Verma', role: 'Co-Founder', initials: 'VV' },
  { name: 'Khushi Rathi', role: 'Co-Founder', initials: 'KR' },
  { name: 'Nishant Kumar', role: 'Co-Founder', initials: 'NK' },
  { name: 'Aditya Raj', role: 'Co-Founder', initials: 'AR' },
  { name: 'Vansh Singhal', role: 'Co-Founder', initials: 'VS' },
];

export default function PostReader() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  const author = post ? teamAuthors[(post.id - 1) % teamAuthors.length] : teamAuthors[0];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetchPostBySlug(slug).then(p => {
      setPost(p);
      if (p) {
        fetchPosts(`?category=${p.category}`).then(data => {
          setRelated(data.filter(r => r.slug !== slug).slice(0, 3));
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-[var(--accent)] border-t-transparent animate-spin" /></div>;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center font-display text-2xl">Post not found.</div>;
  }

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100]" style={{ scaleX }} />
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-16">
        <main className="flex-1 lg:max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] mb-8">
            <ChevronLeft size={16} /> Back
          </Link>

          <img 
            src={post.image || `https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80`}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-lg"
          />

          <div className="mb-10">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] mb-4">
              {post.category.replace('-', ' ')}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 py-4 border-y border-[var(--border)] text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--text)]">Published</span>
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
              <span>{post.read_time || post.readTime} read</span>
            </div>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none font-body leading-loose prose-a:text-[var(--accent)] prose-headings:font-display">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-3xl font-bold mt-12 mb-6">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                return <ul key={i} className="list-disc pl-6 mb-6">
                  {paragraph.split('\n').map((li, j) => <li key={j}>{li.replace('- ', '')}</li>)}
                </ul>;
              }
              return <p key={i} className="mb-6">{paragraph}</p>;
            })}
          </article>
        </main>

        <aside className="w-full lg:w-80 flex flex-col gap-8 sticky top-24 h-fit">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-lg font-semibold shadow-lg">
                {author.initials}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-1">Author</p>
                <p className="font-display font-bold text-lg text-[var(--text)] dark:text-white">{author.name}</p>
                <p className="text-sm text-[var(--muted)]">{author.role}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
              Written by {author.name}, one of our core team members sharing honest freelance insights.
            </p>
            <button
              type="button"
              onClick={() => setFollowing((prev) => !prev)}
              className={`w-full py-2.5 rounded-lg font-medium transition ${following ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-h)]' : 'bg-[var(--text)] text-[var(--bg)] hover:opacity-90'}`}
              aria-pressed={following}
            >
              {following ? 'Following' : 'Follow Updates'}
            </button>
          </div>

          {related.length > 0 && (
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg mb-6 leading-none">Related Reading</h3>
              <div className="flex flex-col gap-4">
                {related.map(r => (
                  <Link key={r.id} to={`/post/${r.slug}`} className="group flex gap-4 items-center">
                    <img src={r.image || `https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100`} alt={r.title} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <h4 className="text-sm font-bold leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">{r.title}</h4>
                      <p className="text-xs text-[var(--faint)] mt-1">{r.read_time || r.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
