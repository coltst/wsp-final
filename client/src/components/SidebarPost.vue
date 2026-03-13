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
        <div class="author">{{ post?.userId }}</div>

        <div class="title">{{ post?.title }}</div>
    </div>
    <br>
</template>

<style scoped>
.author {
    margin: 1rem;
    font-size: 75%;
    color: rgb(210, 210, 210);
    width: 50%;
}

.post {
    border-radius: 1rem / 1rem;
    background: linear-gradient(0deg, rgba(82, 82, 82, 0.5), rgba(136, 136, 136, 0));
    border: 1px solid grey;
    z-index: 5;
    color: rgb(180, 180, 180);
    cursor: pointer;

    overflow: hidden;
    /* clip inner bright shadow */

    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.post:hover {
    border-radius: 2rem / 2rem;

    color: rgb(255, 255, 255);
}

.postinner {
    position: relative;

    border-radius: inherit;
    top: 20%;
    height: 1rem;

    filter: drop-shadow(0 1rem 2rem black);
    background: linear-gradient(180deg, rgba(190, 190, 190, 0.3), rgba(136, 136, 136, 0));
}

.title {
    margin: 1rem;
}
</style>