
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  seen: boolean;
  timestamp: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  user: User;
  caption: string;
  imageUrl: string;
  likes: number;
  liked: boolean;
  timestamp: string;
  comments: Comment[];
}
