<script setup>
import { ref } from 'vue';

function signOut() {

}
const isLoading = ref(false);

const handleSignOut = async () => {
  isLoading.value = true;
  try {
    await signOut();
    await navigateTo('/auth');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <button @click="handleSignOut" variant="outline" color="gray" :loading="isLoading">
    Sign Out
  </button>
</template>
