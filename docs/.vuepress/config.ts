import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'erichui',
  description: '',
  theme: defaultTheme({
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '播客',
        link: '/gc/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/erichui',
      },
    ],
  }),
})