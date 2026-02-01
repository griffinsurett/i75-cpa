/**
 * TestimonialMasonry Component
 *
 * Masonry grid layout for testimonials.
 * Supports both text and video testimonials with CSS Grid spanning.
 * Adapted for i75 branding.
 */

import { useLayoutEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  itemRefs.current = [];

  const getColumnCount = (width: number) => {
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    if (width >= 640) return 2;
    return 1;
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;

    const layout = () => {
      if (!container) return;
      const containerWidth = container.clientWidth;
      if (!containerWidth) return;

      const styles = window.getComputedStyle(container);
      const gap = parseFloat(styles.columnGap || styles.gap || '20');
      const rowHeight =
        parseFloat(styles.getPropertyValue('--masonry-row')) || 240;
      const columns = getColumnCount(containerWidth);
      const columnWidth = (containerWidth - gap * (columns - 1)) / columns;
      const heights = new Array(columns).fill(0);

      itemRefs.current.forEach((el) => {
        if (!el) return;

        const spanRaw = el.dataset.span ? Number(el.dataset.span) : 1;
        const rowSpanRaw = el.dataset.rowSpan ? Number(el.dataset.rowSpan) : 1;
        const span = columns >= 2 ? Math.min(spanRaw, columns) : 1;

        let colIndex = 0;
        let y = 0;

        if (span === 1) {
          colIndex = heights.indexOf(Math.min(...heights));
          y = heights[colIndex];
        } else {
          let best = 0;
          let bestY = Infinity;
          for (let i = 0; i <= columns - span; i++) {
            const candidate = Math.max(...heights.slice(i, i + span));
            if (candidate < bestY) {
              bestY = candidate;
              best = i;
            }
          }
          colIndex = best;
          y = Math.max(...heights.slice(colIndex, colIndex + span));
        }

        const width = columnWidth * span + gap * (span - 1);
        const height = rowHeight * rowSpanRaw + gap * (rowSpanRaw - 1);
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.transform = `translate(${colIndex * (columnWidth + gap)}px, ${y}px)`;

        const nextHeight = y + height + gap;
        for (let i = colIndex; i < colIndex + span; i++) {
          heights[i] = nextHeight;
        }
      });

      const maxHeight = Math.max(...heights, 0);
      container.style.height = `${maxHeight}px`;
      container.classList.add('masonry-ready');
    };

    const schedule = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(layout);
    };

    schedule();

    const observer = 'ResizeObserver' in window ? new ResizeObserver(schedule) : null;
    if (observer) {
      observer.observe(container);
      itemRefs.current.forEach((el) => {
        if (el) observer.observe(el);
      });
    }

    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);

    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
    };
  }, [items.length]);

  return (
    <div
      className={`
        relative masonry-container grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        ${className}
      `}
      style={{ ['--masonry-row' as never]: '300px' }}
      ref={containerRef}
    >
      {items.map((item, index) => {
        const key = item.id || String(index);
        const spanColumns = item.spanColumns ? 2 : 1;
        const fallbackSpanClass = item.spanColumns ? 'lg:col-span-2' : '';
        const fallbackRowClass = item.spanRows ? 'lg:row-span-2' : '';
        const rowSpan = item.spanRows ? 2 : 1;

        if (item.type === 'video') {
          return (
            <div
              key={key}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-span={spanColumns}
              data-row-span={rowSpan}
              className={`masonry-item w-full ${fallbackSpanClass} ${fallbackRowClass}`}
            >
              <TestimonialVideoCard
                name={item.name}
                role={item.role}
                company={item.company}
                video={item.video}
                poster={item.poster}
                spanColumns={false}
                spanRows={false}
                videoAspect={item.videoAspect}
                centered={item.centered}
                className="h-full w-full"
              />
            </div>
          );
        }

        return (
          <div
            key={key}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-span={spanColumns}
            data-row-span={rowSpan}
            className={`masonry-item w-full ${fallbackSpanClass} ${fallbackRowClass}`}
          >
            <TestimonialTextCard
              name={item.name}
              role={item.role}
              company={item.company}
              quote={item.quote}
              rating={item.rating}
              avatar={item.avatar}
              spanColumns={false}
              className="h-full"
            />
          </div>
        );
      })}
      <style>{`
        .masonry-ready .masonry-item {
          position: absolute;
          left: 0;
          top: 0;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default TestimonialMasonry;
