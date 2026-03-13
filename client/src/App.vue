<script setup lang="ts">
  import { RouterView } from 'vue-router'
import Toolbox from '@/components/Toolbox.vue';
</script>



<template>
  <div class="page">
   <RouterView />
    <Toolbox />
  </div>
</template>

<style scoped>
</style>
