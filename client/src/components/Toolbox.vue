<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'

const isClicked = ref(false);
</script>

<template>
    <div class="toolboxouter" @click="isClicked = !isClicked" :class="{ 'toolboxclicked': isClicked }">
        <div class="toolboxinner">
        </div>
    </div>
    <RouterLink class="toolboxbutton" v-if="isClicked" to="/login">
        <FontAwesomeIcon :icon="faUser" inverse />
        <div class="toolboxbuttoninner">

        </div>
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

    right: 4%;
    bottom: 4%;

    width: 4rem;
    height: 4rem;

    animation: button1 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
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

@keyframes button1 {
    100% {
        bottom: 15%;
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