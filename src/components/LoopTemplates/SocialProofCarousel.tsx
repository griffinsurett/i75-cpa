/**
 * SocialProofCarousel Component
 *
 * Carousel display for social media screenshot testimonials.
 * Auto-advances and supports manual navigation.
 */

import { useEffect, useMemo, useState } from 'react';
import SocialProofCard from '../LoopComponents/SocialProofCard';
import StraightArrowSide from '@/assets/i75/straight-arrow-side.webp';

type ReviewSize = 'short' | 'medium' | 'tall';

interface ReviewCard {
  image: string;
  alt?: string;
  size: ReviewSize;
}

interface ReviewColumn {
  cards: ReviewCard[];
}

interface ReviewSlide {
  columns: ReviewColumn[];
}

interface SocialProofCarouselProps {
  items: Array<{
    id: string;
    data: {
      title: string;
      socialMediaPost?: string;
    };
  }>;
  className?: string;
}

const getLayoutForWidth = (width: number) => {
  if (width < 640) {
    return { columns: 2, itemsPerSlide: 4 };
  }
  if (width < 1024) {
    return { columns: 2, itemsPerSlide: 6 };
  }
  return { columns: 3, itemsPerSlide: 7 };
};

const createSlides = (
  items: SocialProofCarouselProps['items'],
  columnsCount: number,
  itemsPerSlide: number
): ReviewSlide[] => {
  const socialItems = items.filter(item => item.data.socialMediaPost);

  if (socialItems.length === 0) return [];

  const slideCount = Math.ceil(socialItems.length / itemsPerSlide);

  const slides: ReviewSlide[] = [];
  const sizes: ReviewSize[] = ['short', 'tall', 'medium', 'short', 'short', 'tall', 'medium'];

  for (let s = 0; s < slideCount; s++) {
    const slideItems = socialItems.slice(s * itemsPerSlide, (s + 1) * itemsPerSlide);

    const columns: ReviewColumn[] = Array.from({ length: columnsCount }, () => ({ cards: [] }));

    slideItems.forEach((item, i) => {
      const colIndex = i % columnsCount;
      columns[colIndex].cards.push({
        image: item.data.socialMediaPost!,
        alt: `${item.data.title} social proof`,
        size: sizes[i % sizes.length],
      });
    });

    if (columns.some(col => col.cards.length > 0)) {
      slides.push({ columns });
    }
  }

  return slides;
};

const SocialProofCarousel = ({ items, className = '' }: SocialProofCarouselProps) => {
  const [layout, setLayout] = useState(() => ({ columns: 3, itemsPerSlide: 7 }));
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useMemo(
    () => createSlides(items, layout.columns, layout.itemsPerSlide),
    [items, layout]
  );

  useEffect(() => {
    const updateLayout = () => {
      setLayout(getLayoutForWidth(window.innerWidth));
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [layout.columns, layout.itemsPerSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  const goNext = () => goToSlide(currentSlide + 1);
  const goPrev = () => goToSlide(currentSlide - 1);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={goPrev}
            className="flex absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-primary border-2 border-light-primary/70 text-light-primary text-xl items-center justify-center hover:bg-primary/90 transition-colors z-10"
          >
            <img
              src={typeof StraightArrowSide === "string" ? StraightArrowSide : StraightArrowSide.src}
              alt=""
              className="h-3 sm:h-5 w-auto rotate-180"
            />
          </button>
          <button
            aria-label="Next slide"
            onClick={goNext}
            className="flex absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-primary border-2 border-light-primary/70 text-light-primary text-xl items-center justify-center hover:bg-primary/90 transition-colors z-10"
          >
            <img
              src={typeof StraightArrowSide === "string" ? StraightArrowSide : StraightArrowSide.src}
              alt=""
              className="h-3 sm:h-5 w-auto"
            />
          </button>
        </>
      )}

      <div className="relative bg-primary/70 text-light-primary rounded-2xl shadow-xl ring-3 ring-white p-4">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className="min-w-full px-4 py-6 sm:px-6 sm:py-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {slide.columns.map((column, columnIndex) => (
                    <div key={`col-${columnIndex}`} className="flex flex-col gap-4 sm:gap-6">
                      {column.cards.map((card, cardIndex) => (
                        <SocialProofCard
                          key={`card-${cardIndex}`}
                          image={card.image}
                          alt={card.alt}
                          size={card.size}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-light-primary w-10' : 'bg-light-primary/40 w-5'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialProofCarousel;
