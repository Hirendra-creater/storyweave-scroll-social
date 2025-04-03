
import React from 'react';
import { Bell, Camera, Heart, Home, MessageCircle, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-screen-md mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-social-primary to-social-secondary bg-clip-text text-transparent">
            StoryWeave
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {!isMobile ? (
            <>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Home size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart size={24} />
              </button>
            </>
          ) : (
            <>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Camera size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
