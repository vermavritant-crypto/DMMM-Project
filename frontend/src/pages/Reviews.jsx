import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { fetchReviews, submitReview } from '../utils/api';
import { MessageSquare } from 'lucide-react';
import { StarRating, RenderStaticStars } from '../components/StarRating';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset, control, formState: { isSubmitting } } = useForm({ defaultValues: { rating: 5 } });
  const [loading, setLoading] = useState(true);

  // Initial dummy specific to this page to make sure it looks populated even if DB empty
  const DUMMY_REVIEWS = [
    { id: 1, name: "Rahul S.", text: "The advice here actually works. Saved me from underpricing my first contract.", rating: 5 },
    { id: 2, name: "Sneha P.", text: "Finally an honest look at the grind rather than just the highlights.", rating: 4.5 },
    { id: 3, name: "Karan M.", text: "I integrated the 'retention editing' strategy. My clients literally paid me a bonus.", rating: 5 },
    { id: 4, name: "Nisha V.", text: "Canva Pro mistake post saved my reputation. Incredibly practical stuff.", rating: 5 },
    { id: 5, name: "Aditya K.", text: "Writing for a niche you don't know: brilliant post. Followed the framework exactly.", rating: 4.5 },
    { id: 6, name: "Pooja D.", text: "The raw truth about SMM. Most blogs sugarcoat it; this one didn't.", rating: 4 },
    { id: 7, name: "Varun R.", text: "Transitioning to direct clients was hard, but the Upwork advice paved the way perfectly.", rating: 5 },
    { id: 8, name: "Ananya C.", text: "Straight up the most high-protein freelancing advice I've read this entire year.", rating: 5 }
  ];

  const loadReviews = async () => {
    const data = await fetchReviews();
    setReviews(data.length > 0 ? data : DUMMY_REVIEWS);
    setLoading(false);
  };

  useEffect(() => { loadReviews(); }, []);

  const onSubmit = async (data) => {
    const success = await submitReview({
      id: Date.now(),
      name: data.name,
      text: data.text,
      rating: parseFloat(data.rating),
      created_at: new Date().toISOString()
    });
    if (success) {
      reset();
      loadReviews(); // Refresh
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-screen">
      
      {/* Left side: Submit Form */}
      <div>
        <h1 className="font-display text-4xl font-bold mb-4">Leave a Review</h1>
        <p className="text-[var(--muted)] mb-10">We depend on your honest feedback to keep the platform grounded.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-[var(--bg-elevated)] p-8 rounded-2xl border border-[var(--border)]">
          <div>
            <input {...register("name", { required: true })} placeholder="Your Name (e.g., Arjun K.)" className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]" />
          </div>
          <div className="py-2">
            <Controller
              name="rating"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <StarRating value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
          <div>
            <textarea {...register("text", { required: true })} rows="4" placeholder="Your experience..." className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]" />
          </div>
          <button disabled={isSubmitting} type="submit" className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-bold hover:bg-[var(--accent-h)] transition-colors">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Right side: Display Reviews */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="text-[var(--accent)]" />
          <h2 className="font-dispaly text-2xl font-bold">Community Feedback</h2>
        </div>
        
        {loading ? (
          <div className="w-8 h-8 rounded-full border-4 border-[var(--accent)] border-t-transparent animate-spin" />
        ) : (
          <div className="flex flex-col gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="border-b border-[var(--border)] pb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold tracking-tight">{r.name}</h4>
                  </div>
                  <RenderStaticStars rating={r.rating} />
                </div>
                <p className="text-sm italic text-[var(--muted)] leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
