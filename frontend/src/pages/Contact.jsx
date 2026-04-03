export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
      <h1 className="font-display text-4xl font-bold mb-6">Contact</h1>
      <p className="text-lg text-[var(--muted)] mb-8">
        Have a question or a story you'd like to share? We read everything.
      </p>
      <form className="flex flex-col gap-4 max-w-md">
        <input type="text" placeholder="Your Name" className="border border-[var(--border)] bg-[var(--bg-elevated)] p-3 rounded-lg text-[var(--text)]" />
        <input type="email" placeholder="Email Address" className="border border-[var(--border)] bg-[var(--bg-elevated)] p-3 rounded-lg text-[var(--text)]" />
        <textarea rows="4" placeholder="Your message..." className="border border-[var(--border)] bg-[var(--bg-elevated)] p-3 rounded-lg text-[var(--text)]"></textarea>
        <button type="button" className="bg-[var(--text)] text-[var(--bg)] py-3 rounded-lg font-bold hover:opacity-90">Send Message</button>
      </form>
    </div>
  );
}
