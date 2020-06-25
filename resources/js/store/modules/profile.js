const state = {
    user: null,
    userStatus: '',
}

const getters = {
    user: state => state.user,

    status: state => {
        return {
            user: state.userStatus,
            posts: state.postsStatus
        }
    },

    friendship: state => state.user.data.attributes.friendship,

    friendButtonText: (state, getters, rootState) => {
        if (rootState.User.user.data.user_id === state.user.data.user_id) {
            return '';
        } else if (getters.friendship === null) {
            return 'Add Friend';
        } else if (getters.friendship.data.attributes.confirmed_at === null
            && getters.friendship.data.attributes.friend_id !== rootState.User.user.data.user_id
        ) {
            return 'Pending Friend Request';
        } else if (getters.friendship.data.attributes.confirmed_at !== null) {
            return '';
        }

        return 'Accept';
    },
}

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setUserFriendship(state, friendship) {
        state.user.data.attributes.friendship = friendship;
    },
    setUserStatus(state, status) {
        state.userStatus = status;
    },
}

const actions = {
    fetchUser({commit, dispatch}, userId) {
        commit('setUserStatus', 'loading');

        axios.get('/api/users/' + userId)
            .then(response => {
                commit('setUser', response.data);
                commit('setUserStatus', 'success');
            })
            .catch(error => {
                commit('setUserStatus', 'error');
            });
    },
    sendFriendRequest({commit, getters}, friendId) {
        if (getters.friendButtonText !== 'Add Friend') {
            return;
        }

        axios.post('/api/friend-request', {'friend_id': friendId})
            .then(response => {
                commit('setUserFriendship', response.data);
            })
            .catch(error => {
            });
    },
    acceptFriendRequest({commit, state}, userId) {
        axios.post('/api/friend-request-response', {'user_id': userId, 'status': 1})
            .then(response => {
                commit('setUserFriendship', response.data);
            })
            .catch(error => {
            });
    },
    ignoreFriendRequest({commit, state}, userId) {
        axios.delete('/api/friend-request-response/delete', {data: {'user_id': userId}})
            .then(response => {
                commit('setUserFriendship', null);
            })
            .catch(error => {
            });
    },
}

export default {
    state, getters, mutations, actions
}
