export default function About() {
  const teamMembers = [
    { name: 'Vritant Verma', role: 'Co-Founder' },
    { name: 'Khushi Rathi', role: 'Co-Founder' },
    { name: 'Nishant Kumar', role: 'Co-Founder' },
    { name: 'Aditya Raj', role: 'Co-Founder' },
    { name: 'Vansh Singhal', role: 'Co-Founder' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
      <h1 className="font-display text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Modern Freelancer Hub was built to document the authentic, sometimes painful, and highly rewarding reality of building a digital career. We aren't here to sell you a "get rich quick" scheme.
      </p>
      <p className="text-lg text-[var(--muted)] mb-12">
        Whether you are a designer, writer, developer, or strategist, this is your home for honest numbers, actionable advice, and community support.
      </p>

      <div className="mt-16">
        <h2 className="font-display text-3xl font-bold mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:border-blue-400/50 dark:hover:border-blue-400/30 transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"></div>
              <div className="relative flex flex-col items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xl font-semibold shadow-lg">
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
