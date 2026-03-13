<script setup lang="ts">
import SidebarPost from '@/components/SidebarPost.vue';
import UserInfo from '@/components/UserInfo.vue';

import { usePostStore } from '@/stores/post';

const postStore = usePostStore();
</script>

<template>
    <div class="h-full w-full p-7">
        <div class="h-full w-full grid grid-cols-4 grid-rows-12 gap-4">
            <div class="col-start-1 row-start-1 col-span-4 row-span-1 topbar">
                <UserInfo />
            </div>
            <div class="col-start-1 row-start-2 col-span-1 row-span-11 p-4 sidebar overflow-y-scroll">
                <SidebarPost v-for="value in postStore.posts" :post="value" />
            </div>
            <div class="col-start-2 row-start-2 col-span-3 row-span-11 p-4 content"></div>
        </div>
    </div>
</template>

<style scoped>
.topbar {
    border-radius: 2% / 90%;
    background-color: rgba(0, 0, 0, 0.5);
    filter: drop-shadow(0 1rem 2rem black);
    border: 1px solid #7f7f7f;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1;
}

.sidebar {
    border-radius: 4%;
    background-color: rgba(88, 88, 88, 0.5);
    border: 1px solid grey;
    z-index: 4;
}

.content {
    border-radius: 4%;
    background-color: rgba(88, 88, 88, 0.5);
    border: 1px solid grey;
    z-index: 4;
}
</style>
