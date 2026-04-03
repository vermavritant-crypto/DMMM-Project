export default function FAQs() {
  const faqs = [
    { q: "Is the content here free?", a: "Yes, completely free. We monetize through subtle affiliate links on specific tools we genuinely recommend." },
    { q: "Can I submit my own freelance story?", a: "Yes, in fact we encourage it. Head over to the 'Add Post' page locally." },
    { q: "Why focus on Graphic Design and Writing so much?", a: "These are historically the most accessible entry points to digital freelancing, requiring minimal upfront capital." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
      <h1 className="font-display text-4xl font-bold mb-10">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-6 border border-[var(--border)] rounded-2xl bg-[var(--bg-elevated)]">
            <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
            <p className="text-[var(--muted)]">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
