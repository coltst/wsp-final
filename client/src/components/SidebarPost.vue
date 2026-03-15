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
    </div>
</template>

<style scoped>
.post:hover {
    border-radius: 2rem / 2rem;
    color: rgb(255, 255, 255);
}
</style>