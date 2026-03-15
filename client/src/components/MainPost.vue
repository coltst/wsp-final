<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type { Post } from '@/types';

const props = defineProps<{
    post?: Post
}>()
</script>

<template>
    <div class="post">
        <div class="postinner"></div>
        <div class="author">{{ post?.user }}</div>
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
</style>