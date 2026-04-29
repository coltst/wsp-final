<script setup lang="ts">
import type { Post } from '../../../server/types';

const props = defineProps<{
    post?: Post
}>()
</script>

<template>
    <div class="post hover">
        <div class="postinner"></div>
        <div class="author">{{ props.post?.username }}</div>
        <div class="title m-4">{{ props.post?.title }}</div>
    </div>
</template>

<style scoped>
.post:hover {
    border-radius: 2rem / 2rem;
    color: rgb(255, 255, 255);
}
</style>