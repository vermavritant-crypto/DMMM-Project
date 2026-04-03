import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ theme, toggleTheme }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--bg-card)] backdrop-blur-xl border-b border-[var(--border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-lg tracking-tight text-[var(--text)] relative z-50">
            Modern Freelancer <span className="text-[var(--accent)]">Hub</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">Home</Link>
            <Link to="/blog" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">Blog</Link>
            <Link to="/categories" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">Categories</Link>
            <Link to="/about" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">About Us</Link>
            <Link to="/contact" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">Contact</Link>
            <Link to="/faqs" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">FAQs</Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 pr-1">
            <Link to="/reviews" className="hidden lg:block text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">Reviews</Link>
            <Link to="/add-post" className="hidden lg:block text-sm font-bold bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Write a Post</Link>
            
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)] rounded-lg px-2 md:px-3 py-1.5 transition-colors group relative z-50"
            >
              <Search size={16} className="group-hover:text-[var(--text)] transition-colors" />
              <span className="hidden md:block">Search</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)] transition-colors relative z-50"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--text)] relative z-50"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-16 left-0 w-full bg-[var(--bg-solid)] border-b border-[var(--border)] shadow-2xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 space-y-4">
                <Link to="/" className="text-lg font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">Home</Link>
                <Link to="/blog" className="text-lg font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">Blog</Link>
                <Link to="/categories" className="text-lg font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">Categories</Link>
                <Link to="/reviews" className="text-lg font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">Reviews</Link>
                <Link to="/about" className="text-lg font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">About Us</Link>
                
                <div className="h-px bg-[var(--border)] my-2 w-full" />
                
                <Link to="/add-post" className="text-lg font-bold text-[var(--accent)] w-full text-center bg-[var(--bg-elevated)] border border-[var(--border)] py-3 rounded-xl hover:opacity-90 transition-opacity">
                  Write a Post
                </Link>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[var(--muted)] font-medium">Toggle Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-3 bg-[var(--bg-elevated)] rounded-full text-[var(--text)] border border-[var(--border)]"
                  >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
