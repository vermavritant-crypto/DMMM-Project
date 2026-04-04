import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import PostReader from './pages/PostReader';
import Blog from './pages/Blog';
import AddPost from './pages/AddPost';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import CategoriesList from './pages/CategoriesList';
import { useEffect, useState } from 'react';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <div
        key={location.pathname}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/post/:slug" element={<PostReader />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      {/* Global Background Video */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          src="https://assets.codepen.io/3364143/7btrrd.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle vignette/fade over the video */}
        <div className="absolute inset-0 pointer-events-none bg-[var(--bg-solid)] opacity-10" />
      </div>

      <div className="relative z-10 min-h-screen bg-[var(--bg)] backdrop-blur-md text-[var(--text)] transition-colors duration-300 font-body flex flex-col">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
