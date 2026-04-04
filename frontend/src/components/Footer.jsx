import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const aboutLinks = [
  { to: '/company-history', label: 'Company History' },
  { to: '/meet-the-team', label: 'Meet the Team' },
  { to: '/employee-handbook', label: 'Handbook' },
  { to: '/careers', label: 'Careers' },
];

const serviceLinks = [
  { to: '/web-development', label: 'Web Development' },
  { to: '/web-design', label: 'Web Design' },
  { to: '/marketing', label: 'Marketing' },
  { to: '/google-ads', label: 'Google Ads' },
];

const helpLinks = [
  { to: '/faqs', label: 'FAQs' },
  { to: '/support', label: 'Support' },
  { to: '/live-chat', label: 'Live Chat' },
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
                21st
              </div>
              <div>
                <p className="text-2xl font-display font-semibold text-[var(--text)] dark:text-white">
                  21st Dev
                </p>
                <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
                  A modern hub for freelance developers, creators, and honest digital careers.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:bg-white/20 dark:bg-white/5 dark:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
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
          <p>&copy; 2025 21st Dev</p>
        </div>
      </div>
    </footer>
  );
}
