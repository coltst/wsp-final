<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <p v-if="userStore.user.logged">w e l c o m e, {{ userStore.user.username }} ₊˚⊹♡</p>
    <p v-if="!userStore.user.logged">w i l l &nbsp; y o u &nbsp; a t &nbsp; l e a s t &nbsp; c o n s i d e r &nbsp; l o g g i n g &nbsp; i n ?</p>
</template>

<style scoped>
    p {
        text-align: center;
        font-style: italic;
        color: grey;
    }
</style>