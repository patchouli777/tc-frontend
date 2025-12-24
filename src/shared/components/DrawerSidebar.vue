<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useAppFetch } from '@/shared/lib/utils'
import AvatarImage from '@/shared/components/avatar/AvatarImage.vue'
import Avatar from '@/shared/components/avatar/Avatar.vue'
import AvatarFallback from '@/shared/components/avatar/AvatarFallback.vue'
import { authState } from '@/features/auth/store'

// TODO: обработать ситуацию когда не пришел список фоловов (пришел нулл)
const isOpen = ref(false)
const username = computed(() => authState.user)
const followsEndpoint = computed(() => `/follow?follower=${username.value}&extended=true`)

type sidebarChannel = {
    username: string
    avatar: string
    // category: string
    // viewers: number
}

type sidebarData = {
    channels: sidebarChannel[]
}

const { data, isFinished, execute } = useAppFetch<sidebarData>(followsEndpoint, { immediate: false }).json()

watch(data, (d) => {
    console.log(d)
})

if (username.value !== null) {
    execute()
}

watch(username, () => {
    if (username.value !== null) {
        execute()
    }
})

function toggleSidebar() {
    isOpen.value = !isOpen.value
}

const sidebarStyles = computed(() => ({
    'bg-gray-700': true,
    'overflow-y-scroll': true,
    'hidden-scroll': true,
    'w-16': !isOpen.value,
    'w-36': isOpen.value,
    'sticky': true,
    "pl-2": true,
    "pr-2": true,
}))
</script>

<template>
    <aside :class="sidebarStyles">
        <button class="mb-8" @click="toggleSidebar">
            {{ isOpen ? 'Свернуть' : '->' }}
        </button>
        <div class="flex flex-col gap-y-4 py-2">
            <section>
                <ul v-if="isFinished" class="flex flex-col gap-y-3">
                    <li v-for="item in data!['follow_list']" :key="item.name" class="">
                        <router-link :to="`/` + item.name" class="flex gap-x-2">
                            <Avatar>
                                <AvatarImage :src="`http://localhost:8090/static/` + item.avatar" alt="@unovue" />
                                <AvatarFallback>{{ item.name.slice(0, 1) }}</AvatarFallback>
                            </Avatar>
                            <span>{{ isOpen ? item.name : "" }}</span>
                            <div>{{ item.is_live ? item.viewers : "" }}</div>
                        </router-link>
                    </li>
                </ul>
            </section>
        </div>
    </aside>
</template>
