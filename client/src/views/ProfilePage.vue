<script setup lang="ts">

import { useSessionStore } from '@/stores/session';
import UserInfo from '@/components/UserInfo.vue';
import type { DataEnvelope, User } from '../../../server/types';
import { ref } from 'vue';
const sessionStore = useSessionStore();


const myPosts = ref(0);
const myComments = ref(0);


sessionStore.api<DataEnvelope<User>>(`/users/${sessionStore.user?.userid}`).then((res) => {
    myPosts.value = res.data?.posts ?? 0;
    myComments.value = res.data?.comments ?? 0;
});

</script>

<template>
    <div class="w-screen h-screen grid grid-cols-2 grid-rows-12 gap-4 py-7 px-20">
        <div class="col-start-1 col-span-2 row-start-1 row-span-1 topbar">
            <UserInfo />
        </div>
        <div class="col-start-1 row-start-2 row-span-11 mainpanel flex items-center justify-center flex-col gap-[15%] px-4"
            :class="{ 'col-span-1': sessionStore.user?.userrole === 'admin', 'col-span-2': !(sessionStore.user?.userrole === 'admin') }">
            <h1>{{ sessionStore.user?.username }}</h1>
            <div class="mainpanel w-full h-[30%] mx-9">
                <div class="h-full flex items-center justify-center flex-row gap-[10%]">
                    <div class="w-[25%] h-[90%] mainpanel flex items-center justify-center">
                        <p>{{ myPosts }} posts</p>
                    </div>
                    <div class="w-[25%] h-[90%] mainpanel flex items-center justify-center">
                        <p>{{ myComments }} comments</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-start-2 col-span-1 row-start-2 row-span-11 mainpanel infopanel flex items-center justify-center flex-col"
            v-if="sessionStore.user?.userrole === 'admin'">
            <p>Since you are logged in as an administrator, you can delete any post.</p>
        </div>
    </div>
</template>

<style scoped>
h1,
p {
    color: #eeeeee;
}

h1 {
    font-size: 3rem;
}
</style>