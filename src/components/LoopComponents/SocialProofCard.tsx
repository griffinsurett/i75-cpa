/**
 * SocialProofCard Component
 *
 * Displays a social media screenshot testimonial card.
 * Styled to match the i75 highway sign theme.
 */

interface SocialProofCardProps {
  image: string;
  alt?: string;
  size?: 'short' | 'medium' | 'tall';
  className?: string;
}

const sizeClasses = {
  short: 'h-[170px]',
  medium: 'h-[250px]',
  tall: 'h-[430px]',
};

const SocialProofCard = ({
  image,
  alt = "i75 student win",
  size = 'medium',
  className = '',
}: SocialProofCardProps) => {
  return (
    <div
      className={`rounded-2xl bg-primary text-light-primary shadow-xl ring-3 ring-white p-3 ${sizeClasses[size]} ${className}`}
    >
      <div className="h-full w-full rounded-xl overflow-hidden bg-primary/80 flex items-center justify-center">
        <img
          src={image}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default SocialProofCard;
