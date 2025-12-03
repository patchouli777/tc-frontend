<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useIntersectionObserver, useScroll } from '@vueuse/core';

import type { LiveStream } from '@/types';
import { useAppFetch } from '@/shared';
import StreamCard from '@/features/livestream/components/StreamCard.vue';

const route = useRoute();
const category = route.params.categoryName as string
type ListResponse = { livestreams: LiveStream[] }

const target = useTemplateRef<HTMLDivElement>('target')
const { stop } = useIntersectionObserver(
    target,
    ([entry], observerElement) => {
        if (entry?.isIntersecting) {
            loadLivestreams()
        }
    },
)
const livestreams = ref<LiveStream[]>([])
const page = ref(1)
const el = useTemplateRef<HTMLElement>('el')
const { y } = useScroll(el)
const count = ref(20)
const url = computed(() => {
    return `/livestreams?category=${category}&page=${page.value}&count=${count.value}`
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

async function loadLivestreams() {
    execute()
    scrolled.value = y.value
}

watch(data, (d) => {
    livestreams.value.push(...data.value!.livestreams)
    page.value += 1;

    if (data.value?.livestreams.length === 0) {
        stop()
        done.value = true
    }
})
</script>

<template>
    <section class="pt-8 px-4 overflow-auto w-full" ref="el">
        <h2 class="text-2xl font-bold mb-4">Сейчас онлайн</h2>
        <div class="flex gap-4 flex-wrap">
            <div v-for="stream in livestreams" :key="stream.username"
                class="basis-auto flex-grow-1 flex-shrink-0 w-1/6 min-w-64 max-w-1/2">
                <StreamCard :stream="stream" />
            </div>
        </div>
        <div v-if="!isFetching && !done" style="text-align: center; padding: 16px;" ref="target">loading...</div>
        <div v-if="done" style="text-align: center; padding: 16px;">its so over</div>
    </section>
</template>
