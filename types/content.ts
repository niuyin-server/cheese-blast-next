export type Quiz = {
  question: string;
  options: string[];
  answer: number;
};

export type Video = {
  id: number;
  title: string;
  userId: string;
  author: string;
  authorAvatar: string;
  likes: string;
  comments: string;
  description: string;
  color: string;
  coverUrl: string;
  knowledgePoint: string;
  quiz: Quiz | null;
};

export type FollowedUser = {
  id: string;
  name: string;
  avatar: string;
};

export type UserProfile = {
  name: string;
  id: string;
  avatar: string;
  following: number;
  followers: string;
  likes: string;
  bio: string;
  badges: string[];
};

