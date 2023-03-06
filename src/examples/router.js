import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import Button from './Button.vue';

const Router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/button',
        name: 'button',
        component: Button
    }
]});

export default Router;