export type Project = {
  name: string
  description: string
  tags: string[]
  url?: string
  repo?: string
  status: 'live' | 'wip' | 'archived'
}

export const projects: Project[] = [
  {
    name: 'ai-inpaint-tool',
    description: 'AI 图像修复工具，基于 inpainting 技术',
    tags: ['AI', 'Image'],
    url: 'https://ai-inpaint-tool-production.up.railway.app',
    status: 'live',
  },
  {
    name: 'xhs-discovery-lab',
    description: '小红书内容发现与分析实验室',
    tags: ['AI', 'Scraping'],
    url: 'https://xhs-discovery-lab-web.vercel.app',
    status: 'live',
  },
  {
    name: 'url-inbox-mvp',
    description: 'URL 收件箱 MVP，保存和整理链接',
    tags: ['Productivity'],
    url: 'https://url-inbox-mvp-production.up.railway.app',
    status: 'live',
  },
  {
    name: 'gg-agent',
    description: '自动化 agent 工具',
    tags: ['AI', 'Agent'],
    url: 'https://gg-agent-production.up.railway.app',
    status: 'live',
  },
  {
    name: 'codex-runtime-board',
    description: 'Codex 运行时监控面板',
    tags: ['AI', 'Dashboard'],
    url: 'https://codex-runtime-board-production.up.railway.app',
    status: 'live',
  },
  {
    name: 'banana-image-genn',
    description: '图片生成工具',
    tags: ['AI', 'Image'],
    url: 'https://banana-image-genn-production.up.railway.app',
    status: 'live',
  },
  {
    name: 'openclaw-installer',
    description: 'Openclaw 安装器',
    tags: ['CLI', 'Tool'],
    url: 'https://openclaw-installer-76p.pages.dev',
    status: 'live',
  },
  {
    name: 'agent-config-cli',
    description: 'Agent 配置命令行工具',
    tags: ['CLI', 'Agent'],
    repo: 'https://github.com/GreenBeanLiu/agent-config-cli',
    status: 'wip',
  },
  {
    name: 'pi-harness-agent',
    description: 'Raspberry Pi 自动化 harness agent',
    tags: ['IoT', 'Agent'],
    url: 'https://pi-harness-agent-production.up.railway.app',
    status: 'live',
  },
  {
    name: 'r2-image-sync',
    description: 'Cloudflare R2 文件同步工具',
    tags: ['CLI', 'Storage'],
    repo: 'https://github.com/GreenBeanLiu/r2-image-sync',
    status: 'wip',
  },
  {
    name: 'threejs-demo',
    description: 'Three.js 学习项目',
    tags: ['3D', 'Frontend'],
    url: 'https://threejs-demo-production.up.railway.app',
    status: 'live',
  },
  {
    name: 'legal-docs-lab',
    description: '法律文档处理实验室',
    tags: ['AI', 'Docs'],
    status: 'wip',
  },
  {
    name: 'claude-api-test',
    description: 'Claude API 测试与实验',
    tags: ['AI', 'API'],
    url: 'https://claude-api-test-production.up.railway.app',
    status: 'live',
  },
  {
    name: 'docs-archive',
    description: '文档归档',
    tags: ['Docs'],
    status: 'archived',
  },
]
