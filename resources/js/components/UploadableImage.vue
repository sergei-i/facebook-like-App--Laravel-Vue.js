<template>
    <div>
        <img :src="'/storage/' + userImage.data.attributes.path"
             :alt="alt"
             :class="classes"
             ref="userImage"
             :style="{cursor: pointer ? 'pointer' : ''}"
        >
    </div>
</template>

<script>
    import Dropzone from 'dropzone';
    import {mapGetters} from 'vuex';

    export default {
        name: 'UploadableImage',
        props: {
            'imageWidth': String,
            'imageHeight': String,
            'imageLocation': String,
            'userImage': Object,
            'classes': String,
            'alt': String
        },
        data() {
            return {
                dropzone: null,
                pointer: false
            }
        },
        computed: {
            ...mapGetters({
                authUser: 'authUser'
            }),
            settings() {
                return {
                    paramName: 'image',
                    url: '/api/user-images',
                    acceptedFiles: 'image/*',
                    params: {
                        'width': this.imageWidth,
                        'height': this.imageHeight,
                        'location': this.imageLocation,
                    },
                    headers: {
                        // from CSRF Token document meta tag
                        'X-CSRF-TOKEN': document.head.querySelector('meta[name=csrf-token]').content,
                    },
                    success: (event, response) => {
                        this.$store.dispatch('fetchAuthUser');
                        this.$store.dispatch('fetchUser', this.$route.params.userId);
                        this.$store.dispatch('fetchUserPosts', this.$route.params.userId);
                    }
                };
            }
        },
        mounted() {
            if (this.authUser.data.user_id === parseInt(this.$route.params.userId)) {
                this.dropzone = new Dropzone(this.$refs.userImage, this.settings);
                this.pointer = true;
            }
        }
    }
</script>
