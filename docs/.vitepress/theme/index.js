import '../../../lib/style.css'
import defaultTheme from 'vitepress/theme';
import { Divider } from 'ant-design-vue';
import "ant-design-vue/dist/antd.css"; 

export default {
    ...defaultTheme,
    enhanceApp({app}) {
        import('../../../lib/vue-components.esm').then(function(m){
            app.use(m.default);
        })
        app.use(Divider);
        // import('../../../lib/style.css')
    }
}