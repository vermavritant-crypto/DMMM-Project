import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitPost } from '../utils/api';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AddPost() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    // Generate simple slug
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const postData = {
      title: data.title,
      slug: slug || `post-${Date.now()}`,
      category: data.category,
      excerpt: data.excerpt,
      content: data.content,
      featured: false,
      read_time: "5 min",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=75"
    };

    const res = await submitPost(postData);
    if (res) {
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } else {
      alert("Failed to submit post.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 min-h-screen">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold mb-4">Draft a new post</h1>
        <p className="text-[var(--muted)] text-lg">
          Share your freelance experience. Be honest, share numbers, and skip the fluff.
        </p>
      </div>

      {success && (
        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={20} />
          <span className="font-medium">Post submitted successfully! It is now live.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-[var(--faint)] uppercase tracking-wider mb-2">Title</label>
          <input 
            {...register("title", { required: true })}
            className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] font-semibold text-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="e.g., How I landed my first big retainer"
          />
          {errors.title && <span className="text-red-500 text-xs mt-1">Title is required</span>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--faint)] uppercase tracking-wider mb-2">Category</label>
          <select 
            {...register("category", { required: true })}
            className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="graphic-design">Graphic Design</option>
            <option value="content-writing">Content Writing</option>
            <option value="video-editing">Video Editing</option>
            <option value="social-media">Social Media</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[var(--faint)] uppercase tracking-wider mb-2">Short Excerpt</label>
          <textarea 
            {...register("excerpt", { required: true })}
            rows="2"
            className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
            placeholder="A two-sentence summary to hook the reader..."
          />
        </div>

        <div>
           <label className="block text-sm font-bold text-[var(--faint)] uppercase tracking-wider mb-2">Content (Markdown supported)</label>
          <textarea 
            {...register("content", { required: true })}
            rows="12"
            className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] leading-relaxed"
            placeholder="Write your story here..."
          />
        </div>

        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full py-4 bg-[var(--text)] text-[var(--bg)] rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isSubmitting ? "Publishing..." : "Publish Post"} <ChevronRight size={18} />
        </button>
      </form>
    </div>
  );
}
