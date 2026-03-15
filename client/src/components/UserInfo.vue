<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useSessionStore } from '@/stores/session';

const sessionStore = useSessionStore();
</script>

<template>
    <p v-if="sessionStore.user.logged">welcome, {{ sessionStore.user.username }} ₊˚⊹♡</p>
    <p v-if="!sessionStore.user.logged">will you at least consider logging in?</p>
</template>

<style scoped>
p {
    text-align: center;
    font-style: italic;
    color: grey;
    letter-spacing: 5px;
}
</style>