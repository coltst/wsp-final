<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Post } from '../../../server/types';

const props = defineProps<{
    post?: Post
}>()

import { usePostStore } from '@/stores/post';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const postStore = usePostStore();

const text = ref("");

function sendComment() {
    // do not post if empty
    if ((text.value ? text.value : "").trim() !== "") {
        postStore.addComment(props.post?.postid ?? -1, text.value);
        text.value = "";
    }
}
</script>

<template>
    <div class="h-full w-full commentcontainer">
        <div class="h-full w-full p-4">
            <textarea class="h-full w-[90%] commentinput" id="input" v-model="text" />
            <button class="h-full w-[8%] sendbutton" @click="sendComment">
                <FontAwesomeIcon :icon="faPaperPlane" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.commentcontainer,
.commentinput,
.sendbutton {
    border: 1px solid grey;
    color: rgb(180, 180, 180);
    border-radius: 1rem / 1rem;
}

.commentcontainer {
    background: linear-gradient(0deg, rgba(82, 82, 82, 1), rgba(136, 136, 136, 0.5));
}

.sendbutton {
    background: linear-gradient(180deg, #55284F, rgba(136, 136, 136, 1));
    float: right;
    cursor: pointer;
}
</style>