<script setup lang="ts">
import type { Category } from '@/types';
import CategoryCard from './CategoryCard.vue';

const { categories } = defineProps<{ categories: Category[] | null }>()
</script>

<template>
    <div v-if="categories === null">
        Подходящие категории не найдены
    </div>

    <div v-else class="flex gap-x-4 gap-y-8 flex-wrap min-w-full">
        <div v-for="category in categories" :key="category._id"
            class="basis-auto flex-grow-1 flex-shrink-0 w-1/6 min-w-64 max-w-1/5">
            <CategoryCard :category="category" />
        </div>
    </div>
</template>
