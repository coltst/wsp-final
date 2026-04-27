<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type { Reply, Post } from '../../../server/types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { usePostStore } from '@/stores/post';
import { useSessionStore } from '@/stores/session';

const props = defineProps<{
    post?: Post
}>()

const postStore = usePostStore();
const sessionStore = useSessionStore();
console.log(props.post);
const comments = ref<Reply[]>([]);
postStore.getComments(props.post?.postID ?? -1).then((result) => {comments.value = result;})

function deletePost() {
    if (sessionStore.user.admin) {
        postStore.deletePost(Number(props.post?.postID));
    }
}
</script>

<template>
    <div class="post">
        <div class="postinner"></div>
        <div class="author">
            {{ post?.username }}
            <FontAwesomeIcon :icon="faTrash" :class="{ 'cursor-pointer': sessionStore.user.admin }"
                @click="deletePost()" v-if="sessionStore.user.admin" />
        </div>
        <div class="title m-4">{{ post?.title }}</div>
        <div class="body">{{ post?.content }}</div>
    </div>
    <div class="post" :key="comment.replyID" v-for="comment in comments">
        <div class="postinner"></div>
        <div class="author">{{ comment?.userID }}</div>
        <div class="body">{{ comment?.content }}</div>
    </div>
</template>

<style scoped>
.body {
    margin: 1rem;
    font-size: 80%;
    color: rgb(200, 200, 200);
}

.post {
    cursor: unset;
}
</style>