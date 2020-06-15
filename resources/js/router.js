import Vue from 'vue';
import VueRouter from 'vue-router';
import Start from './views/Start';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Start,
        name: 'home'
    },
    // {
    //     path: '/404',
    //     name: '404',
    //     component: NotFound,
    // },
    // {
    //     path: '*',
    //     redirect: '/404'
    // }
]

export default new VueRouter({
    mode: 'history',
    routes
});
