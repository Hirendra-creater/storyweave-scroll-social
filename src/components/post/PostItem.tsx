
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post } from '@/types/social';
import CommentSection from './CommentSection';
import TimeAgo from '@/components/utils/TimeAgo';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [liked, setLiked] = useState<boolean>(post.liked);
  const [likesCount, setLikesCount] = useState<number>(post.likes);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md mb-4 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <img 
            src={post.user.avatar} 
            alt={post.user.username} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{post.user.username}</p>
          </div>
        </div>
        <button className="text-gray-500">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img 
          src={post.imageUrl} 
          alt="Post" 
          className="w-full object-cover max-h-[500px]"
          loading="lazy"
        />
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className="focus:outline-none"
            >
              <Heart 
                size={24} 
                className={`${liked ? 'fill-social-red text-social-red' : 'text-gray-800'} 
                           ${liked ? 'animate-pulse-scale' : ''} transition-colors`}
              />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="focus:outline-none"
            >
              <MessageCircle size={24} className="text-gray-800" />
            </button>
            <button className="focus:outline-none">
              <Share2 size={24} className="text-gray-800" />
            </button>
          </div>
          <button 
            onClick={handleBookmark}
            className="focus:outline-none"
          >
            <Bookmark 
              size={24} 
              className={`${bookmarked ? 'fill-gray-800' : ''} text-gray-800 transition-colors`} 
            />
          </button>
        </div>

        {/* Likes count */}
        <p className="font-semibold text-sm">{likesCount.toLocaleString()} likes</p>

        {/* Caption */}
        <div className="mt-1 mb-2">
          <span className="font-semibold text-sm mr-1">{post.user.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* View comments toggle */}
        {post.comments.length > 0 && !showComments && (
          <button 
            onClick={() => setShowComments(true)} 
            className="text-gray-500 text-sm"
          >
            View {post.comments.length > 1 ? `all ${post.comments.length} comments` : 'comment'}
          </button>
        )}

        {/* Comments section */}
        {showComments && <CommentSection post={post} />}

        {/* Timestamp */}
        <p className="text-gray-400 text-xs mt-1">
          <TimeAgo timestamp={post.timestamp} />
        </p>
      </div>
    </div>
  );
};

export default PostItem;
