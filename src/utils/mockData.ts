
import { Post, Story, User, Comment } from "../types/social";

// Avatars use placeholder images with specific seeds for consistent images
const generateAvatar = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

// Mock user data
export const mockUsers: User[] = [
  {
    id: "1",
    username: "johndoe",
    displayName: "John Doe",
    avatar: generateAvatar("john")
  },
  {
    id: "2",
    username: "janedoe",
    displayName: "Jane Doe",
    avatar: generateAvatar("jane")
  },
  {
    id: "3", 
    username: "alex_smith",
    displayName: "Alex Smith",
    avatar: generateAvatar("alex")
  },
  {
    id: "4",
    username: "sarah_miller",
    displayName: "Sarah Miller",
    avatar: generateAvatar("sarah")
  },
  {
    id: "5",
    username: "mike_jones",
    displayName: "Mike Jones",
    avatar: generateAvatar("mike")
  },
  {
    id: "6",
    username: "lisa_taylor",
    displayName: "Lisa Taylor",
    avatar: generateAvatar("lisa")
  },
  {
    id: "7",
    username: "chris_davis",
    displayName: "Chris Davis",
    avatar: generateAvatar("chris")
  },
  {
    id: "8",
    username: "emma_wilson",
    displayName: "Emma Wilson",
    avatar: generateAvatar("emma")
  }
];

// Helper function to get random user
const getRandomUser = (): User => {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)];
};

// Generate random timestamp within last 48 hours
const getRandomTimestamp = (): string => {
  const now = new Date();
  const hoursAgo = Math.floor(Math.random() * 48);
  now.setHours(now.getHours() - hoursAgo);
  return now.toISOString();
};

// Generate mock stories
export const generateMockStories = (): Story[] => {
  return mockUsers.map((user, index) => ({
    id: `story-${index + 1}`,
    user,
    imageUrl: `https://picsum.photos/seed/${user.username}/400/700`,
    seen: Math.random() > 0.6, // 40% chance of being seen
    timestamp: getRandomTimestamp()
  }));
};

// Generate mock comments
const generateMockComments = (count: number): Comment[] => {
  const comments: Comment[] = [];
  
  const commentTexts = [
    "This is amazing! 🔥",
    "Love this content 😍",
    "Great shot!",
    "Awesome! 👏",
    "Wow, incredible!",
    "This made my day ❤️",
    "Can't believe how good this is",
    "Absolutely stunning",
    "I'm inspired!",
    "Keep posting content like this",
    "Perfect shot 📸",
    "This is goals!",
    "Such a vibe ✨"
  ];

  for (let i = 0; i < count; i++) {
    comments.push({
      id: `comment-${Math.random().toString(36).substring(2, 9)}`,
      user: getRandomUser(),
      content: commentTexts[Math.floor(Math.random() * commentTexts.length)],
      timestamp: getRandomTimestamp(),
      likes: Math.floor(Math.random() * 50)
    });
  }

  return comments;
};

// Generate a set of mock posts
export const generateMockPosts = (count: number): Post[] => {
  const posts: Post[] = [];
  
  const captions = [
    "Enjoying this beautiful day! ☀️ #blessed",
    "Just finished this amazing project 💼 #productivity",
    "Nothing beats a good cup of coffee in the morning ☕",
    "Exploring new places 🌎 #travel",
    "Good vibes only ✨ #positivity",
    "New chapter, new beginnings 📖 #motivation",
    "Weekend adventures with friends 👫 #friendship",
    "Taking a moment to appreciate the little things 🌿",
    "Trying something new today! 🚀 #challenge",
    "Self-care Sunday 🧖‍♀️ #wellness"
  ];

  for (let i = 0; i < count; i++) {
    const user = getRandomUser();
    posts.push({
      id: `post-${i + 1}`,
      user,
      caption: captions[Math.floor(Math.random() * captions.length)],
      imageUrl: `https://picsum.photos/seed/${i + 1}/600/600`,
      likes: Math.floor(Math.random() * 1000),
      liked: Math.random() > 0.7, // 30% chance of being liked by current user
      timestamp: getRandomTimestamp(),
      comments: generateMockComments(Math.floor(Math.random() * 5) + 1) // 1-5 comments
    });
  }

  return posts;
};
