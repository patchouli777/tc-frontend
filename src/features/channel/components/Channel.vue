<script setup lang="ts">
import { ref, watch } from 'vue';

import Button from '@/shared/components/button/Button.vue';
import type { LiveStream } from '@/features/livestream/types';
import { useHLS } from '../composable';
import { useAppFetch, staticDataServer } from '@/shared';

type Props = { stream: LiveStream, channelId: string }
const { stream, channelId } = defineProps<Props>()
const isFollowing = false
const paused = ref(false)
const videoRef = ref<null | HTMLVideoElement>(null);
const hls = useHLS(videoRef, 'http://localhost:8080/live/livestream.m3u8')

const { data: channel }
    = useAppFetch<LiveStream>(`/channels/${channelId}`).get().json()

function handleFollow() { console.log("TODO: implement me") }
</script>

<template>
    <!-- <div class="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
        {{ timeDiffFromNow(stream.started_at) }}
      </div> -->
    <div class="flex-5/6 overflow-y-scroll hidden-scroll flex flex-col">
        <div class="bg-black aspect-video rounded-lg flex items-center justify-center relative">
            <video v-if="hls && hls.started" ref="videoRef" controls style="width: 100%; height: auto;"></video>
            <img v-else v-if=channel :src="staticDataServer + `/channel/${channel.background}`" alt=""
                class="w-full h-full">
            <div class="text-center absolute" v-if="paused">
                <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div class="w-8 h-8 text-white" />
                </div>
                <p class="text-gray-400">paused</p>
            </div>
        </div>

        <div class="bg-gray-900 border-gray-700 pl-8 pr-8 flex-1 pt-4">
            <div class="flex gap-x-4 mb-4">
                <div class="">
                    <img :src="staticDataServer + `/${stream.avatar}`" :alt="stream.username"
                        class="w-12 h-12 rounded-full" />
                </div>
                <div class="flex justify-between w-full">
                    <div class="qwe">
                        <h2 class="font-bold">{{ channelId }}</h2>
                        <h1 class="font-bold">{{ stream.title }}</h1>
                        <div class="flex items-center space-x-4 text-sm text-gray-400">
                            <div>LIVE</div>
                            <span>{{ stream.viewers }} viewers</span>
                            <router-link :to="stream.category.link">
                                <span>{{ stream.category.name }}</span>
                            </router-link>
                        </div>

                        <div v-if="stream.tags && stream.tags.length > 0" class="mt-4">
                            <div class="flex flex-wrap gap-2">
                                <div v-for="(tag, index) in stream.tags" :key="index">
                                    {{ tag }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <Button @click="handleFollow" :color="isFollowing ? 'gray' : 'purple'">
                            {{ isFollowing ? "Following" : "Follow" }}
                        </Button>
                    </div>
                </div>
            </div>

            <div v-if="channel" class="mt-4">
                <p class="text-gray-300">{{ channel.description }}</p>
            </div>
        </div>
    </div>
</template>
