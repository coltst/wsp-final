<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type { Reply, Post, Reaction } from '../../../server/types';
import { faPlus, faTrash, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { usePostStore } from '@/stores/post';
import { useSessionStore } from '@/stores/session';
import { useInfiniteScroll } from '@vueuse/core';

const props = defineProps<{
    post?: Post,
    newComments: Reply[]
}>()

const postStore = usePostStore();
const sessionStore = useSessionStore();


const comments = ref<{array: Reply[], loadedPost: number}>({array: [], loadedPost: -1});
const chunkSize = 5;
const reachedEnd = ref<boolean>(false);

const isLoading = ref<boolean>(false);

const el = useTemplateRef('el');

async function fn() {
    isLoading.value = true;
    let newPost = false;
    if (comments.value.array.length > 0) {
      if (comments.value.array[0]?.postid !== props.post?.postid) {
        newPost = true;
      }
    }
    // load more
    const currentlyLoadedPosts = comments.value.array.length;
    // start from page 1 and divide page by number of already loaded posts
    const post = props.post?.postid ?? -1;
    const result = await postStore.getCommentsPaging(post, newPost ? 1 : Math.floor(currentlyLoadedPosts/chunkSize)+1, chunkSize);
    comments.value.array = comments.value.array.concat(result.data);
    comments.value.loadedPost = post;
    comments.value.array = comments.value.array.filter((comment) => comment.postid === props.post?.postid);
    // we know we got the last page if it's empty or if it has less than we asked for
    reachedEnd.value = ( (result.total == 0 || result.total < chunkSize) && result.success == true);
    isLoading.value = false;
}

const { reset } = useInfiniteScroll(
  el,
  fn,
  {
    distance: 1,
    canLoadMore: () => {
      return !reachedEnd.value;
    },
  }
);

function resetList() {
  reset();
  comments.value.array = [];
  comments.value.loadedPost = -1;
  reachedEnd.value = false;
}

const reactionBox = ref("");

const reactions = ref<Reaction[]>([]);
function loadReactions() {
    postStore.getReactions(props.post?.postid ?? -1).then((result) => {reactions.value = result;});
}
loadReactions();
function addReaction(emoji?: string, toggle?: boolean) {
    const content = emoji ? emoji : reactionBox.value;
    postStore.addReaction(props.post?.postid ?? -1, content, toggle).then(() => {
        loadReactions();
    });
}

watch(
  () => props.post,
  () => {
    resetList();
    reactions.value = [];
    loadReactions();
  }
)

function deletePost() {
    if (sessionStore.user?.userrole === "admin") {
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
  <div class="overflow-y-scroll h-full" ref="el">
    <div class="post">
        <div class="postinner"></div>
        <div class="author">
            {{ post?.username }}
            <FontAwesomeIcon :icon="faTrash" :class="{ 'cursor-pointer': sessionStore.user?.userrole === 'admin' }"
                @click="deletePost()" v-if="sessionStore.user?.userrole === 'admin'" />
        </div>
        <div class="title m-4">{{ post?.title }}</div>
        <div class="reactions flex">
            <div class="reaction m-2 p-2" v-for="reaction in groupReactions(reactions)" :key="reaction?.count + reaction?.emoji" @click="addReaction(reaction?.emoji, true)">
                {{  reaction?.emoji }} {{ reaction?.count }}
            </div>
            <div class="reaction m-2 p-2">
                <input type="text" v-model="reactionBox">
                <a @click="addReaction(undefined, false)"><FontAwesomeIcon :icon="faPlus" /></a>
            </div>
        </div>
        <div class="body">{{ post?.content }}</div>
    </div>
      <div class="post" :key="comment.replyid" v-for="comment in comments.array.concat(props.newComments)">
          <div class="postinner"></div>
          <div class="author">{{ comment?.username }}</div>
          <div class="body">{{ comment?.content }}</div>
      </div>
    <div v-if="isLoading" class="flex justify-center py-3"><FontAwesomeIcon :icon="faTruckLoading"/></div>
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
    cursor: pointer;
}
</style>
