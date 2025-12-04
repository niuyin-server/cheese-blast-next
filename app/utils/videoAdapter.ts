import { ApiVideoItem } from '@/types/api';
import { Video } from '@/types/content';

// 颜色数组，用于为视频分配背景色
const colors = [
  'bg-indigo-900',
  'bg-amber-900',
  'bg-slate-800',
  'bg-blue-900',
  'bg-purple-900',
  'bg-sky-900',
  'bg-red-900',
  'bg-teal-900',
];

/**
 * 格式化数字为显示字符串（如：1.2w, 3.5k）
 */
function formatCount(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}w`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

/**
 * 将API视频数据转换为应用内的Video类型
 */
export function adaptApiVideoToVideo(apiVideo: ApiVideoItem, index: number): Video {
  // 根据publishType决定封面URL
  // publishType: '0' 视频, '1' 图片
  let coverUrl = apiVideo.coverImage;
  
  // 如果是图片类型且有imageList，使用第一张图片作为封面
  if (apiVideo.publishType === '1' && apiVideo.imageList && apiVideo.imageList.length > 0) {
    coverUrl = apiVideo.imageList[0];
  }

  // 从tags生成description（带#标签）
  const tagsText = apiVideo.tags.length > 0 
    ? apiVideo.tags.map(tag => `#${tag}`).join(' ')
    : '';
  const description = apiVideo.videoDesc || tagsText;

  // 解析videoInfo获取时长等信息（如果需要）
  let knowledgePoint = '分享精彩内容';
  try {
    if (apiVideo.videoInfo) {
      const videoInfo = JSON.parse(apiVideo.videoInfo);
      if (videoInfo.duration) {
        const seconds = Math.floor(videoInfo.duration / 1000);
        const minutes = Math.floor(seconds / 60);
        knowledgePoint = `视频时长: ${minutes}分${seconds % 60}秒`;
      }
    }
  } catch (e) {
    // 解析失败时使用默认值
  }

  return {
    id: index + 1, // 使用索引作为id，或者可以使用videoId的hash
    title: apiVideo.videoTitle,
    userId: apiVideo.userId.toString(),
    author: apiVideo.userNickName,
    authorAvatar: apiVideo.userAvatar,
    likes: formatCount(apiVideo.likeNum),
    comments: formatCount(apiVideo.commentNum),
    description: description,
    color: colors[index % colors.length],
    coverUrl: coverUrl,
    coverImage: apiVideo.coverImage,
    knowledgePoint: knowledgePoint,
    quiz: null, // API数据中没有quiz信息
    // 扩展字段（可选，保持向后兼容）
    publishType: apiVideo.publishType,
    videoUrl: apiVideo.videoUrl,
    imageList: apiVideo.imageList,
    viewNum: apiVideo.viewNum,
    weatherLike: apiVideo.weatherLike,
    weatherFavorite: apiVideo.weatherFavorite,
    weatherFollow: apiVideo.weatherFollow,
  } as Video & {
    publishType?: '0' | '1';
    videoUrl?: string;
    imageList?: string[] | null;
    viewNum?: number;
    weatherLike?: boolean;
    weatherFavorite?: boolean;
    weatherFollow?: boolean;
  };
}

