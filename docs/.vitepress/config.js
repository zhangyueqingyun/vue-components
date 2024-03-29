export default {
    title: 'vue-components',
    description: '一个简单易用的 vue 组件库',
    dest: './dist',
    head: [
        ['link', { rel: 'icon', href: 'https://zblog-images.oss-cn-hangzhou.aliyuncs.com/avatar.jpeg'}]
    ],
    themeConfig: {
        logo: 'https://zblog-images.oss-cn-hangzhou.aliyuncs.com/avatar.jpeg',
        sidebar: {
            '/': [
                {
                    text: '基本组件',
                    children: [{
                        text: '井深结构图',
                        link: '/components/well-contruct/'
                    }]
                }
            ], 
        },
    }
}