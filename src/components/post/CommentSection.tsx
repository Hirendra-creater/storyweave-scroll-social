
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Post, Comment } from '@/types/social';
import TimeAgo from '@/components/utils/TimeAgo';

interface CommentSectionProps {
  post: Post;
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-start">
        <img 
          src={comment.user.avatar} 
          alt={comment.user.username} 
          className="w-6 h-6 rounded-full object-cover mr-2"
        />
        <div>
          <div>
            <span className="font-semibold text-sm mr-1">{comment.user.username}</span>
            <span className="text-sm">{comment.content}</span>
          </div>
          <div className="flex items-center mt-1 space-x-3">
            <span className="text-xs text-gray-500">
              <TimeAgo timestamp={comment.timestamp} />
            </span>
            {likesCount > 0 && (
              <span className="text-xs text-gray-500">{likesCount} likes</span>
            )}
            <button className="text-xs font-medium text-gray-500">Reply</button>
          </div>
        </div>
      </div>
      <button 
        onClick={handleLike}
        className="focus:outline-none"
      >
        <Heart 
          size={14} 
          className={`${liked ? 'fill-social-red text-social-red' : 'text-gray-400'} transition-colors`}
        />
      </button>
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({ post }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // This would typically make an API call to add a comment
      // For now, we'll just clear the input
      setNewComment('');
    }
  };

  return (
    <div className="mt-2">
      {/* Comments list */}
      <div className="max-h-60 overflow-y-auto">
        {post.comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleAddComment} className="mt-3 flex items-center border-t pt-3">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border-none outline-none bg-transparent text-sm"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className={`text-social-primary font-semibold text-sm ${
            !newComment.trim() ? 'opacity-40' : 'opacity-100'
          }`}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
