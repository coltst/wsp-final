<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <p v-if="userStore.user.logged">welcome, {{ userStore.user.username }} ₊˚⊹♡</p>
    <p v-if="!userStore.user.logged">will you at least consider logging in?</p>
</template>

<style scoped>
p {
    text-align: center;
    font-style: italic;
    color: grey;
    letter-spacing: 5px;
}
</style>