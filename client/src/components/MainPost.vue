<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type { Post } from '@/types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { usePostStore } from '@/stores/post';

const props = defineProps<{
    post?: Post
}>()

const postStore = usePostStore();

function deletePost() {
    postStore.deletePost(props.post?.id!);
}
</script>

<template>
    <div class="post">
        <div class="postinner"></div>
        <div class="author cursor-pointer" @click="deletePost()">{{ post?.user }}
            <FontAwesomeIcon :icon="faTrash" />
        </div>
        <div class="title m-4">{{ post?.title }}</div>
        <div class="body">{{ post?.body }}</div>
    </div>
    <div class="post" v-for="comment in post?.comments">
        <div class="postinner"></div>
        <div class="author">{{ comment?.user }}</div>
        <div class="body">{{ comment?.body }}</div>
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