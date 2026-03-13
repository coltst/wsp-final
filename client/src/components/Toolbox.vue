<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHouse } from '@fortawesome/free-solid-svg-icons'

const isClicked = ref(false);
</script>

<template>
    <div class="toolbox toolboxouter" @click="isClicked=!isClicked" :class="{ 'toolboxclicked': isClicked }">
    <div class="toolbox toolboxinner">
    </div>
    </div>
    <div class="toolboxbutton" v-if="isClicked" >
        <FontAwesomeIcon :icon="faHouse" inverse />
        <div class="toolbox toolboxbuttoninner">

        </div>
    </div>
</template>

<style scoped>
    .toolboxouter {
        z-index: 9001;
        position: absolute;
        right: 4rem;
        bottom: 2rem;

        width: 4rem;
        height: 4rem;

        border-radius: 2rem;
        border: 1px solid black;
        filter: drop-shadow(0 0.3rem 0.3rem black);
        --l: #6a5371;
        --r: #84418d;
        background: linear-gradient(180deg, var(--l), var(--r));
        
        transition: all 0.5s ease-in-out, --l 0.5s ease, --r 0.5s ease;
    }
    .toolboxouter:hover {
        
        width: 5rem;
        height: 5rem;

        right: 3.5rem;
        bottom: 2rem;
        border-radius: 4rem;

        
        --l: #b070c4;
        --r: #c965d6;
        
        filter: drop-shadow(0 0.9rem 0.9rem hotpink);
    }
    .toolboxinner {
        
        z-index: 9002;
        position: absolute;
        right: 1rem;
        bottom: 1.4rem;

        width: 2rem;
        height: 2rem;
        
        border-radius: 1rem;

        
        filter: drop-shadow(0 1rem 2rem black);
        background: linear-gradient(180deg, rgba(255,255,255,255), rgba(136,136,136,0));

        
        transition: all 0.4s ease-in-out;
    }

    .toolboxouter:hover > .toolboxinner {
        
        width: 3rem;
        height: 3rem;

        right: 1rem;
        bottom: 1.4rem;
        border-radius: 4rem;
    }


    .toolboxbutton {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        
        right: 4.5rem;
        bottom: 3.25rem;

        width: 3rem;
        height: 3rem;

        animation: button1 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

        border-radius: 1.5rem;
        background-color: black;
        
        z-index: 9000;

        cursor: pointer;

        transition: filter 0.4s linear;
        
        filter: drop-shadow(0 0rem 0rem rgba(0,0,0,0));
    }

    .toolboxbutton:hover {
        
        filter: drop-shadow(0 1rem 2rem rgba(88,88,88,88));
    }

    @keyframes button1 {
        100% {
            bottom: 8rem;
        }
    }

    
    .toolboxbuttoninner {
        
        z-index: 9001;
        position: absolute;
        right: 1.05rem;
        bottom: 1.6rem;

        width: 0.9rem;
        height: 0.9rem;
        
        border-radius: 1rem;

        
        filter: drop-shadow(0 1rem 2rem black);
        background: linear-gradient(180deg, rgba(255,255,255,255), rgba(136,136,136,0));

        
        transition: all 0.4s ease-in-out;
    }
    
</style>