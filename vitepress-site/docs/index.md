---
layout: home

hero:
  name: 技术文档中心
  text: 由 Vite 和 Vue 驱动的静态站点生成器
  tagline: 只需 Markdown 即可轻松创建美观的文档站点
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/linux-commands
    - theme: alt
      text: GitHub
      link: https://github.com/faith-love

features:
  - icon: 📝
    title: 专注内容
    details: 只需 Markdown 即可轻松创建美观的文档站点。专注于内容创作，让文档更加优雅。
  - icon: ⚡
    title: 极速体验
    details: 服务器即时启动，闪电般的热更新，基于 Vite 生态。享受前所未有的开发体验。
  - icon: 🧩
    title: Vue 自定义
    details: 支持 Vue 语法和组件，轻松扩展页面功能。打造独特的文档站点。
  - icon: 🚀
    title: 快速部署
    details: 一键构建静态站点，轻松部署到任意平台。让文档快速上线。
  - icon: 🔍
    title: 全文搜索
    details: 内置全文搜索功能，快速定位所需内容。提升文档使用体验。
  - icon: 📱
    title: 响应式设计
    details: 完美适配各种设备，从手机到桌面端都能获得最佳阅读体验。

---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #bd34fe 30%, #41d1ff 70%);
  --vp-home-hero-image-background-image: linear-gradient(120deg, #41d1ff 40%, #bd34fe 100%);
  --vp-home-hero-image-filter: blur(32px) opacity(0.18);
}

.VPHome .VPHero {
  min-height: 60vh;
  padding: 2rem 0 1rem 0 !important;
  margin: 0 !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.VPHome .VPHero .container {
  padding: 0 2rem !important;
  max-width: 900px !important;
}

.VPHome .VPHero .name {
  font-size: 2.5rem !important;
  font-weight: 800;
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.VPHome .VPHero .text {
  font-size: 2rem !important;
  font-weight: 700;
  margin-bottom: 0.5rem !important;
  color: #222;
}

.VPHome .VPHero .tagline {
  font-size: 1.1rem !important;
  color: #666;
  margin-bottom: 1.5rem !important;
}

.VPHome .VPHero .actions {
  margin-top: 1.5rem !important;
  display: flex;
  gap: 1rem;
}

.VPHome .VPHero .actions .VPButton {
  font-size: 1rem !important;
  padding: 0.6rem 1.5rem !important;
  border-radius: 6px !important;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
  border: none;
  transition: background 0.2s, color 0.2s;
}

.VPHome .VPHero .actions .VPButton.alt {
  background: #fff !important;
  color: #3eaf7c !important;
  border: 1px solid #3eaf7c !important;
}

.VPHome .VPHero .actions .VPButton.alt:hover {
  background: #3eaf7c !important;
  color: #fff !important;
}

.VPHome .VPHero .image {
  margin-left: 2rem;
  max-width: 220px;
  max-height: 220px;
  border-radius: 50%;
  box-shadow: 0 4px 32px rgba(64, 209, 255, 0.18);
  background: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  display: flex;
  align-items: center;
  justify-content: center;
}

.VPHome .VPFeatures {
  padding: 2.5rem 0 2rem 0 !important;
  background: var(--vp-c-bg-soft) !important;
}

.VPHome .VPFeatures .container {
  max-width: 1100px !important;
  margin: 0 auto !important;
  padding: 0 16px !important;
}

.VPHome .VPFeatures .item {
  background: var(--vp-c-bg) !important;
  border-radius: 10px !important;
  padding: 1.5rem !important;
  margin: 0.5rem 0.5rem 1.5rem 0.5rem !important;
  box-shadow: 0 2px 8px rgba(60,60,60,0.04);
  transition: transform 0.2s;
}

.VPHome .VPFeatures .item:hover {
  transform: translateY(-4px) scale(1.03);
}

.VPHome .VPFeatures .icon {
  font-size: 2rem !important;
  margin-bottom: 0.5rem !important;
}

.VPHome .VPFeatures .title {
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  margin-bottom: 0.3rem !important;
}

.VPHome .VPFeatures .details {
  font-size: 0.98rem !important;
  color: #555 !important;
}

@media (max-width: 900px) {
  .VPHome .VPHero {
    flex-direction: column;
    align-items: flex-start;
    min-height: 40vh;
  }
  .VPHome .VPHero .image {
    margin: 1.5rem 0 0 0;
    max-width: 160px;
    max-height: 160px;
  }
  .VPHome .VPHero .container {
    padding: 0 1rem !important;
  }
}
@media (max-width: 600px) {
  .VPHome .VPHero .name {
    font-size: 1.5rem !important;
  }
  .VPHome .VPHero .text {
    font-size: 1.1rem !important;
  }
  .VPHome .VPHero .tagline {
    font-size: 0.95rem !important;
  }
  .VPHome .VPFeatures .item {
    padding: 1rem !important;
  }
}
</style>

# 技术文档中心

欢迎来到技术文档中心！这里收集了各种技术文档和指南，帮助您更好地理解和应用技术知识。

## 快速导航

### 指南
- [Linux命令指南](/guide/linux-commands)
- [MySQL命令指南](/guide/mysql-commands)
- [数据库对比指南](/guide/database-comparison)

### 文档
- [Linux部署指南](/docs/linux-deployment-guide)
- [Nginx配置指南](/docs/nginx-guide)
- [CI/CD技术指南](/docs/ci-cd-guide)
- [数据库连接指南](/docs/database-connection-guide)

## 关于本站

本站使用 [VitePress](https://vitepress.dev/) 构建，提供了清晰的技术文档结构和良好的阅读体验。

## 贡献指南

如果您发现文档中的错误或有改进建议，欢迎提交 Issue 或 Pull Request。

## 联系方式

如有任何问题，请通过以下方式联系我们：

- GitHub: [enguang](https://github.com/faith-love)
- Email: 2091359848@qq.com 