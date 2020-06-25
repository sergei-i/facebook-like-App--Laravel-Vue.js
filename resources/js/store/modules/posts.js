const state = {
    posts: [],
    postsStatus: '',
    postMessage: ''
}

const getters = {
    posts: state => state.posts,
    newsStatus: state => state.postsStatus,
    postMessage: state => state.postMessage
}

const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    setPostsStatus(state, status) {
        state.postsStatus = status;
    },
    updateMessage(state, message) {
        state.postMessage = message;
    },
    pushPost(state, post) {
        state.posts.data.unshift(post);
    },
    pushLikes(state, {likes, postKey}) {
        state.posts.data[postKey].data.attributes.likes = likes;
    },
    pushComments(state, {comments, postKey}) {
        state.posts.data[postKey].data.attributes.comments = comments;
    }
}

const actions = {
    fetchNewsPosts({commit, state}) {
        commit('setPostsStatus', 'loading');

        axios.get('/api/posts')
            .then(response => {
                commit('setPosts', response.data);
                commit('setPostsStatus', 'success');
            })
            .catch(error => {
                commit('setPostsStatus', 'error');
            })
    },
    fetchUserPosts({commit, dispatch}, userId) {
        commit('setPostsStatus', 'loading');

        axios.get('/api/users/' + userId + '/posts')
            .then(response => {
                commit('setPosts', response.data);
                commit('setPostsStatus', 'success');
            })
            .catch(error => {
                commit('setPostsStatus', 'error');
            })
    },
    postMessage({commit, getters}) {
        axios.post('/api/posts', {body: getters.postMessage})
            .then(response => {
                commit('pushPost', response.data);
                commit('updateMessage', '');
            })
            .catch(error => {
            })
    },
    likePost({commit}, {postId, postKey}) {
        axios.post('/api/posts/' + postId + '/like')
            .then(response => {
                commit('pushLikes', {likes: response.data, postKey});
            })
            .catch(error => {
            })

    },
    commentPost({commit}, {body, postId, postKey}) {
        axios.post('/api/posts/' + postId + '/comment', {body})
            .then(response => {
                commit('pushComments', {comments: response.data, postKey});
            })
            .catch(error => {
            })

    }
}

export default {
    state, getters, mutations, actions
}
