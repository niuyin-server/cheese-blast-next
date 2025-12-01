import { FollowedUser, UserProfile, Video } from "@/types/content";

export const CATEGORIES = [
  "推荐",
  "硬核科普",
  "趣味历史",
  "生活百科",
  "编程开发",
  "艺术审美",
  "公开课",
];

export const FOLLOWED_USERS: FollowedUser[] = [
  {
    id: "physics_li",
    name: "物理李老师",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  },
  {
    id: "history_detective",
    name: "历史侦探",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  },
  {
    id: "code_master",
    name: "CodeMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
  },
  {
    id: "art_micro",
    name: "艺术微课堂",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art",
  },
  {
    id: "ai_daily",
    name: "AI前沿日报",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
  },
];

export const ALL_VIDEOS: Video[] = [
  {
    id: 1,
    title: "30秒看懂量子纠缠：爱因斯坦的'鬼魅'困惑",
    userId: "physics_li",
    author: "物理李老师",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    likes: "12.5w",
    comments: "3421",
    description:
      "爱因斯坦称之为'鬼魅般的超距作用'，到底是怎么回事？ #量子力学 #物理科普 #科学",
    color: "bg-indigo-900",
    coverUrl: "linear-gradient(to bottom right, #312e81, #1e1b4b)",
    knowledgePoint:
      "量子纠缠是指两个或多个粒子处于相关状态，无论相距多远，其状态改变瞬间同步。",
    quiz: {
      question: "量子纠缠受距离限制吗？",
      options: ["受限制，超过光速失效", "不受限制，瞬间同步"],
      answer: 1,
    },
  },
  {
    id: 2,
    title: "宋朝的夜市有多繁华？清明上河图里的细节",
    userId: "history_detective",
    author: "历史侦探",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    likes: "8.2w",
    comments: "1029",
    description:
      "在那时，宵禁制度被打破，东京梦华录里的繁华景象。 #历史 #宋朝 #文化",
    color: "bg-amber-900",
    coverUrl: "linear-gradient(to bottom right, #78350f, #451a03)",
    knowledgePoint:
      "宋朝是中国历史上唯一一个不实行宵禁的朝代，商业高度发达，出现了最早的纸币'交子'。",
    quiz: null,
  },
  {
    id: 3,
    title: "零基础Python入门：写出你的第一个爬虫",
    userId: "code_master",
    author: "CodeMaster",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
    likes: "2.1w",
    comments: "543",
    description:
      "只要5行代码，获取网页标题。编程其实不难！ #Python #编程 #计算机",
    color: "bg-slate-800",
    coverUrl: "linear-gradient(to bottom right, #0f172a, #020617)",
    knowledgePoint:
      "Python的requests库是处理HTTP请求的神器，BeautifulSoup用于解析HTML结构。",
    quiz: {
      question: "Python中用于输出内容的函数是？",
      options: ["console.log()", "print()", "System.out.println()"],
      answer: 1,
    },
  },
  {
    id: 4,
    title: "西方艺术史：为什么梵高的画这么'扭曲'？",
    userId: "art_micro",
    author: "艺术微课堂",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art",
    likes: "4.3w",
    comments: "210",
    description:
      "后印象派的狂野与激情。星月夜背后的精神世界。 #艺术 #梵高 #油画",
    color: "bg-blue-900",
    coverUrl: "linear-gradient(to bottom right, #1e3a8a, #172554)",
    knowledgePoint: "后印象派强调主观情感的表达，不再单纯追求光影的客观记录。",
    quiz: null,
  },
  {
    id: 5,
    title: "深度学习中的注意力机制",
    userId: "ai_daily",
    author: "AI前沿日报",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    likes: "15w",
    comments: "5000",
    description: "Transformer模型的灵魂所在，如何让模型'关注'重要信息。",
    color: "bg-purple-900",
    coverUrl: "linear-gradient(to bottom right, #581c87, #3b0764)",
    knowledgePoint:
      "注意力机制允许模型对输入序列的不同部分分配不同的权重，从而聚焦于重要的信息。",
    quiz: {
      question: "Transformer模型主要依赖什么机制？",
      options: ["RNN", "Attention"],
      answer: 1,
    },
  },
  {
    id: 6,
    title: "物理小实验：如何在家制造'云'？",
    userId: "physics_li",
    author: "物理李老师",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    likes: "5.1w",
    comments: "1200",
    description:
      "一个瓶子，一点点水和火柴，就能模拟大气科学。 #实验 #物理 #科学",
    color: "bg-sky-900",
    coverUrl: "linear-gradient(to bottom right, #075985, #082f49)",
    knowledgePoint: "云的形成需要饱和的水汽、降温和凝结核。",
    quiz: null,
  },
  {
    id: 7,
    title: "秦始皇陵的未解之谜：兵马俑为何面部不同？",
    userId: "history_detective",
    author: "历史侦探",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    likes: "10w",
    comments: "3000",
    description:
      "每一个兵马俑都是独一无二的，这背后体现了怎样的工艺？ #秦朝 #考古 #历史",
    color: "bg-red-900",
    coverUrl: "linear-gradient(to bottom right, #7f1d1d, #450a0a)",
    knowledgePoint:
      "秦始皇陵是中国历史上第一个皇帝的陵墓，兵马俑的制作使用了模塑和刻画结合的工艺。",
    quiz: null,
  },
  {
    id: 8,
    title: "用JS实现一个简易神经网络",
    userId: "code_master",
    author: "CodeMaster",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
    likes: "3.5w",
    comments: "900",
    description:
      "不用任何库，理解神经网络的底层逻辑。 #Javascript #编程 #AI",
    color: "bg-teal-900",
    coverUrl: "linear-gradient(to bottom right, #065f46, #042f2e)",
    knowledgePoint:
      "神经网络通过调整权重和偏置来最小化损失函数，实现学习。",
    quiz: null,
  },
];

export const HOME_VIDEOS: Video[] = [...ALL_VIDEOS, ...ALL_VIDEOS, ...ALL_VIDEOS];

export const USER_PROFILE: UserProfile = {
  name: "好奇心日报",
  id: "curious_daily",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoey",
  following: 128,
  followers: "35.2w",
  likes: "120w",
  bio: "分享有趣的冷知识，让学习像呼吸一样简单。 🎓 认证科普作者",
  badges: ["金牌讲师", "百大UP", "勤更标兵"],
};

