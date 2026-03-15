<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightFromBracket, faRightToBracket, faToolbox, faUser } from '@fortawesome/free-solid-svg-icons'

import { useSessionStore } from "@/stores/session.ts"

const isClicked = ref(false);
const sessionStore = useSessionStore();

function logout() {
    sessionStore.logout();
}
</script>

<template>
    <div class="toolboxouter flex text-center items-center justify-center" @click="isClicked = !isClicked"
        :class="{ 'toolboxclicked': isClicked }">
        <div class="toolboxinner">
        </div>
        <FontAwesomeIcon :icon="faToolbox" inverse />
    </div>
    <RouterLink class="toolboxbutton toolboxbutton1" v-if="isClicked && !sessionStore.user.logged" to="/login">
        <FontAwesomeIcon :icon="faRightToBracket" inverse />
        <div class="toolboxbuttoninner" />
    </RouterLink>

    <RouterLink class="toolboxbutton toolboxbutton1" v-if="isClicked && sessionStore.user.logged" to="/profile">
        <FontAwesomeIcon :icon="faUser" inverse />
        <div class="toolboxbuttoninner" />
    </RouterLink>

    <RouterLink class="toolboxbutton toolboxbutton2" v-if="isClicked && sessionStore.user.logged" to="/"
        @click="logout()">
        <FontAwesomeIcon :icon="faRightFromBracket" inverse />
        <div class="toolboxbuttoninner" />
    </RouterLink>
</template>

<style scoped>
.toolboxouter,
.toolboxinner,
.toolboxbutton,
.toolboxbuttoninner {
    border-radius: 50%;
    transform-origin: center;
}

.toolboxouter {
    z-index: 9001;
    position: absolute;
    right: 4%;
    bottom: 4%;

    width: 4rem;
    height: 4rem;

    border: 1px solid black;
    filter: drop-shadow(0 0.3rem 0.3rem black);
    --l: #6a5371;
    --r: #84418d;
    background: linear-gradient(180deg, var(--l), var(--r));

    transition: all 0.5s ease-in-out;
}

.toolboxouter:hover {

    transform: scale(1.5);

    --l: #b070c4;
    --r: #c965d6;

    filter: drop-shadow(0 0.9rem 0.9rem hotpink);
}

.toolboxinner {

    z-index: 9002;
    position: absolute;
    right: 24%;
    bottom: 39%;

    width: 2rem;
    height: 2rem;

    filter: drop-shadow(0 1rem 2rem black);
    background: linear-gradient(180deg, rgba(255, 255, 255, 255), rgba(136, 136, 136, 0));


    transition: all 0.5s ease-in-out;
}

.toolboxouter:hover>.toolboxinner {
    transform: scale(1.3);
}

.toolboxbutton {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;

    width: 4rem;
    height: 4rem;

    background-color: black;

    z-index: 9000;

    cursor: pointer;

    transition: filter 0.4s linear;

    filter: drop-shadow(0 0rem 0rem rgba(0, 0, 0, 0));
    transform: scale(0.75);
}

.toolboxbutton:hover {
    filter: drop-shadow(0 1rem 2rem rgba(88, 88, 88, 88));
}

.toolboxbutton1 {

    right: 4%;
    bottom: 4%;
    animation: button1 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes button1 {
    100% {
        bottom: 15%;
        right: 4%;
    }
}

.toolboxbutton2 {

    right: 4%;
    bottom: 4%;
    animation: button2 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes button2 {
    100% {
        bottom: 11%;
        right: 8%;
    }
}


.toolboxbuttoninner {

    z-index: 9001;
    position: absolute;
    right: 25%;
    bottom: 40%;

    width: 50%;
    height: 50%;
    transform: scale(0.75);

    filter: drop-shadow(0 1rem 2rem black);
    background: linear-gradient(180deg, rgba(255, 255, 255, 255), rgba(136, 136, 136, 0));

    transition: all 0.4s ease-in-out;
}
</style>