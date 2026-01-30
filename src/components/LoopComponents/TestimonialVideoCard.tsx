/**
 * TestimonialVideoCard Component
 *
 * Displays a video testimonial card with video playback, play button, and overlay.
 * Used in the testimonials masonry grid for video testimonials.
 * Adapted for i75 branding (teal/orange theme).
 */

import { useState, useRef } from 'react';

interface TestimonialVideoCardProps {
  name: string;
  role?: string;
  company?: string;
  video: string;
  poster?: string;
  className?: string;
  spanColumns?: boolean;
  spanRows?: boolean;
  videoAspect?: 'portrait' | 'landscape' | 'square';
}

const TestimonialVideoCard = ({
  name,
  role = "Customer",
  company,
  video,
  poster,
  className = '',
  spanColumns = false,
  spanRows = false,
  videoAspect = 'portrait',
}: TestimonialVideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Build span classes
  const spanClasses = [
    spanColumns ? 'xl:col-span-2' : '',
    spanRows ? 'xl:row-span-2 min-h-0 h-full' : '',
  ].filter(Boolean).join(' ');

  // Build aspect ratio classes
  const aspectClasses = {
    portrait: 'aspect-[9/16]',
    landscape: 'aspect-video',
    square: 'aspect-square',
  }[videoAspect] || 'aspect-[9/16]';

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const displayRole = company ? `${role} at ${company}` : role;

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl shadow-xl
        cursor-pointer transition-transform duration-300
        bg-gradient-to-br from-neutral-800 to-neutral-900
        hover:scale-[1.02]
        ${aspectClasses}
        ${spanClasses}
        ${className}
      `}
      onClick={handlePlayClick}
    >
      {/* Video element with poster - fills container */}
      <video
        ref={videoRef}
        src={video}
        poster={poster}
        className="w-full h-full object-cover absolute inset-0"
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Gradient overlay - hide when playing */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Play button - centered, hide when playing */}
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg bg-white/90
          hover:scale-110 hover:bg-white
          ${isPlaying ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {/* Play triangle */}
        <div
          className="w-0 h-0 ml-1"
          style={{
            borderLeft: '18px solid var(--color-primary)',
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
          }}
        />
      </div>

      {/* Author info - hide when playing */}
      <div className={`absolute bottom-5 left-5 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <div className="font-bold text-white text-xl">
          {name}
        </div>
        <div className="text-white/70 text-sm">{displayRole}</div>
      </div>
    </div>
  );
};

export default TestimonialVideoCard;
