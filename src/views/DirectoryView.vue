<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useIntersectionObserver, useScroll } from '@vueuse/core';

import type { Category } from '@/types';
import { useAppFetch } from '@/shared/lib/utils';
import CategoryCard from '@/features/category/components/CategoryCard.vue';

type ListResponse = { categories: Category[] }

const target = useTemplateRef<HTMLDivElement>('target')
const { stop } = useIntersectionObserver(
    target,
    ([entry], observerElement) => {
        if (entry?.isIntersecting) {
            loadCategories()
        }
    },
)
const categories = ref<Category[]>([])
const page = ref(1)
const el = useTemplateRef<HTMLElement>('el')
const { y } = useScroll(el)
const count = ref(20)
const url = computed(() => {
    return `/categories?page=${page.value}&count=${count.value}`
})
const scrolled = ref(0)
const done = ref(false)
const {
    data,
    isFetching,
    execute,
} = useAppFetch<ListResponse>(url, { immediate: false })
    .get()
    .json<ListResponse>()

async function loadCategories() {
    execute()
    scrolled.value = y.value
}

watch(data, (d) => {
    categories.value.push(...data.value!.categories)
    page.value += 1;

    if (data.value?.categories.length === 0) {
        stop()
        done.value = true
    }
})
</script>

<template>
    <div class="px-8 h-full overflow-y-scroll w-full pb-16" ref="el">
        <section class="pt-8">
            <h2 class="text-2xl font-bold mb-4 hidden">Категории</h2>
            <div class="flex gap-x-4 gap-y-8 flex-wrap min-w-full">
                <div v-for="category in categories" :key="category._id"
                    class="basis-auto flex-grow-1 flex-shrink-0 w-1/6 min-w-64 max-w-1/5">
                    <CategoryCard :category="category" />
                </div>
            </div>
            <div v-if="!isFetching && !done" style="text-align: center; padding: 16px;" ref="target">loading...</div>
            <div v-if="done" style="text-align: center; padding: 16px;">its so over</div>
        </section>
    </div>
</template>
