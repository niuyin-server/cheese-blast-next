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

// 生成视频封面图片 URL 的辅助函数
const getCoverImageUrl = (videoId: number): string => {
  const width = 400;
  const height = 600 + (videoId % 3) * 50; // 生成不同高度的图片，模拟瀑布流效果
  return `https://picsum.photos/${width}/${height}?random=${videoId}`;
};

// 生成更多视频数据的辅助函数
const generateVideos = (): Video[] => {
  const baseVideos: Video[] = [
    {
      id: 1,
      title: "30秒看懂量子纠缠：爱因斯坦的'鬼魅'困惑",
      userId: "physics_li",
      author: "物理李老师",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      likes: "12.5w",
      comments: "3421",
      description: "爱因斯坦称之为'鬼魅般的超距作用'，到底是怎么回事？ #量子力学 #物理科普 #科学",
      color: "bg-indigo-900",
      coverUrl: getCoverImageUrl(1),
      knowledgePoint: "量子纠缠是指两个或多个粒子处于相关状态，无论相距多远，其状态改变瞬间同步。",
      quiz: { question: "量子纠缠受距离限制吗？", options: ["受限制，超过光速失效", "不受限制，瞬间同步"], answer: 1 },
    },
    {
      id: 2,
      title: "宋朝的夜市有多繁华？清明上河图里的细节",
      userId: "history_detective",
      author: "历史侦探",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
      likes: "8.2w",
      comments: "1029",
      description: "在那时，宵禁制度被打破，东京梦华录里的繁华景象。 #历史 #宋朝 #文化",
      color: "bg-amber-900",
      coverUrl: getCoverImageUrl(2),
      knowledgePoint: "宋朝是中国历史上唯一一个不实行宵禁的朝代，商业高度发达，出现了最早的纸币'交子'。",
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
      description: "只要5行代码，获取网页标题。编程其实不难！ #Python #编程 #计算机",
      color: "bg-slate-800",
      coverUrl: getCoverImageUrl(3),
      knowledgePoint: "Python的requests库是处理HTTP请求的神器，BeautifulSoup用于解析HTML结构。",
      quiz: { question: "Python中用于输出内容的函数是？", options: ["console.log()", "print()", "System.out.println()"], answer: 1 },
    },
    {
      id: 4,
      title: "西方艺术史：为什么梵高的画这么'扭曲'？",
      userId: "art_micro",
      author: "艺术微课堂",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art",
      likes: "4.3w",
      comments: "210",
      description: "后印象派的狂野与激情。星月夜背后的精神世界。 #艺术 #梵高 #油画",
      color: "bg-blue-900",
      coverUrl: getCoverImageUrl(4),
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
      coverUrl: getCoverImageUrl(5),
      knowledgePoint: "注意力机制允许模型对输入序列的不同部分分配不同的权重，从而聚焦于重要的信息。",
      quiz: { question: "Transformer模型主要依赖什么机制？", options: ["RNN", "Attention"], answer: 1 },
    },
    {
      id: 6,
      title: "物理小实验：如何在家制造'云'？",
      userId: "physics_li",
      author: "物理李老师",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      likes: "5.1w",
      comments: "1200",
      description: "一个瓶子，一点点水和火柴，就能模拟大气科学。 #实验 #物理 #科学",
      color: "bg-sky-900",
      coverUrl: getCoverImageUrl(6),
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
      description: "每一个兵马俑都是独一无二的，这背后体现了怎样的工艺？ #秦朝 #考古 #历史",
      color: "bg-red-900",
      coverUrl: getCoverImageUrl(7),
      knowledgePoint: "秦始皇陵是中国历史上第一个皇帝的陵墓，兵马俑的制作使用了模塑和刻画结合的工艺。",
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
      description: "不用任何库，理解神经网络的底层逻辑。 #Javascript #编程 #AI",
      color: "bg-teal-900",
      coverUrl: getCoverImageUrl(8),
      knowledgePoint: "神经网络通过调整权重和偏置来最小化损失函数，实现学习。",
      quiz: null,
    },
  ];

  // 扩展的视频数据模板
  const videoTemplates = [
    // 物理类
    { title: "黑洞真的'黑'吗？霍金辐射的奥秘", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "黑洞不是完全黑的，它会发出辐射。 #黑洞 #物理 #霍金", knowledgePoint: "霍金辐射是黑洞因量子效应而发出的辐射，导致黑洞质量逐渐减少。" },
    { title: "相对论时间膨胀：为什么GPS需要修正？", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "爱因斯坦的相对论如何影响我们的日常生活？ #相对论 #GPS #物理", knowledgePoint: "GPS卫星速度较快，时间流逝比地面慢，需要相对论修正才能准确定位。" },
    { title: "光的波粒二象性：它到底是波还是粒子？", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "双缝实验揭示的量子世界真相。 #光学 #量子物理 #科学", knowledgePoint: "光既表现出波动性（干涉、衍射），也表现出粒子性（光电效应），这就是波粒二象性。" },
    { title: "超导体的零电阻：为什么能悬浮磁铁？", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "超导体的神奇特性，未来能源的希望。 #超导 #物理 #科技", knowledgePoint: "超导体在临界温度以下电阻为零，并产生迈斯纳效应，排斥磁场，使磁铁悬浮。" },
    { title: "核聚变：太阳的能量来源", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "为什么核聚变是清洁能源的未来？ #核聚变 #能源 #物理", knowledgePoint: "核聚变是轻核结合成重核的过程，释放巨大能量，是太阳和氢弹的能量来源。" },
    
    // 历史类
    { title: "唐朝的丝绸之路：东西方文明的桥梁", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "一条路改变世界格局。 #唐朝 #丝绸之路 #历史", knowledgePoint: "丝绸之路是古代连接东西方的贸易通道，促进了文化、技术和商品的交流。" },
    { title: "明朝的郑和下西洋：比哥伦布早87年", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "中国历史上最伟大的航海壮举。 #明朝 #郑和 #航海", knowledgePoint: "郑和七下西洋，最远到达非洲东海岸，比欧洲大航海时代早了近一个世纪。" },
    { title: "古埃及金字塔：4500年前的建筑奇迹", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "如何在没有现代机械的情况下建造？ #古埃及 #金字塔 #考古", knowledgePoint: "金字塔是古埃及法老的陵墓，使用巨石堆砌，体现了古埃及人的工程智慧。" },
    { title: "罗马帝国的兴衰：从共和国到帝国", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "一个横跨三大洲的超级帝国。 #罗马 #历史 #帝国", knowledgePoint: "罗马帝国从共和国转变为帝国，统治了地中海沿岸，对后世影响深远。" },
    { title: "二战中的密码战：图灵机的诞生", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "数学如何改变战争？ #二战 #密码 #图灵", knowledgePoint: "图灵破解了德国的恩尼格玛密码机，为盟军胜利做出重要贡献，也推动了计算机科学的发展。" },
    
    // 编程类
    { title: "React Hooks：函数式组件的革命", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "为什么Hooks改变了React开发方式？ #React #前端 #编程", knowledgePoint: "Hooks允许在函数组件中使用状态和生命周期，使代码更简洁、可复用。" },
    { title: "算法复杂度：O(n)到底是什么意思？", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "理解算法效率的关键概念。 #算法 #数据结构 #编程", knowledgePoint: "大O表示法描述算法的时间或空间复杂度，帮助评估算法效率。" },
    { title: "Git版本控制：从零到精通", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "程序员必备的版本管理工具。 #Git #版本控制 #开发", knowledgePoint: "Git是分布式版本控制系统，可以跟踪代码变更历史，支持多人协作开发。" },
    { title: "TypeScript vs JavaScript：类型安全的重要性", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "为什么大型项目都选择TypeScript？ #TypeScript #JavaScript #编程", knowledgePoint: "TypeScript为JavaScript添加了类型系统，可以在编译时发现错误，提高代码质量。" },
    { title: "微服务架构：从单体应用到分布式", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "现代软件架构的设计模式。 #微服务 #架构 #后端", knowledgePoint: "微服务将应用拆分为独立的小服务，每个服务可以独立开发、部署和扩展。" },
    
    // 艺术类
    { title: "印象派：捕捉光影的瞬间", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "莫奈如何用画笔记录时间？ #印象派 #莫奈 #艺术", knowledgePoint: "印象派强调在户外写生，捕捉光线和色彩的瞬间变化，开创了现代绘画的先河。" },
    { title: "文艺复兴：达芬奇的科学艺术", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "艺术与科学的完美结合。 #文艺复兴 #达芬奇 #艺术", knowledgePoint: "达芬奇不仅是画家，还是科学家和发明家，体现了文艺复兴时期人文主义精神。" },
    { title: "中国画：水墨之间的意境", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "为什么中国画追求'留白'？ #国画 #水墨 #艺术", knowledgePoint: "中国画强调意境和留白，通过虚实结合营造深远的艺术境界。" },
    { title: "现代艺术：从抽象到概念", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "艺术如何突破传统边界？ #现代艺术 #抽象 #艺术", knowledgePoint: "现代艺术不再追求写实，而是表达情感、观念和形式美，拓展了艺术的边界。" },
    { title: "摄影构图：黄金分割的魔力", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "如何拍出专业级照片？ #摄影 #构图 #艺术", knowledgePoint: "黄金分割比例（约1:1.618）是自然界和艺术中常见的比例，能产生视觉美感。" },
    
    // AI类
    { title: "GPT模型原理：从Transformer到ChatGPT", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "大语言模型是如何工作的？ #GPT #AI #机器学习", knowledgePoint: "GPT基于Transformer架构，通过大规模预训练学习语言模式，可以生成连贯的文本。" },
    { title: "计算机视觉：AI如何'看懂'图片？", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "卷积神经网络的应用。 #计算机视觉 #CNN #AI", knowledgePoint: "卷积神经网络通过卷积层提取图像特征，可以识别物体、人脸等，广泛应用于图像识别。" },
    { title: "强化学习：AI如何学会玩游戏？", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "从AlphaGo到游戏AI。 #强化学习 #AI #游戏", knowledgePoint: "强化学习通过试错和奖励机制，让AI在环境中学习最优策略，在游戏和机器人控制中表现出色。" },
    { title: "生成对抗网络：AI如何创造艺术？", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "GAN如何生成逼真的图像？ #GAN #AI #生成模型", knowledgePoint: "生成对抗网络由生成器和判别器组成，通过对抗训练生成逼真的图像、音乐等创作内容。" },
    { title: "大模型训练：需要多少算力？", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "训练GPT-4需要多少资源？ #大模型 #训练 #AI", knowledgePoint: "大模型训练需要海量数据和计算资源，GPT-4的训练成本可能达到数千万美元。" },
  ];

  const allVideos: Video[] = [...baseVideos];
  let currentId = baseVideos.length + 1;

  // 添加所有模板视频（每个模板只添加一次）
  videoTemplates.forEach((template) => {
    const likes = [
      `${(Math.random() * 20 + 1).toFixed(1)}w`,
      `${Math.floor(Math.random() * 5000 + 100)}`,
      `${(Math.random() * 10 + 0.5).toFixed(1)}w`,
    ];
    const comments = [
      `${Math.floor(Math.random() * 5000 + 100)}`,
      `${(Math.random() * 5 + 0.5).toFixed(1)}w`,
      `${Math.floor(Math.random() * 2000 + 50)}`,
    ];
    
    const videoId = currentId++;
    allVideos.push({
      id: videoId,
      title: template.title,
      userId: template.userId,
      author: template.author,
      authorAvatar: template.authorAvatar,
      likes: likes[Math.floor(Math.random() * likes.length)],
      comments: comments[Math.floor(Math.random() * comments.length)],
      description: template.description,
      color: template.color,
      coverUrl: getCoverImageUrl(videoId),
      knowledgePoint: template.knowledgePoint,
      quiz: Math.random() > 0.7 ? {
        question: "这是一个测试问题？",
        options: ["选项A", "选项B", "选项C"],
        answer: Math.floor(Math.random() * 3),
      } : null,
    });
  });

  // 添加更多扩展视频模板以增加数据量
  const extendedTemplates = [
    // 更多物理类
    { title: "薛定谔的猫：量子叠加态的解释", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "猫到底是死是活？ #量子物理 #薛定谔 #科学", knowledgePoint: "薛定谔的猫是一个思想实验，说明量子叠加态在宏观世界的荒谬性。" },
    { title: "暗物质：宇宙中看不见的物质", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "为什么宇宙需要暗物质？ #暗物质 #宇宙 #物理", knowledgePoint: "暗物质不发光也不吸收光，但通过引力影响星系运动，占宇宙物质的27%。" },
    { title: "弦理论：万物皆由弦振动产生", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "统一量子力学和相对论的尝试。 #弦理论 #物理 #理论", knowledgePoint: "弦理论认为基本粒子不是点，而是一维的弦，通过振动产生不同的粒子。" },
    { title: "反物质：为什么宇宙中这么少？", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "反物质与物质相遇会湮灭。 #反物质 #物理 #宇宙", knowledgePoint: "反物质与物质质量相同但电荷相反，相遇时会完全转化为能量。" },
    { title: "量子计算：超越经典计算机", userId: "physics_li", author: "物理李老师", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", color: "bg-indigo-900", description: "量子比特如何实现并行计算？ #量子计算 #计算机 #物理", knowledgePoint: "量子计算利用量子叠加和纠缠，可以在某些问题上实现指数级加速。" },
    
    // 更多历史类
    { title: "汉朝的丝绸之路起点：长安", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "古代最繁华的国际都市。 #汉朝 #长安 #历史", knowledgePoint: "长安是汉朝首都，丝绸之路的起点，是当时世界上最大的城市之一。" },
    { title: "成吉思汗的蒙古帝国：横跨欧亚", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "历史上最大的陆地帝国。 #蒙古 #成吉思汗 #历史", knowledgePoint: "蒙古帝国在13世纪建立了横跨欧亚的庞大帝国，促进了东西方文化交流。" },
    { title: "工业革命：改变世界的100年", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "从手工到机器的转变。 #工业革命 #历史 #科技", knowledgePoint: "工业革命从18世纪开始，蒸汽机的发明改变了生产方式，推动了现代化进程。" },
    { title: "古希腊哲学：西方思想的源头", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "苏格拉底、柏拉图、亚里士多德。 #古希腊 #哲学 #历史", knowledgePoint: "古希腊哲学奠定了西方哲学的基础，影响了后世两千多年的思想发展。" },
    { title: "玛雅文明：消失的古代智慧", userId: "history_detective", author: "历史侦探", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka", color: "bg-amber-900", description: "精确的历法和建筑奇迹。 #玛雅 #文明 #历史", knowledgePoint: "玛雅文明在天文、数学和建筑方面达到很高水平，但突然衰落至今仍是谜。" },
    
    // 更多编程类
    { title: "Docker容器化：一次构建，到处运行", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "为什么Docker改变了部署方式？ #Docker #容器 #开发", knowledgePoint: "Docker将应用和依赖打包成容器，确保在不同环境中一致运行。" },
    { title: "RESTful API设计：Web服务的标准", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "如何设计优雅的API接口？ #API #REST #后端", knowledgePoint: "RESTful API使用HTTP方法（GET、POST、PUT、DELETE）操作资源，是Web服务的主流设计风格。" },
    { title: "数据库索引：为什么查询这么快？", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "理解数据库性能优化的关键。 #数据库 #索引 #优化", knowledgePoint: "索引是数据库的目录，可以快速定位数据，大幅提升查询速度。" },
    { title: "WebSocket：实时通信的协议", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "如何实现实时聊天功能？ #WebSocket #实时通信 #网络", knowledgePoint: "WebSocket提供全双工通信，服务器可以主动推送数据，适合实时应用。" },
    { title: "GraphQL：更灵活的API查询语言", userId: "code_master", author: "CodeMaster", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code", color: "bg-slate-800", description: "为什么Facebook创造了GraphQL？ #GraphQL #API #查询", knowledgePoint: "GraphQL允许客户端精确指定需要的数据，减少过度获取，提高效率。" },
    
    // 更多艺术类
    { title: "巴洛克艺术：华丽与动感", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "17世纪欧洲的艺术风格。 #巴洛克 #艺术 #历史", knowledgePoint: "巴洛克艺术强调动感、戏剧性和装饰性，代表作品有贝尼尼的雕塑。" },
    { title: "立体主义：毕加索的革命", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "如何从多个角度描绘物体？ #立体主义 #毕加索 #艺术", knowledgePoint: "立体主义将物体分解为几何形状，从多个视角同时展现，打破了传统透视法。" },
    { title: "日本浮世绘：影响印象派的东方艺术", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "葛饰北斋的《神奈川冲浪里》。 #浮世绘 #日本 #艺术", knowledgePoint: "浮世绘是日本江户时代的版画艺术，其平面化和色彩运用影响了印象派画家。" },
    { title: "包豪斯：现代设计的起源", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "形式追随功能的设计理念。 #包豪斯 #设计 #现代", knowledgePoint: "包豪斯学校强调功能性和简洁性，奠定了现代设计的基础。" },
    { title: "街头艺术：从涂鸦到画廊", userId: "art_micro", author: "艺术微课堂", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Art", color: "bg-blue-900", description: "班克斯如何改变艺术界？ #街头艺术 #涂鸦 #现代", knowledgePoint: "街头艺术从地下走向主流，挑战了传统艺术的定义和展示方式。" },
    
    // 更多AI类
    { title: "扩散模型：AI绘画的技术原理", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "Stable Diffusion如何生成图像？ #扩散模型 #AI绘画 #生成", knowledgePoint: "扩散模型通过逐步去噪生成图像，是目前最先进的图像生成技术。" },
    { title: "多模态AI：同时理解文字和图像", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "GPT-4V如何看懂图片？ #多模态 #AI #视觉", knowledgePoint: "多模态AI可以同时处理文本、图像、音频等多种输入，实现更智能的理解。" },
    { title: "Few-shot学习：用少量样本训练AI", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "如何让AI快速适应新任务？ #Few-shot #学习 #AI", knowledgePoint: "Few-shot学习让AI用少量样本就能学习新任务，提高了模型的泛化能力。" },
    { title: "AI对齐问题：如何让AI符合人类价值观", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "AI安全的重要挑战。 #AI安全 #对齐 #伦理", knowledgePoint: "AI对齐是确保AI系统目标与人类价值观一致，是AI安全的核心问题。" },
    { title: "边缘AI：让设备更智能", userId: "ai_daily", author: "AI前沿日报", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe", color: "bg-purple-900", description: "在手机上运行大模型。 #边缘计算 #AI #移动", knowledgePoint: "边缘AI将模型部署到设备端，减少延迟和隐私风险，但需要模型压缩和优化。" },
  ];

  // 添加扩展模板
  extendedTemplates.forEach((template) => {
    const likes = [
      `${(Math.random() * 20 + 1).toFixed(1)}w`,
      `${Math.floor(Math.random() * 5000 + 100)}`,
      `${(Math.random() * 10 + 0.5).toFixed(1)}w`,
    ];
    const comments = [
      `${Math.floor(Math.random() * 5000 + 100)}`,
      `${(Math.random() * 5 + 0.5).toFixed(1)}w`,
      `${Math.floor(Math.random() * 2000 + 50)}`,
    ];
    
    const videoId = currentId++;
    allVideos.push({
      id: videoId,
      title: template.title,
      userId: template.userId,
      author: template.author,
      authorAvatar: template.authorAvatar,
      likes: likes[Math.floor(Math.random() * likes.length)],
      comments: comments[Math.floor(Math.random() * comments.length)],
      description: template.description,
      color: template.color,
      coverUrl: getCoverImageUrl(videoId),
      knowledgePoint: template.knowledgePoint,
      quiz: Math.random() > 0.7 ? {
        question: "这是一个测试问题？",
        options: ["选项A", "选项B", "选项C"],
        answer: Math.floor(Math.random() * 3),
      } : null,
    });
  });

  return allVideos;
};

export const ALL_VIDEOS: Video[] = generateVideos();

export const HOME_VIDEOS: Video[] = [...ALL_VIDEOS, ...ALL_VIDEOS, ...ALL_VIDEOS];

// 热门页面使用的热搜词条与视频列表
export const HOT_SEARCH_TERMS: string[] = [
  "AI大模型",
  "编程面试",
  "量子纠缠",
  "黑神话悟空",
  "摄影构图",
  "4K壁纸",
  "我的世界建筑",
  "硬核科普",
  "英语口语",
  "职场进阶",
  "运动健身",
  "音乐治愈",
];

export const HOT_VIDEOS: Video[] = HOME_VIDEOS.slice(0, 72);

export const USER_PROFILE: UserProfile = {
  name: "好奇心日报",
  id: "curious_daily",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoey",
  following: 128,
  followers: "35.2w",
  likes: "120w",
  bio: "分享有趣的冷知识，让学习像呼吸一样简单。 🎓 认证科普作者",
  badges: ["金牌讲师", "百大UP", "勤更标兵"],
  likedList: [
    "量子纠缠的鬼魅困惑",
    "宋朝夜市的繁华密码",
    "零基础 Python 爬虫实战",
    "梵高色彩背后的故事",
  ],
  favoriteList: [
    "深度学习中的注意力机制",
    "用 JS 实现简易神经网络",
    "在家制造云的物理实验",
  ],
  historyList: [
    "秦始皇陵的未解之谜",
    "科普短视频拍摄幕后",
    "AI 前沿日报：大模型观察",
  ],
};

