import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user';
import Posts from './modules/posts';
import Title from './modules/title';
import Profile from './modules/profile';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User,
        Posts,
        Title,
        Profile
    }
})
