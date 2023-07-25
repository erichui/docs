import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  base: '/docs/',
  title: 'erichui',
  description: '',
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
  }),
})