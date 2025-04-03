
import React from 'react';
import { Story } from '@/types/social';

interface StoryItemProps {
  story: Story;
}

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  return (
    <div className="flex flex-col items-center space-y-1 w-20">
      <div className={story.seen ? "story-ring-seen" : "story-ring"}>
        <div className="bg-white rounded-full p-0.5">
          <img 
            src={story.user.avatar} 
            alt={story.user.username} 
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs truncate w-full text-center">
        {story.user.username}
      </span>
    </div>
  );
};

export default StoryItem;
