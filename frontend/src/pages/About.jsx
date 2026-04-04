import { Link } from 'react-router-dom';

export default function About() {
  const teamMembers = [
    { name: 'Vritant Verma' },
    { name: 'Khushi Rathi' },
    { name: 'Nishant Kumar' },
    { name: 'Aditya Raj' },
    { name: 'Vansh Singhal' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 min-h-[70vh]">
      <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-5">
        About the Hub
      </p>
      <h1 className="font-display text-5xl font-bold mb-8">Modern Freelancer Hub</h1>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
        <div>
          <p className="text-lg text-[var(--muted)] mb-6">
            Modern Freelancer Hub is a practical destination for students, office workers, and aspiring digital nomads who want to build real freelance income online.
          </p>
          <p className="text-lg text-[var(--muted)] mb-6">
            This project collects honest case studies, step-by-step advice, and category-focused guides across graphic design, content writing, video editing, and social media.
          </p>
          <p className="text-lg text-[var(--muted)] mb-8">
            No shortcuts, no hype — just honest lessons from people who have launched side hustles, gained clients, and scaled their skills into sustainable work.
          </p>
          <div className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            <Link to="/blog">Explore the blog</Link>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Our mission</h2>
            <p className="text-[var(--muted)]">
              Help freelancers make smarter decisions by sharing realistic pricing, client workflows, and growth strategies built from first-hand experience.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">What we cover</h2>
            <p className="text-[var(--muted)]">
              Practical guides, category deep dives, launch lessons, and tools to move from learning to earning faster.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="font-display text-3xl font-bold mb-10">Meet the team</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {teamMembers.map((member) => (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-xl shadow-[var(--shadow-card)] backdrop-blur-xl transition hover:border-[var(--accent)] hover:bg-[var(--bg-elevated)]">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl font-semibold">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text)]">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
