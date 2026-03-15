<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useSessionStore } from '@/stores/session';
import UserInfo from '@/components/UserInfo.vue';
import { usePostStore } from '@/stores/post';
const sessionStore = useSessionStore();

const postStore = usePostStore();

const myPosts = sessionStore.user.logged ?
    postStore.posts.filter((post) => post.user === sessionStore.user.username)
    : [];

</script>

<template>
    <div class="w-screen h-screen grid grid-cols-1 grid-rows-12 gap-4 py-7 px-20">
        <div class="col-start-1 col-span-1 row-start-1 row-span-1 topbar">
            <UserInfo />
        </div>
        <div class="col-start-1 col-span-1 row-start-2 row-span-11 mainpanel" v-if="!sessionStore.user.admin">
        </div>
    </div>
</template>

<style scoped></style>