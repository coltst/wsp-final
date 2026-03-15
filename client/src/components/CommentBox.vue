<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Post } from '@/types';

const props = defineProps<{
    post?: Post
}>()

import { usePostStore } from '@/stores/post';
import { useSessionStore } from '@/stores/session';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const postStore = usePostStore();
const sessionStore = useSessionStore();

function sendComment() {
    const text = (document.getElementById("input") as HTMLInputElement).value.toString();
    // do not post if empty
    if ((text ? text : "").trim() !== "") {
        postStore.addComment(props.post?.id!, sessionStore.user?.username.toString(), text);
        (document.getElementById("input") as HTMLInputElement).value = "";
    }
}
</script>

<template>
    <div class="h-full w-full commentcontainer">
        <div class="h-full w-full p-4">
            <textarea class="h-full w-[90%] input" id="input" />
            <button class="h-full w-[8%] sendbutton" @click="sendComment">
                <FontAwesomeIcon :icon="faPaperPlane" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.commentcontainer,
.input,
.sendbutton {
    border: 1px solid grey;
    color: rgb(180, 180, 180);
    border-radius: 1rem / 1rem;
}

.commentcontainer {
    background: linear-gradient(0deg, rgba(82, 82, 82, 1), rgba(136, 136, 136, 0.5));
}

.input {
    background: linear-gradient(0deg, rgba(82, 82, 82, 1), rgba(136, 136, 136, 1));
    float: left;
    resize: none;
}

.sendbutton {
    background: linear-gradient(180deg, #55284F, rgba(136, 136, 136, 1));
    float: right;
    cursor: pointer;
}
</style>