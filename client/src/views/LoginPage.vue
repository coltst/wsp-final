<script setup lang="ts">
import  UserInfo  from '@/components/UserInfo.vue';
import { useUserStore } from '@/stores/user';
const user = useUserStore();
</script>

<template>
    <div class="w-screen h-screen grid grid-cols-4 grid-rows-4 gap-4">
        <div class="col-start-2 row-start-2 col-span-2 row-span-2 back justify-center flex-col align-middle content-center">
            <div class="">
                 <div class="w-full h-full flex justify-center items-center text-3xl pb-3">
                    Welcome!
                 </div>
            </div>
            <div>
                 <div class="w-full h-full flex flex-wrap justify-center items-center text-4xl">
                    <p>Username: &nbsp;</p>
                    <input class="loginbox" type="text" name="" id="">
                 </div>
                 <div class="flex justify-center items-center">
                     <!--<input type="button" value="Login!" @click="user.user.username = input">-->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .back {
        border-radius: 3%;
        background-color: rgba(88,88,88,0.1);
        filter: drop-shadow(0 1rem 2rem black);
    }

    .loginbox {
        border-radius: 10%;
        border: 2px solid black;
        background-color: rgba(88,88,88,0.3);
        transform-origin: center;
        transform: scale(0.9);
    }

</style>
