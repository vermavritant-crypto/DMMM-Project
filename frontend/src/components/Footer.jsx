import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/20 py-12 transition-colors duration-300 backdrop-blur-md bg-white/10 dark:bg-black/40">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Modern Freelancer <span className="text-blue-600 dark:text-blue-400">Hub</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            The honest path to digital freelancing. Real insights from earned experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link
            to="/about"
            className="text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-white/30 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md transition-all hover:bg-white/50 dark:hover:bg-white/20 border border-white/20 dark:border-white/10"
          >
            About the Project
          </Link>
        </div>
      </div>
    </footer>
  );
}
