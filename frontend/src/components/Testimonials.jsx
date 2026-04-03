import { motion } from 'framer-motion';

const REVIEWS = [
  { id: 1, name: "Anjali S.", text: "The templates strategy completely changed how I find clients. I made my first $1k month entirely passively." },
  { id: 2, name: "Vikram R.", text: "Finally, honest advice about leaving content mills. Moving to direct clients doubled my rate in 3 weeks." },
  { id: 3, name: "Priya K.", text: "The short-form breakdown is exactly what I needed to read. The ROI logic is completely sound." },
  { id: 4, name: "Rohan M.", text: "No fluff, just actionable steps. The client onboarding checklist saved me from a nightmare project." },
  { id: 5, name: "Arjun T.", text: "Even as a dev, the business principles here apply perfectly. Highly recommend reading everything." }
];

export default function Testimonials() {
  return (
    <section className="py-24 overflow-hidden bg-[var(--bg-card)] border-t border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="font-display text-3xl font-bold mb-4">Trusted by modern freelancers</h2>
        <p className="text-[var(--muted)]">Join the community building real leverage on the internet.</p>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Gradient fades for edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-card)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-card)] to-transparent z-10" />

        <motion.div 
          className="flex space-x-6 px-6"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear'
          }}
        >
          {/* Double array to create seamless loop effect */}
          {[...REVIEWS, ...REVIEWS].map((review, idx) => (
            <div 
              key={`${review.id}-${idx}`} 
              className="w-80 flex-shrink-0 bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-2xl shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center font-bold text-[var(--accent)]">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">{review.name}</h4>
                </div>
              </div>
              <p className="text-[var(--text)] leading-relaxed text-sm italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
