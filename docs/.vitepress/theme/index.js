import defaultTheme from 'vitepress/theme';

export default {
    ...defaultTheme,
    enhanceApp({app}) {
        import('../../../lib/y-components.esm').then(function(m){
            app.use(m.default);
        })
    }
}