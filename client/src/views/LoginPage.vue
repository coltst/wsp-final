<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function login() {
    const text = (document.getElementById("loginbox") as HTMLInputElement).value.toString();
    userStore.setUser({
        logged: text ? true : false,
        username: text ? text : ""
    });
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
                    <RouterLink class="toolboxbutton" to="/">
                        <button class="loginbutton" type="button" @click="login()">
                            <div class="loginbuttoninner" />
                            <FontAwesomeIcon :icon="faArrowRightFromBracket" inverse />
                        </button>
                    </RouterLink>
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

.loginbutton {

    display: flex;
    justify-content: center;
    align-items: center;

    width: 3rem;
    height: 3rem;

    border-radius: 1.5rem;
    background-color: black;
    outline: 1px solid white;

    color: rgba(88, 88, 88, 1.0);
    font-size: 90%;
    vertical-align: middle;

    z-index: 9000;

    cursor: pointer;

    transition: all 0.2s linear;

    filter: drop-shadow(0 0rem 0rem rgba(0, 0, 0, 0));
}

.loginbutton:hover {
    border-radius: 0.5rem;
}

.loginbuttoninner {

    z-index: 9001;
    position: absolute;
    right: 1.05rem;
    bottom: 1.6rem;

    width: 0.9rem;
    height: 0.9rem;

    border-radius: 1rem;


    filter: drop-shadow(0 1rem 2rem black);
    background: linear-gradient(180deg, rgba(255, 255, 255, 255), rgba(136, 136, 136, 0));

    transition: all 0.2s linear;
}

.loginbutton:hover .loginbuttoninner {

    width: 1.2rem;
    height: 1.2rem;
    right: 0.9rem;
    bottom: 1.4rem;
}
</style>
