<template>
    <div class="flex flex-col items-center py-4">

        <new-post></new-post>

        <p v-if="newsStatus === 'loading'">Loading posts...</p>

        <post v-else v-for="(post, postKey) in posts.data" :post="post" :key="postKey"></post>

    </div>
</template>

<script>
    import NewPost from '../components/NewPost';
    import Post from '../components/Post';
    import {mapGetters} from 'vuex';

    export default {
        name: 'NewsFeed',
        components: {
            NewPost,
            Post
        },
        mounted() {
            this.$store.dispatch('fetchNewsPosts');
        },
        computed: {
            ...mapGetters({
                posts: 'posts',
                newsStatus: 'newsStatus',
            })
        }
    }
</script>
