<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
const sessionStore = useSessionStore();

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router';


const router = useRouter();

function login() {
    const text = (document.getElementById("loginbox") as HTMLInputElement).value.toString();
    sessionStore.setUser({
        logged: text ? true : false,
        username: text ? text : "",
        admin: text === "admin" ? true : false // this will be done in the DB later
    });
    router.push('/');
}
</script>

<template>
    <div class="w-screen h-screen grid grid-cols-4 grid-rows-4 gap-4">
        <div
            class="col-start-2 row-start-2 col-span-2 row-span-2 back justify-center flex-col align-middle content-center">
            <div class="">
                <div class="w-full h-full flex justify-center items-center text-3xl pb-3">
                    Welcome!
                </div>
            </div>
            <div>
                <div class="w-full h-full flex flex-wrap justify-center items-center text-4xl">
                    <p>Username:</p>
                    <input class="loginbox" type="text" name="loginbox" id="loginbox">
                    <button class="darkbutton" type="button" @click="login()">
                        <div class="darkbuttoninner" />
                        <FontAwesomeIcon :icon="faArrowRightToBracket" inverse />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.back {
    border-radius: 3%;
    background-color: rgba(88, 88, 88, 0.1);
    filter: drop-shadow(0 3rem 2rem black);
    border: 1px solid grey;
}

.loginbox {
    border-radius: 10% / 90%;
    border: 2px solid black;
    background-color: rgba(88, 88, 88, 0.3);
    transform-origin: center;
    transform: scale(0.9);
    width: 15rem;
}
</style>
