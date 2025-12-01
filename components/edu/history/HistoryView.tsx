import { ALL_VIDEOS } from '@/app/data/content';

const historyItems = ALL_VIDEOS.map((video, index) => ({
  ...video,
  watchedAt: `${index + 1} 小时前`,
  progress: Math.max(30, 90 - index * 8),
}));

const HistoryView = () => (
  <div className="p-4 md:p-8 pt-6 space-y-6">
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-white">观看历史</h1>
      <p className="text-gray-400 text-sm">
        共 {historyItems.length} 个学习记录，随时回顾已看的知识点
      </p>
    </header>

    <div className="space-y-4">
      {historyItems.map((video) => (
        <div
          key={`${video.id}-${video.watchedAt}`}
          className="bg-gray-900 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-cyan-500/30 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1">
            <div
              className="w-20 h-28 rounded-xl overflow-hidden flex-shrink-0"
              style={{ background: video.coverUrl }}
            ></div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">{video.watchedAt}</div>
              <h3 className="text-lg font-semibold text-white line-clamp-1">
                {video.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {video.description.split('#')[0]}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-cyan-400">
                {video.description.match(/#\w+/g)?.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-48">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>学习进度</span>
              <span>{video.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${video.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HistoryView;

