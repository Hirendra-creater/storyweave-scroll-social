
import React, { useState, useEffect, useRef } from 'react';
import PostItem from './PostItem';
import { Post } from '@/types/social';
import { generateMockPosts } from '@/utils/mockData';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loader = useRef<HTMLDivElement>(null);
  
  // Load initial posts
  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        // In a real app, this would fetch from an API
        const newPosts = generateMockPosts(5); // Start with 5 posts
        setPosts(newPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading posts:', error);
        setLoading(false);
      }
    };
    
    loadInitialPosts();
  }, []);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    const currentLoader = loader.current;
    
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );
    
    if (currentLoader) {
      observer.observe(currentLoader);
    }
    
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loading]);

  const loadMorePosts = async () => {
    try {
      setLoading(true);
      
      // In a real app, fetch more posts with pagination
      const newPosts = generateMockPosts(3); // Get 3 more posts
      
      // Simulate reaching end of content after page 3
      if (page >= 3) {
        setHasMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
      
      // Add new posts, ensuring they're unique by ID
      setPosts(prevPosts => {
        const existingIds = new Set(prevPosts.map(post => post.id));
        const uniqueNewPosts = newPosts.filter(post => !existingIds.has(post.id));
        return [...prevPosts, ...uniqueNewPosts];
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading more posts:', error);
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
      
      {/* Loading indicator and intersection observer target */}
      <div ref={loader} className="text-center py-4">
        {loading && hasMore && (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-social-primary rounded-full animate-spin"></div>
          </div>
        )}
        {!hasMore && <p className="text-gray-500 text-sm">No more posts to show</p>}
      </div>
    </div>
  );
};

export default PostList;
