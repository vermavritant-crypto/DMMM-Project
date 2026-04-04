import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border)] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="font-display font-bold text-lg">
            Modern Freelancer <span className="text-[var(--accent)]">Hub</span>
          </h2>
          <p className="text-sm text-[var(--muted)] mt-2">
            The honest path to digital freelancing. Real insights from earned experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link to="/about" className="text-sm text-[var(--muted)] hover:text-[var(--text)] bg-[var(--bg-elevated)] px-3 py-1.5 rounded-md transition-colors">About the Project</Link>
        </div>
      </div>
    </footer>
  );
}
