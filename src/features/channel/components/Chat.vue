<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { useWebSocket } from '@vueuse/core';

import Input from '@/shared/components/input/Input.vue';
import { authState } from '@/features/auth/store';
import type { InitMessage, Message } from '../types';

const props = defineProps<{ username: string }>()
const username = authState.user

const error = ref('')
const messages = ref<Message[]>([])
const message = ref('')
const retries = 3
let retriesDone = 0
let retryTimer = 3

// TODO: сейчас коннектятся только зарегистрированные пользователи. исправить (как?))).
const { data, send, status, close } = useWebSocket("ws://localhost:80/ws", {
    onConnected(ws) {
        const initMsg: InitMessage = { channel: props.username, username: username! }
        const firstMsg = JSON.stringify(initMsg)
        send(firstMsg);
    },
    onMessage(ws, event) {
        messages.value.push(JSON.parse(event.data))
    },
    onDisconnected(ws, event) {
        if (event.wasClean) {
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
        }
    },
    onError(ws, event) {
        if (retriesDone === retries) return

        retryTimer = 3
        retriesDone += 1
        const interval = setInterval(() => {
            error.value = `Не удалось подключиться к чату. Попытка переподключиться через: ${retryTimer}`
            retryTimer -= 1

            if (retryTimer === 0) {
                clearInterval(interval)
            }
        }, 1000)
    },
    autoReconnect: {
        delay: retryTimer * 1000,
        retries: retries,
        onFailed() {
            error.value = `Не удалось подключиться к чату после ${retriesDone} попыток.`
        }
    },
})

onUnmounted(() => {
    if (status.value !== 'OPEN') return

    close(1000, "closed")
})

function onKeyDown(e: KeyboardEvent) {
    // if (status.value !== 'OPEN') return

    if (e.key === 'Enter') {
        send(JSON.stringify({ channel: props.username, sender: username, message: message.value }))
        message.value = ''
    }
}
</script>

<template>
    <div class="flex-1/5 relative pr-2 pl-2 flex flex-col max-w-1/5">
        <div v-if="error !== ''" class="error">{{ error }}</div>
        <div class="bg-gray-800 flex-grow-1 overflow-y-scroll pb-4 pt-2">
            <div class="space-y-3 text-sm">
                <!-- TODO: сделать нормальный ключ -->
                <div v-for="msg in messages" :key="msg.message + msg.sender" class="max-w-full">
                    <span class="font-semibold text-purple-400 mr-1">{{ msg.sender }}:</span>
                    <span class="text-gray-300 text-wrap max-w-full wrap-anywhere">{{ msg.message
                        }}</span>
                </div>
            </div>
        </div>
        <Input v-model="message" @keydown="onKeyDown" placeholder="Say something..." class="w-full" />
    </div>
</template>
