'use client';

import {
  BookOpen,
  Brain,
  CalendarDays,
  Clock4,
  Film,
  Gift,
  GraduationCap,
  PlayCircle,
  Rocket,
  Sparkles,
  Trophy,
  TrendingUp,
  UploadCloud,
  Users,
  Video,
} from 'lucide-react';

const tracks = [
  {
    icon: Brain,
    title: 'AI 学习营 · Prompt 设计',
    desc: '跟着导师学会用大模型拆解知识点，输出脚本与考题。',
    badge: '每日 30 分钟',
    gradient: 'from-indigo-400 via-purple-400 to-pink-400',
  },
  {
    icon: Film,
    title: '短视频实战 · 10s 课堂',
    desc: '将脚本转成 10-30s 课堂短视频，结合字幕、BGM、节奏控。',
    badge: '全站曝光加速',
    gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
  },
  {
    icon: Sparkles,
    title: 'AI 工具链 · 一键出片',
    desc: '体验 TTS 配音、AI 分镜、智能剪辑，一键生成课程亮点视频。',
    badge: '免费工具位',
    gradient: 'from-amber-400 via-orange-400 to-rose-500',
  },
];

const milestones = [
  { title: '报名&组队', time: 'Day 1', desc: '加入交流群，领取创作脚本模板与 AI 工具清单。', icon: CalendarDays },
  { title: '脚本打磨', time: 'Day 2-3', desc: '基于热点知识点生成脚本，导师点评，AI 辅助润色。', icon: Brain },
  { title: '剪辑出片', time: 'Day 4-6', desc: '用智能剪辑模版快速出 10s-30s 教育短视频，自动加字幕。', icon: Video },
  { title: '上线冲榜', time: 'Day 7', desc: '统一上传活动专题，参与站内推荐和热榜竞速。', icon: Rocket },
];

const rewards = [
  { icon: Trophy, title: 'TOP 创作者', detail: '首页推荐位 + 品牌联名证书' },
  { icon: Gift, title: '工具权益', detail: 'AI 配音 / 字幕 / 背景音乐包 免费额度' },
  { icon: GraduationCap, title: '教育加速', detail: '专项流量池曝光，适配课程频道' },
  { icon: PlayCircle, title: '直播分享', detail: '与导师共创直播间，展示获奖作品' },
];

const stats = [
  { label: '参与创作者', value: '12,480', icon: Users, tone: 'from-cyan-400 to-blue-500' },
  { label: '累计投稿', value: '38,920', icon: UploadCloud, tone: 'from-indigo-400 to-violet-500' },
  { label: '入围作品', value: '2,480', icon: BookOpen, tone: 'from-emerald-400 to-teal-500' },
  { label: '站内曝光', value: '1.2 亿+', icon: TrendingUp, tone: 'from-amber-400 to-orange-500' },
];

const ActivityView = () => {
  return (
    <div className="p-4 md:p-8 pt-6 bg-[var(--color-bg)] min-h-screen space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-cyan-500/5">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-orange-500/10 pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-lg bg-white/15 dark:bg-gray-800/40 border border-white/30 dark:border-gray-700/40 text-[var(--color-text-primary)]">
              <Sparkles size={14} className="text-[var(--color-accent)]" />
              AI x 教育 · 短视频创作季
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] leading-snug">
              用 AI 让知识闪光：7 天打造你的「10s 微课堂」
            </h1>
            <p className="text-[var(--color-text-secondary)] text-sm md:text-base">
              结合大模型脚本、智能配音、快速剪辑，产出高转化的教育短视频。站内热榜同步曝光，优秀作品可获直播联动与课程分发。
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <button className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md shadow-cyan-500/30 hover:translate-y-[-1px] active:translate-y-[1px] transition inline-flex items-center gap-2 cursor-pointer">
                <Rocket size={16} className="text-white" />
                立即报名
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-semibold text-[var(--color-text-primary)] backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 border border-white/30 dark:border-gray-700/30 hover:border-white/50 dark:hover:border-gray-700/50 transition inline-flex items-center gap-2 cursor-pointer">
                <BookOpen size={16} className="text-[var(--color-text-secondary)]" />
                查看攻略
              </button>
              <div className="flex items-center gap-2 text-[var(--color-text-tertiary)] text-xs px-3 py-1 rounded-full backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30">
                <TrendingUp size={14} className="text-[var(--color-accent)]" />
                热门话题 · AI 教育 / 10s 微课堂 / 智能剪辑
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl backdrop-blur-lg bg-white/10 dark:bg-gray-900/15 border border-white/20 dark:border-gray-700/20 px-4 py-3 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${item.tone} border border-white/30 dark:border-gray-700/40 text-white shadow-sm`}>
                  <item.icon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold text-[var(--color-text-primary)]">{item.value}</span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div
            key={track.title}
            className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 p-5 shadow-lg shadow-cyan-500/5"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-15 pointer-events-none`} />
            <div className="relative flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/15 dark:bg-gray-800/40 border border-white/30 dark:border-gray-700/40 flex items-center justify-center">
                    <track.icon size={20} className="text-[var(--color-text-primary)]" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{track.title}</h3>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full backdrop-blur-lg bg-white/20 dark:bg-gray-700/30 text-[var(--color-text-secondary)] border border-white/30 dark:border-gray-600/40">
                  {track.badge}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">{track.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-2xl p-5 md:p-6 shadow-lg shadow-cyan-500/5 space-y-4">
        <div className="flex items-center gap-3">
          <Clock4 size={18} className="text-[var(--color-accent)]" />
          <div>
            <div className="text-lg font-semibold text-[var(--color-text-primary)]">7 天冲刺日程</div>
            <div className="text-sm text-[var(--color-text-tertiary)]">按天拆解，照着做就能出片</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {milestones.map((m) => (
            <div
              key={m.title}
              className="rounded-xl border border-white/20 dark:border-gray-700/20 backdrop-blur-lg bg-white/5 dark:bg-gray-800/20 p-4 flex items-start gap-3 hover:border-white/30 dark:hover:border-gray-600/40 transition shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/30 flex items-center justify-center border border-white/30 dark:border-gray-700/40">
                <m.icon size={18} className="text-[var(--color-text-primary)]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 dark:bg-gray-700/30 border border-white/20 dark:border-gray-600/30 text-[var(--color-text-secondary)]">
                    {m.time}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{m.title}</span>
                </div>
                <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-2xl p-5 md:p-6 shadow-lg shadow-cyan-500/5 space-y-4">
        <div className="flex items-center gap-3">
          <Gift size={18} className="text-[var(--color-accent)]" />
          <div>
            <div className="text-lg font-semibold text-[var(--color-text-primary)]">奖励与权益</div>
            <div className="text-sm text-[var(--color-text-tertiary)]">曝光 + 工具 + 认证，多重激励</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {rewards.map((reward) => (
            <div
              key={reward.title}
              className="rounded-xl border border-white/20 dark:border-gray-700/20 backdrop-blur-lg bg-white/5 dark:bg-gray-800/20 p-4 flex flex-col gap-2 hover:border-white/30 dark:hover:border-gray-600/40 transition shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/30 flex items-center justify-center border border-white/30 dark:border-gray-700/40">
                <reward.icon size={18} className="text-[var(--color-text-primary)]" />
              </div>
              <div className="text-sm font-semibold text-[var(--color-text-primary)]">{reward.title}</div>
              <div className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">{reward.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityView;


