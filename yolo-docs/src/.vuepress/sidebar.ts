import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
    '/': [

    ],
    '/recruit': [
        {
            text: '前端',
            prefix: '/recruit/',
            link: '/recruit/2025/frontend/',
        },
        {
            text: '后端',
            link: '/recruit/2025/backend/',
        },
        {
            text: 'Go',
            link: '/recruit/2025/go/',
        },
        {
            text: '设计',
            link: '/recruit/2025/design/',
        },
        {
            text: '机器学习',
            link: '/recruit/2025/machine-learning/',
        }
    ],

})
