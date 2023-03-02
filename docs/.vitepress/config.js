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
                        text: '示例组件',
                        link: '/components/demo/'
                    },{
                        text: '按钮',
                        link: '/components/button/'
                    }]
                }
            ], 
        },
    }
}