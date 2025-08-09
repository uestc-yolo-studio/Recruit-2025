import { defineUserConfig } from 'vuepress'

import theme from './theme.js'

export default defineUserConfig({
    base: '/',

    lang: 'zh-CN',
    title: 'YOLO Recruit',
    description: 'YOLO 工作室 2025 招新',

    theme,

    // 和 PWA 一起启用
    // shouldPrefetch: false,
})
