/**
 * 配置文件的入口文件，也可以是 YML 或 toml
 */
import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  base: '/docs/',
  title: 'erichui',
  description: '是我的第一个 VuePress 站点',
  theme: defaultTheme({
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '博客',
        link: '/gc/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/erichui',
      },
    ],
    sidebar: {
      '/frontend/': [
        {
          text: 'JavaScript',
          children: [
            '/frontend/javascript/basic.md',
          ],
        },
        {
          text: 'TypeScript',
          children: [
            '/frontend/typescript/normal-issue.md',
          ],
        },
        {
          text: 'Vue',
          children: [
            '/frontend/vue/placeholder.md',
          ],
        },
        {
          text: 'React',
          children: [
            '/frontend/react/placeholder.md',
          ],
        },
        {
          text: '浏览器相关',
          children: [
            '/frontend/browser/gc/',
          ],
        },
      ],
    },
  }),
})