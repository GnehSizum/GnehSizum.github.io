import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import redirects from './redirects.json';

export default {
  title: 'Mu Blog',
  tagline: 'One today is worth two tomorrows.',
  url: 'https://gnehsizum.github.io',
  baseUrl: '/',
  trailingSlash: true,
  favicon: 'images/head.jpg',
  onBrokenLinks: 'throw',
  onDuplicateRoutes: 'throw',
  markdown: {format: 'detect', hooks: {onBrokenMarkdownLinks: 'throw'}},
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {label: '中文', htmlLang: 'zh-CN'},
      en: {label: 'English', htmlLang: 'en'},
    },
  },
  presets: [['classic', {
    docs: {
      routeBasePath: 'note',
      sidebarPath: './sidebars.js',
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, {strict: false}]],
    },
    blog: {
      blogTitle: '博客',
      blogDescription: '日常记录与技术实践',
      blogSidebarTitle: '全部文章',
      blogSidebarCount: 'ALL',
      showReadingTime: true,
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, {strict: false}]],
    },
    theme: {customCss: './src/css/custom.css'},
  }]],
  plugins: [['@docusaurus/plugin-client-redirects', {redirects}]],
  themeConfig: {
    image: 'images/head.jpg',
    navbar: {
      title: 'Mu Blog',
      logo: {alt: 'GnehSizum', src: 'images/head.jpg'},
      items: [
        {to: '/', label: '首页', position: 'left', activeBaseRegex: '^/(en/)?$'},
        {to: '/blog', label: '博客', position: 'left'},
        {to: '/note', label: '笔记', position: 'left'},
        {to: '/about', label: '关于', position: 'left'},
      ],
    },
    colorMode: {respectPrefersColorScheme: true},
    footer: {style: 'dark', copyright: `Copyright © ${new Date().getFullYear()} GnehSizum. All rights reserved.<br />Built with <a class="footer__link" href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a> · Hosted on <a class="footer__link" href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages</a> · Images stored on <a class="footer__link" href="https://www.aliyun.com/product/oss" target="_blank" rel="noopener noreferrer">Alibaba Cloud OSS</a>`},
    prism: {additionalLanguages: ['bash', 'cpp', 'cmake', 'python']},
    tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 4},
  },
};
