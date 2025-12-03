import { Play } from 'lucide-react';

type ProfileWorksProps = {
  /**
   * 可选：提供自定义的标题列表
   */
  items?: string[];
  /**
   * 当列表为空时的占位文案
   */
  emptyText?: string;
};

const gradients = [
  'from-indigo-600/70 via-indigo-500/60 to-cyan-500/60',
  'from-fuchsia-500/70 via-purple-500/60 to-blue-500/60',
  'from-orange-500/70 via-amber-500/60 to-pink-500/60',
  'from-emerald-500/70 via-teal-500/60 to-sky-500/60',
];

const defaultWorks = [
  'AI 速成课：三分钟掌握 Transformer',
  '宋朝夜市的繁华密码',
  '零基础 Python 爬虫实战',
  '梵高色彩背后的故事',
  '黑洞到底吞噬了什么？',
  '古代造纸术的演进',
  '日常生活中的量子现象',
  '深海探险：海沟中的秘密',
];

const ProfileWorks = ({ items, emptyText = '暂无内容' }: ProfileWorksProps) => {
  const source = items && items.length > 0 ? items : defaultWorks;

  if (source.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-[var(--color-text-tertiary)] bg-[var(--color-card)] rounded-xl border border-[var(--color-border-soft)]">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {source.map((title, idx) => (
        <div
          key={`${title}-${idx}`}
          className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-[var(--color-border-soft)] bg-[var(--color-card)]"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]} group-hover:scale-105 transition-transform duration-500`}
          />
          <div className="absolute top-2 left-2 flex items-center text-white/90 text-xs drop-shadow-md bg-black/20 backdrop-blur px-2 py-1 rounded-full border border-white/20">
            <Play size={12} className="mr-1 fill-current" />
            {800 + idx * 42}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            <p className="text-white text-sm font-semibold line-clamp-2 drop-shadow">
              {title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileWorks;

