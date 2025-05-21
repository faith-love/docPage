export default {
  title: "技术文档中心",
  base: '/docPage/',
  description: "由 Vite 和 Vue 驱动的静态站点生成器",
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '文档', link: '/docs/' },
      {
        text: '更多',
        items: [
          { text: 'Linux命令', link: '/guide/linux-commands' },
          { text: 'MySQL命令', link: '/guide/mysql-commands' },
          { text: '数据库对比', link: '/guide/database-comparison' },
          { text: 'Linux部署', link: '/docs/linux-deployment-guide' },
          { text: 'Nginx配置', link: '/docs/nginx-guide' },
          { text: 'CI/CD实践', link: '/docs/ci-cd-guide' }
        ]
      }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "Linux命令", link: "/guide/linux-commands" },
            { text: "MySQL命令", link: "/guide/mysql-commands" },
            { text: "数据库对比", link: "/guide/database-comparison" }
          ]
        }
      ],
      "/docs/": [
        {
          text: "文档",
          items: [
            { text: "Linux部署指南", link: "/docs/linux-deployment-guide" },
            { text: "Nginx配置指南", link: "/docs/nginx-guide" },
            { text: "CI/CD技术指南", link: "/docs/ci-cd-guide" },
            { text: "数据库连接指南", link: "/docs/database-connection-guide" }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/faith-love' }
    ],
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024-present'
    },
    editLink: {
      pattern: 'https://github.com/faith-love/docs/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    outline: {
      level: [2, 3],
      label: '目录'
    },
    returnToTopLabel: '返回顶部',
    mobileMenu: {
      text: '菜单',
      items: [
        { text: '首页', link: '/' },
        { text: '指南', link: '/guide/' },
        { text: '文档', link: '/docs/' }
      ]
    }
  },
  appearance: true,
  lastUpdated: true,
  ignoreDeadLinks: true
} 