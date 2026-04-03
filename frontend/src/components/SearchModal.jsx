import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPosts } from '../utils/api';
import { Search, X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length > 1) {
      // Very basic local search for immediate snappy performance
      fetchPosts().then(allPosts => {
        const lowerQ = query.toLowerCase();
        const filtered = allPosts.filter(p => 
          p.title.toLowerCase().includes(lowerQ) || 
          p.excerpt.toLowerCase().includes(lowerQ)
        ).slice(0, 5); // top 5
        setResults(filtered);
      });
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (slug) => {
    navigate(`/post/${slug}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-4 border-b border-[var(--border)]">
            <Search className="text-[var(--muted)] ml-2" size={20} />
            <input 
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, guides, topics..."
              className="flex-1 bg-transparent border-none outline-none text-xl text-[var(--text)] px-4 placeholder:text-[var(--faint)]"
            />
            <button onClick={onClose} className="p-2 text-[var(--faint)] hover:text-[var(--text)] transition-colors rounded-lg bg-[var(--bg-elevated)]">
              <X size={18} />
            </button>
          </div>

          {/* Results List */}
          {query.trim().length > 1 && (
            <div className="overflow-y-auto p-2">
              {results.length > 0 ? (
                results.map((post) => (
                  <button 
                    key={post.id}
                    onClick={() => handleSelect(post.slug)}
                    className="w-full text-left px-4 py-4 hover:bg-[var(--bg-elevated)] rounded-xl transition-colors flex items-start gap-4 group"
                  >
                    <div className="p-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text)] text-lg leading-tight mb-1">{post.title}</h4>
                      <p className="text-sm text-[var(--muted)] line-clamp-1">{post.excerpt}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-[var(--muted)]">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
