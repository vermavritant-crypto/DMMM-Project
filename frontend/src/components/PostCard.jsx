import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useRef, useState } from 'react';

export default function PostCard({ post, index }) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={`/post/${post.slug}`} 
        className="block h-full group relative focus:outline-none"
      >
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative h-full flex flex-col bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300"
        >
          {/* Spotlight Gradient Overlay */}
          <div 
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />

          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img 
              loading="lazy"
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {post.featured && (
              <div className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--bg)] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-20">
                Featured
              </div>
            )}
          </div>
          
          <div className="p-6 flex flex-col flex-1 relative z-20">
            <div className="flex items-center gap-4 text-xs font-medium text-[var(--muted)] mb-3">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{post.read_time}</span>
            </div>
            
            <h3 className="text-xl font-bold font-display text-[var(--text)] mb-3 leading-tight group-hover:text-[var(--accent)] transition-colors">
              {post.title}
            </h3>
            
            <p className="text-[var(--muted)] text-sm line-clamp-3 mb-6 flex-1">
              {post.excerpt}
            </p>
            
            <div className="flex items-center text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              Read article <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
