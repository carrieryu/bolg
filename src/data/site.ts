export const site = {
  name: 'YLD 的小屋',
  tagline: '记录学习、代码与生活的小角落',
  author: 'YLD',
  bio: '一名喜欢折腾前端和 AI 的创作者。这里分享技术笔记、项目复盘，以及日常里那些温柔有趣的想法。',
  email: 'hello@example.com',
  social: [
    { label: 'GitHub', url: 'https://github.com/carrieryu', icon: '☁' },
    { label: 'Gitee', url: 'https://gitee.com', icon: '♡' },
    { label: 'Email', url: 'mailto:hello@example.com', icon: '✉' },
  ],
} as const

export const navLinks = [
  { id: 'hero', label: '首页' },
  { id: 'articles', label: '文章' },
  { id: 'projects', label: '项目' },
  { id: 'about', label: '关于' },
] as const

export const articles = [
  {
    id: 'sse-vs-ws',
    title: '为什么推送大多用 SSE 而不是 WebSocket',
    summary: '从单向推送、连接成本与浏览器兼容性角度，聊聊 SSE 的适用场景。',
    date: '2026-03-15',
    tags: ['网络', 'AI'],
    readMin: 6,
  },
  {
    id: 'agent-basics',
    title: 'AI Agent 基础认知笔记',
    summary: '工具调用、记忆、规划——Agent 架构的第一性原理梳理。',
    date: '2026-04-02',
    tags: ['AI', 'Agent'],
    readMin: 10,
  },
  {
    id: 'vite-pages',
    title: 'Vite 静态站部署到 GitHub Pages 踩坑记',
    summary: 'base 路径、404 回退、SPA 路由——一次搞定静态部署。',
    date: '2026-05-20',
    tags: ['前端', 'DevOps'],
    readMin: 5,
  },
] as const

export const projects = [
  {
    id: 'learning-warehouse',
    title: 'Learning Warehouse',
    description: '个人知识仓库与学习笔记集合，涵盖 AI、前端与工程实践。',
    tech: ['Markdown', 'Git'],
    url: '#',
  },
  {
    id: 'html-extractor',
    title: 'HTML Content Extractor',
    description: '从复杂 HTML 页面提取正文内容的本地工具。',
    tech: ['Python', 'BeautifulSoup'],
    url: '#',
  },
  {
    id: 'cute-blog',
    title: 'YLD 的小屋',
    description: '就是你现在看到的这个站点——可爱清新的交互个人博客。',
    tech: ['React', 'Vite', 'Canvas'],
    url: '#',
  },
] as const

export const guideTips = {
  gate: '敲敲门吧，我在里面等你哦～',
  hero: '欢迎光临！我是小向导，有问题随时点我呀。',
  articles: '这些是最近写的文章，值得一读哦。',
  projects: '这边是项目小角落，每个都是一次尝试。',
  about: '想更了解主人？往下看～',
  default: '继续逛逛吧，后面还有惊喜！',
} as const

export type SectionId = keyof typeof guideTips
