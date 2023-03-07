import { createRouter, createWebHistory } from 'vue-router';
import Layout from './Layout.vue'
import Home from './Home.vue';
import Button from './Button.vue';

const routeConfig = [{
    path: 'button',
    name: 'button',
    title: '按钮',
    component: Button
}];

const Router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/components',
        name: 'components',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            ...routeConfig
        ]
    }]
});

export { routeConfig };

export default Router;