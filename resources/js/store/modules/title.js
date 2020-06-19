const state = {
    title: 'Welcome'
};

const getters = {
    pageTitle: state => state.title
};

const mutations = {
    setTitle(state, title) {
        state.title = title + ' | Facebook';

        document.title = state.title;
    }
};

const actions = {
    setPageTitle({commit, state}, title) {
        commit('setTitle', title);
    }
};

export default {
    state, getters, mutations, actions
}
