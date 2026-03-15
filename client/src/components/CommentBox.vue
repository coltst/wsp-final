<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Post } from '@/types';

const props = defineProps<{
    post?: Post
}>()

import { usePostStore } from '@/stores/post';
import { useUserStore } from '@/stores/user';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const postStore = usePostStore();
const userStore = useUserStore();

function sendComment() {
    const text = (document.getElementById("input") as HTMLInputElement).value.toString();
    postStore.addComment(props.post?.id!, userStore.user?.username.toString(), text);
    (document.getElementById("input") as HTMLInputElement).value = "";
}
</script>

<template>
    <div class="commentcontainer">
        <div class="h-full w-full p-4">
            <textarea class="input" id="input" />
            <button class="sendbutton" @click="sendComment">
                <FontAwesomeIcon :icon="faPaperPlane" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.commentcontainer {
    width: 100%;
    height: 100%;

    background: linear-gradient(0deg, rgba(82, 82, 82, 1), rgba(136, 136, 136, 0.5));
    border-radius: 1rem / 1rem;

}

.input {
    height: 100%;
    width: 90%;

    border-radius: 1rem / 1rem;
    background: linear-gradient(0deg, rgba(82, 82, 82, 1), rgba(136, 136, 136, 1));
    border: 1px solid grey;
    color: rgb(180, 180, 180);

    float: left;
    resize: none;
}

.sendbutton {
    height: 100%;
    width: 8%;

    border-radius: 1rem / 1rem;
    background: linear-gradient(180deg, #55284F, rgba(136, 136, 136, 1));
    border: 1px solid grey;
    color: rgb(180, 180, 180);

    float: right;

    cursor: pointer;
}
</style>