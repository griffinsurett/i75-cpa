/**
 * TestimonialTextCard Component
 *
 * Displays a text-based testimonial with author info, quote, and rating.
 * Used in the testimonials masonry grid.
 * Matches original i75 HighwayCard styling.
 */

interface TestimonialTextCardProps {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  rating?: number;
  avatar?: string;
  className?: string;
  spanColumns?: boolean;
}

const TestimonialTextCard = ({
  name,
  role = "Customer",
  company,
  quote,
  rating = 5,
  avatar,
  className = '',
  spanColumns = false,
}: TestimonialTextCardProps) => {
  return (
    <div
      className={`
        rounded-2xl p-6 shadow-xl bg-primary text-white ring-3 ring-white
        ${spanColumns ? 'xl:col-span-2' : ''}
        ${className}
      `}
    >
      {/* Author info - top */}
      <div className="flex items-center gap-3 mb-4">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <span className="font-bold text-lg text-white truncate block">{name}</span>
          <p className="text-sm text-white/80 truncate">{role}</p>
          {company && <p className="text-xs text-white/70 truncate">{company}</p>}
        </div>
      </div>

      {/* Star rating */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-white/40'}`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-base md:text-lg leading-relaxed text-white/95 font-medium">
        "{quote}"
      </p>
    </div>
  );
};

export default TestimonialTextCard;
