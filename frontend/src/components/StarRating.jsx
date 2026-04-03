import { useState } from 'react';
import { Star } from 'lucide-react';

export function StarRating({ value, onChange }) {
  const [hoverValue, setHoverValue] = useState(null);
  
  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const increment = percent <= 0.5 ? 0.5 : 1;
    setHoverValue(index + increment);
  };

  const handleClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const increment = percent <= 0.5 ? 0.5 : 1;
    onChange(index + increment);
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className="flex gap-1 items-center" onMouseLeave={() => setHoverValue(null)}>
      {[0, 1, 2, 3, 4].map((index) => {
        const starValue = index + 1;
        const isHalf = displayValue >= index + 0.5 && displayValue < starValue;
        const isFull = displayValue >= starValue;
        
        return (
          <div
            key={index}
            className="cursor-pointer relative text-[var(--faint)]"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onClick={(e) => handleClick(e, index)}
          >
            <Star size={32} strokeWidth={1.5} />
            {(isFull || isHalf) && (
              <div 
                className="absolute inset-0 overflow-hidden text-[var(--accent)] pointer-events-none" 
                style={{ width: isHalf ? '50%' : '100%' }}
              >
                <Star size={32} fill="currentColor" strokeWidth={1.5} />
              </div>
            )}
          </div>
        );
      })}
      <span className="ml-4 font-bold text-lg text-[var(--text)]">
        {displayValue.toFixed(1)} <span className="text-sm font-normal text-[var(--muted)]">Stars</span>
      </span>
    </div>
  );
}

export const RenderStaticStars = ({ rating }) => {
  return (
    <div className="flex gap-0.5 text-[var(--accent)]">
      {[...Array(5)].map((_, i) => {
        const isFull = rating >= i + 1;
        const isHalf = rating >= i + 0.5 && !isFull;
        if (isFull || isHalf) {
          return (
            <div key={i} className="relative">
               <Star size={14} className="text-[var(--faint)]" />
               <div className="absolute inset-0 overflow-hidden" style={{ width: isHalf ? '50%' : '100%' }}>
                 <Star size={14} fill="currentColor" />
               </div>
            </div>
          );
        }
        return <Star key={i} size={14} className="text-[var(--faint)]" />;
      })}
    </div>
  );
};
