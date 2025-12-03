<script lang="ts" setup>
import { useRoute } from 'vue-router';

import Chat from '@/features/channel/components/Chat.vue';
import Channel from '@/features/channel/components/Channel.vue';
import { useAppFetch } from '@/shared/lib/utils';
import type { LiveStream } from '@/types';

const route = useRoute();
const channelId = route.params.username as string;

const { data, isFinished, isFetching, error }
    = useAppFetch<LiveStream>(`/livestreams/${channelId}`).get().json()
</script>

<template>
    <div v-if="isFetching">Загрузка...</div>
    <div v-if="isFinished && error !== null">
        Ошибка: {{ error }}
    </div>
    <div v-if="isFinished && error === null" class="flex w-full">
        <Channel :stream="data" :channelId="channelId" />
        <Chat :username="channelId" />
    </div>
</template>

<style>
.hidden-scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.hidden-scroll::-webkit-scrollbar {
    display: none;
}
</style>
