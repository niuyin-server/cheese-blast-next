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
  coverImage?: string;
  knowledgePoint: string;
  quiz: Quiz | null;
  // 扩展字段（来自API）
  publishType?: '0' | '1'; // '0' 视频, '1' 图片
  videoUrl?: string;
  imageList?: string[] | null;
  viewNum?: number;
  weatherLike?: boolean;
  weatherFavorite?: boolean;
  weatherFollow?: boolean;
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
  likedList: string[];
  favoriteList: string[];
  historyList: string[];
};

