import { Link } from 'react-router-dom';
import { fetchCategories } from '../utils/api';
import { useEffect, useState } from 'react';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => { fetchCategories().then(setCategories); }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <h1 className="font-display text-4xl font-bold mb-10">Browse by Topic</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(c => (
          <Link key={c.id} to={`/category/${c.id}`} className="p-8 border border-[var(--border)] rounded-2xl bg-[var(--bg-elevated)] hover:border-[var(--accent)] hover:-translate-y-1 transition-all group">
            <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors">{c.name}</h2>
            <p className="text-[var(--muted)]">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
