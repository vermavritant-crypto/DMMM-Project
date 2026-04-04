import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const aboutLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/faqs', label: 'FAQs' },
];

const serviceLinks = [
  { to: '/blog', label: 'Blog' },
  { to: '/categories', label: 'Categories' },
  { to: '/add-post', label: 'Add Post' },
  { to: '/reviews', label: 'Reviews' },
];

const helpLinks = [
  { to: '/faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'About' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--bg-card)] text-[var(--text)] dark:bg-[var(--bg-elevated)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 xl:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white">
                MFH
              </div>
              <div>
                <p className="text-2xl font-display font-semibold text-[var(--text)] dark:text-white">
                  Modern Freelancer Hub
                </p>
                <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
                  A modern hub for freelance developers, creators, and honest digital careers.
                </p>
              </div>
            </div>

              <ul className="space-y-4 text-sm text-[var(--muted)]">
                {footerLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-[var(--accent)] transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-[var(--text)] dark:text-white mb-6">About</p>
              <ul className="space-y-4 text-sm text-[var(--muted)]">
                {aboutLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="hover:text-[var(--accent)] transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-[var(--text)] dark:text-white mb-6">Services</p>
              <ul className="space-y-4 text-sm text-[var(--muted)]">
                {serviceLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="hover:text-[var(--accent)] transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          <div>
            <p className="text-lg font-semibold text-[var(--text)] dark:text-white mb-6">Help</p>
            <ul className="space-y-4 text-sm text-[var(--muted)]">
              {helpLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-[var(--accent)] transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)] flex flex-col gap-3 sm:flex-row sm:justify-between">
          <p>All rights reserved.</p>
          <p>&copy; 2025 Modern Freelancer Hub</p>
        </div>
      </div>
    </footer>
  );
}
