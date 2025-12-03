<script setup lang="ts">
import StreamCard from './StreamCard.vue';
import type { LiveStream } from '@/types';

type Props = { livestreams: LiveStream[] }
const { livestreams } = defineProps<Props>()
</script>

<template>
    <div class="flex gap-4 flex-wrap">
        <TransitionGroup>
            <div v-for="stream in livestreams" :key="stream.username" class="grow-1 basis-75">
                <StreamCard :stream="stream" />
            </div>
        </TransitionGroup>
    </div>
</template>
