<script lang="ts" setup>
import type { LiveStream } from '@/types';

type Props = { stream: LiveStream }
const { stream } = defineProps<Props>()
</script>

<template>
  <div class="bg-gray rounded-lg overflow-hidden cursor-pointer transition-colors">
    <div class="relative">
      <router-link :to="`/` + stream.username">
        <img :src="`http://localhost:8090/static/` + stream.thumbnail" :alt="stream.title"
          class="w-full aspect-video object-cover">
      </router-link>
      <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
        LIVE
      </div>
      <div class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
        {{ stream.viewers }} viewers
      </div>
    </div>

    <div class="p-3">
      <div class="flex space-x-3">
        <img :src="`http://localhost:8090/static/` + stream.avatar" :alt="stream.username"
          class="w-10 h-10 rounded-full">
        <div class="min-w-0 flex-1">
          <h3 class="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
            {{ stream.title }}
          </h3>
          <p class="text-sm text-gray-400 mt-1">{{ stream.username }}</p>
          <router-link :to="`/directory/` + stream.category.link">
            <span class="text-sm text-gray-500">{{ stream.category.name }}</span>
          </router-link>
          <div v-if="stream.tags && stream.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
            <span v-for="(tag, index) in stream.tags.slice(0, 2)" :key="index"
              class="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
