<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { type Reply, type Post, Reaction } from '../../../server/types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { usePostStore } from '@/stores/post';
import { useSessionStore } from '@/stores/session';

const props = defineProps<{
    post?: Post
}>()

const postStore = usePostStore();
const sessionStore = useSessionStore();

const comments = ref<Reply[]>([]);
postStore.getComments(props.post?.postid ?? -1).then((result) => {comments.value = result;})
const reactions = ref<Reaction[]>([]);
postStore.getReactions(props.post?.postid ?? -1).then((result) => {reactions.value = result;})

function deletePost() {
    if (sessionStore.user.admin) {
        postStore.deletePost(Number(props.post?.postid));
    }
}

function groupReactions(array: Reaction[]) {
    const newReactions = new Map();
    for (const react of array) {
        newReactions.set(react.content, newReactions.get(react.content) ? newReactions.get(react.content)+1 : 1);
    }
    const newArray: {emoji: string, count: number}[] = [];
    for (const key of newReactions.keys()) {
        newArray.push({emoji: key, count: newReactions.get(key)});
    }
    return newArray;
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
        <div class="reactions flex">
            <div class="reaction m-2 p-2" v-for="reaction in groupReactions(reactions)" :key="reaction?.count + reaction?.emoji">
                {{  reaction?.emoji }} {{ reaction?.count }}
            </div>
        </div>
        <div class="body">{{ post?.content }}</div>
    </div>
    <div class="post" :key="comment.replyid" v-for="comment in comments">
        <div class="postinner"></div>
        <div class="author">{{ comment?.username }}</div>
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

.reaction {
    border: 1px solid black;
}
</style>