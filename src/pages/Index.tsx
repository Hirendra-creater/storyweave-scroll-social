
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StoryCarousel from '@/components/story/StoryCarousel';
import PostList from '@/components/post/PostList';
import { Story } from '@/types/social';
import { generateMockStories } from '@/utils/mockData';

const Index = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockStories = generateMockStories();
    setStories(mockStories);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-social-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <StoryCarousel stories={stories} />
      )}
      
      <div className="max-w-screen-md mx-auto px-4 py-4">
        <PostList />
      </div>
    </div>
  );
};

export default Index;
