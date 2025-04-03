
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StoryItem from './StoryItem';
import { Story } from '@/types/social';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoryCarouselProps {
  stories: Story[];
}

const StoryCarousel: React.FC<StoryCarouselProps> = ({ stories }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = 200;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };
  
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = carouselRef.current 
    ? carouselRef.current.scrollWidth > carouselRef.current.clientWidth + scrollPosition
    : false;

  return (
    <div className="relative bg-white py-4 border-b border-gray-200">
      <div className="max-w-screen-md mx-auto px-4">
        <div className="flex items-center">
          {!isMobile && canScrollLeft && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-4 z-10 bg-white rounded-full shadow-lg p-1"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-none py-1 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stories.map((story) => (
              <StoryItem key={story.id} story={story} />
            ))}
          </div>
          
          {!isMobile && canScrollRight && (
            <button 
              onClick={() => scroll('right')}
              className="absolute right-4 z-10 bg-white rounded-full shadow-lg p-1"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryCarousel;
