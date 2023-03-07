import { createRouter, createWebHistory } from 'vue-router';
import Layout from './Layout.vue'
import Home from './Home.vue';
import WellContruct from './well-contruct/well-contruct.vue'

const routeConfig = [{
    path: 'well-contruct',
    name: 'well-contruct',
    title: '井深结构图',
    component: WellContruct
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