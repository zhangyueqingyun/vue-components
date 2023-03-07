export default {
    title: 'vue-components',
    description: '一个简单易用的 vue 组件库',
    dest: './dist',
    themeConfig: {
        sidebar: {
            '/': [
                {
                    text: '基本组件',
                    children: [{
                        text: '井结构图',
                        link: '/components/well-contruct/'
                    }]
                }
            ], 
        },
    }
}