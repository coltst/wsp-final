<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    {{ userStore.user.username }}
</template>

<style scoped>
    
</style>