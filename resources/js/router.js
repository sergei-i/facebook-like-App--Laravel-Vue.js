import Vue from 'vue';
import VueRouter from 'vue-router';
import NewsFeed from './views/NewsFeed';
import UserShow from './views/Users/Show';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: NewsFeed,
        name: 'home',
        meta: {title: 'News Feed'}
    },
    {
        path: '/users/:userId',
        component: UserShow,
        name: 'user.show',
        meta: {title: 'Profile'}
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
