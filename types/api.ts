// API 响应类型定义
export type ApiVideoItem = {
  videoId: string;
  userId: number;
  videoTitle: string;
  videoDesc: string;
  coverImage: string;
  videoUrl: string;
  viewNum: number;
  likeNum: number;
  favoritesNum: number;
  publishType: '0' | '1'; // '0' 视频, '1' 图片
  showType: string;
  positionFlag: string;
  auditsStatus: string;
  videoInfo: string | null;
  delFlag: string;
  createBy: string;
  createTime: string;
  updateBy: string | null;
  updateTime: string | null;
  commentNum: number;
  userNickName: string;
  userAvatar: string;
  weatherLike: boolean;
  weatherFavorite: boolean;
  weatherFollow: boolean;
  tags: string[];
  imageList: string[] | null;
  position: string | null;
  hotScore: number | null;
};

export type ApiFeedResponse = {
  code: number;
  msg: string;
  data: ApiVideoItem[];
};

