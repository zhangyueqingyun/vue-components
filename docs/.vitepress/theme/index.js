import defaultTheme from 'vitepress/theme';

export default {
    ...defaultTheme,
    enhanceApp({app}) {
        import('../../../lib/vue-components.esm').then(function(m){
            app.use(m.default);
        })
        import('../../../lib/style.css')
    }
}