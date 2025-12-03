<script lang="ts" setup>
import type { Category } from '@/types';
import { useRouter } from 'vue-router';

const { category } = defineProps<{ category: Category }>()
const router = useRouter()


const navigateToCategory = (link: string) => {
  // router.push(`/directory/${link}`)
};
</script>

<template>
  <div>
    <router-link :to="`/directory/` + category.link"
      class="mb-2 rounded-sm overflow-hidden cursor-pointer transition group hover:translate-x-1 hover:-translate-y-1 hover:border-violet-primary hover:border-2"
      @click="() => navigateToCategory(category.link)" style="background-color: var(--color-gray)">
      <div class="relative">
        <img :src="`http://localhost:8090/static/` + category.thumbnail" :alt="category.name"
          class="w-full aspect-[3/4] object-cover">
        <div class="inner px-2 py-2">
          <h3 class="font-semibold text-white group-hover:text-purple-400 transition-colors">
            {{ category.name }}
          </h3>
          <p class=" text-gray-300">
            {{ category.viewers }} viewers
          </p>
        </div>
      </div>
    </router-link>
    <div class="flex gap-x-2">
      <div v-for="tag in category.tags" :key="tag"
        class="border-2 py-1 px-2 cursor-pointer hover:scale-115 transition-transform"
        style="border-color: var(--color-violet-primary);">{{ tag }}</div>
    </div>
  </div>
</template>
