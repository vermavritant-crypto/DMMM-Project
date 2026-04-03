import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, PenTool, Layout, Camera, Monitor, Smartphone, Database, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  
  const techStack = [
    { name: "Figma", icon: <Layout size={24} /> },
    { name: "VS Code", icon: <Code size={24} /> },
    { name: "React", icon: <Monitor size={24} /> },
    { name: "Photoshop", icon: <Camera size={24} /> },
    { name: "Premiere Pro", icon: <Monitor size={24} /> },
    { name: "Illustrator", icon: <PenTool size={24} /> },
    { name: "Supabase", icon: <Database size={24} /> },
    { name: "Notion", icon: <Smartphone size={24} /> },
    { name: "Framer", icon: <Send size={24} /> },
  ];

  return (
    <section className="relative w-full overflow-hidden min-h-[85vh] flex flex-col justify-center pt-8">
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex-1 flex flex-col justify-center items-center text-center pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-center"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-[var(--text)] drop-shadow-sm">
            Master the art of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-yellow-600">
              Digital Freedom.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed mb-10 max-w-xl font-medium">
            Real insights from earned experience. Join thousands of freelancers building sustainable income through design, writing, and strategy.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/blog" className="px-6 py-3 rounded-xl bg-[var(--text)] text-[var(--bg)] font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-[var(--text)]/20">
              Start Reading <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Infinte Scroll Marquee Strip at the Bottom of Hero */}
      <div className="w-full absolute bottom-0 left-0 border-y border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl overflow-hidden py-4 z-20">
        <motion.div 
          className="flex whitespace-nowrap items-center gap-16 pr-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-3 text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              {tech.icon}
              <span className="font-bold tracking-tight text-[var(--text)]">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
