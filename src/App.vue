<script lang="ts" setup>
import DrawerSidebar from '@/shared/components/DrawerSidebar.vue';
import AppHeader from '@/shared/components/AppHeader.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col text-white h-screen bg-gray-800">
    <AppHeader />
    <main class="flex h-full relative overflow-y-hidden">
      <DrawerSidebar />
      <router-view />
    </main>
  </div>
</template>
