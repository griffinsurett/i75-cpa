/**
 * TestimonialMasonry Component
 *
 * Masonry grid layout for testimonials.
 * Supports both text and video testimonials with CSS Grid spanning.
 * Adapted for i75 branding.
 */

import TestimonialTextCard from '../LoopComponents/TestimonialTextCard';
import TestimonialVideoCard from '../LoopComponents/TestimonialVideoCard';

interface BaseTestimonialItem {
  id: string;
  name: string;
  role?: string;
  company?: string;
  spanColumns?: boolean;
  spanRows?: boolean;
}

interface TextTestimonialItem extends BaseTestimonialItem {
  type: 'text';
  quote: string;
  rating?: number;
  avatar?: string;
}

interface VideoTestimonialItem extends BaseTestimonialItem {
  type: 'video';
  video: string;
  poster?: string;
  videoAspect?: 'portrait' | 'landscape' | 'square';
  centered?: boolean;
}

type TestimonialItem = TextTestimonialItem | VideoTestimonialItem;

interface TestimonialMasonryProps {
  items: TestimonialItem[];
  className?: string;
}

const TestimonialMasonry = ({ items, className = '' }: TestimonialMasonryProps) => {
  return (
    <div
      className={`
        grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4
        auto-rows-[minmax(200px,auto)]
        [grid-auto-flow:dense]
        ${className}
      `}
    >
      {items.map((item, index) => {
        if (item.type === 'video') {
          return (
            <TestimonialVideoCard
              key={item.id || index}
              name={item.name}
              role={item.role}
              company={item.company}
              video={item.video}
              poster={item.poster}
              spanColumns={item.spanColumns}
              spanRows={item.spanRows}
              videoAspect={item.videoAspect}
              centered={item.centered}
            />
          );
        }

        return (
          <TestimonialTextCard
            key={item.id || index}
            name={item.name}
            role={item.role}
            company={item.company}
            quote={item.quote}
            rating={item.rating}
            avatar={item.avatar}
            spanColumns={item.spanColumns}
          />
        );
      })}
    </div>
  );
};

export default TestimonialMasonry;
