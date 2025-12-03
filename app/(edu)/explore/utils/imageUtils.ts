/**
 * 根据视频 ID 生成图片 URL
 * 如果 coverUrl 已经是网络图片链接，则直接返回
 * 否则根据视频 ID 生成一个图片 URL
 */
export const getVideoCoverUrl = (videoId: number, coverUrl: string): string => {
  // 如果已经是网络图片链接，直接返回
  if (
    coverUrl.startsWith('http://') ||
    coverUrl.startsWith('https://') ||
    coverUrl.startsWith('//')
  ) {
    return coverUrl;
  }

  // 否则根据视频 ID 生成图片 URL
  // 使用 Picsum Photos 服务，根据视频 ID 生成不同的图片
  const width = 400;
  const height = 600 + (videoId % 3) * 50; // 生成不同高度的图片，模拟瀑布流效果
  return `https://picsum.photos/${width}/${height}?random=${videoId}`;
};

