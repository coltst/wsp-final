<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <main>Welcome, {{ userStore.user.username }}</main>
</template>

<style scoped>
    
</style>