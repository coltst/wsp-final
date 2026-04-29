<script setup lang="ts">
import CommentBox from '@/components/CommentBox.vue';
import MainPost from '@/components/MainPost.vue';
import SidebarPost from '@/components/SidebarPost.vue';
import UserInfo from '@/components/UserInfo.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faToolbox } from '@fortawesome/free-solid-svg-icons'

import { usePostStore } from '@/stores/post';
import { useSessionStore } from '@/stores/session';

import type { Reply, Post } from '../../../server/types';
import { ref } from 'vue';

const postStore = usePostStore();
const sessionStore = useSessionStore();
postStore.loadPosts();

const displayedPost = ref<Post>();
const lookingAtPost = ref<boolean>(false);


const newComments = ref<Reply[]>([]);

function showPost(post: Post) {
    displayedPost.value = post;
    lookingAtPost.value = true;
    newComments.value = [];
}
function canComment() {
    return lookingAtPost.value && !(sessionStore.user === null);
}

</script>

<template>
    <div class="h-full w-full py-7 px-20">
        <div class="h-full w-full grid grid-cols-4 grid-rows-12 gap-4">
            <div class="col-start-1 row-start-1 col-span-4 row-span-1 topbar min-h-10">
                <UserInfo />
            </div>
            <div class="col-start-1 row-start-2 col-span-1 row-span-11 p-4 secondarypanel overflow-y-scroll">
                <SidebarPost v-for="value in postStore.posts" v-bind:key="value.postid" :post="value" @click="showPost(value)" />
            </div>
            <div class="col-start-2 row-start-2 col-span-3 p-4 mainpanel overflow-y-scroll"
                :class="{ 'row-span-9': canComment(), 'row-span-11': !canComment() }">
                <MainPost v-if="displayedPost ? true : false" :post="displayedPost" :new-comments="newComments" />
                <div class="infopanel w-full h-full flex items-center justify-center flex-col"
                    v-if="displayedPost ? false : true">
                    <p>Welcome to the forum!</p>
                    <p>Click a post at the left to read the content and comments.</p>
                    <p>Click the Toolbox
                        <FontAwesomeIcon :icon="faToolbox" /> to log in, then view your profile or post!
                    </p>
                </div>
            </div>
            <!--overlay the comment box-->
            <div v-if="canComment()" class="col-start-2 row-start-11 col-span-3 row-span-2 z-90">
                <CommentBox :post="displayedPost" @new-comment="(comment) => {newComments.push(comment)}" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/*.sidebar::-webkit-scrollbar {
    width: 5px;
    background: black;
    color: white;
}*/
</style>
