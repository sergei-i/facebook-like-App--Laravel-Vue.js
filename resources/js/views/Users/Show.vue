<template>
    <div class="flex flex-col items-center" v-if="status.user === 'success' && user">
        <div class="relative mb-8">
            <div class="w-100 h-64 overflow-hidden z-10">
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg"
                     alt="user background image"
                     class="object-cover w-full"
                >
            </div>

            <div class="absolute flex items-center bottom-0 left-0 -mb-8 ml-12 z-20">
                <div class="w-32">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png"
                        alt="user profile image"
                        class="object-cover w-32 h-32 border-4 border-gray-200 rounded-full shadow-lg"
                    >
                </div>

                <p class="ml-4 text-2xl text-gray-100">{{ user.data.attributes.name }}</p>
            </div>

            <div class="absolute flex items-center bottom-0 right-0 mb-4 mr-12 z-20">
                <button
                    v-if="friendButtonText && friendButtonText !== 'Accept'"
                    class="py-1 px-3 bg-gray-400 rounded"
                    @click.prevent="$store.dispatch('sendFriendRequest', $route.params.userId)"
                >
                    {{ friendButtonText }}
                </button>

                <button
                    v-if="friendButtonText && friendButtonText === 'Accept'"
                    class="py-1 px-3 mr-2 bg-gray-500 rounded"
                    @click.prevent="$store.dispatch('acceptFriendRequest', $route.params.userId)"
                >
                    Accept
                </button>

                <button
                    v-if="friendButtonText && friendButtonText === 'Accept'"
                    class="py-1 px-3 bg-gray-400 rounded"
                    @click.prevent="$store.dispatch('ignoreFriendRequest', $route.params.userId)"
                >
                    Ignore
                </button>
            </div>
        </div>

        <div v-if="status.posts === 'loading'">Loading posts...</div>

        <div v-else-if="posts.data.length < 1">No posts found. Get started!</div>

        <post v-else v-for="(post, postKey) in posts.data" :post="post" :key="postKey"
        ></post>
    </div>
</template>

<script>
    import Post from '../../components/Post';
    import {mapGetters} from 'vuex';

    export default {
        name: 'Show',
        components: {
            Post
        },
        mounted() {
            this.$store.dispatch('fetchUser', this.$route.params.userId);
            this.$store.dispatch('fetchUserPosts', this.$route.params.userId);
        },
        computed: {
            ...mapGetters({
                user: 'user',
                posts: 'posts',
                status: 'status',
                friendButtonText: 'friendButtonText'
            })
        }
    }
</script>
