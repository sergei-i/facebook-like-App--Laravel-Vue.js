<template>
    <div class="flex flex-col items-center">
        <div class="relative mb-8">
            <div class="w-100 h-64 overflow-hidden z-10">
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg"
                     alt="user background image"
                     class="object-cover w-full"
                >
            </div>

            <div class="absolute flex items-center bottom-0 left-0 -mb-8 ml-12 z-20">
                <div class="w-32">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png"
                         alt="user profile image"
                         class="object-cover w-32 h-32 border-4 border-gray-200 rounded-full shadow-lg"
                    >
                </div>

                <p class="ml-4 text-2xl text-gray-100">{{ user.data.attributes.name }}</p>
            </div>
        </div>

        <p v-if="postLoading">Loading posts...</p>

        <post v-else v-for="post in posts.data" :post="post" :key="post.data.post_id"></post>

        <p v-if="!postLoading && posts.data.length < 1">No posts found. Get started!</p>
    </div>
</template>

<script>
    import Post from '../../components/Post';

    export default {
        name: 'Show',
        components: {
          Post
        },
        data() {
            return {
                user: null,
                posts: [],
                userLoading: true,
                postLoading: true
            }
        },
        mounted() {
            axios.get('/api/users/' + this.$route.params.userId)
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    console.log('Unable to fetch the user from the server.');
                })
                .finally(() => {
                    this.userLoading = false;
                })

            axios.get('/api/users/' + this.$route.params.userId + '/posts')
                .then(response => {
                    this.posts = response.data;
                })
                .catch(error => {
                    console.log('Unable to fetch');
                })
                .finally(() => {
                    this.postLoading = false;
                })
        }
    }
</script>
