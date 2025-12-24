<script setup lang="ts">
import { watch } from 'vue'

import { staticDataServer, useAppFetch } from '@/shared'
import { authState } from '../auth/store'

type UserResponse = {
    id: number;
    name: string;
    avatar: string;
    is_banned: boolean;
    is_partner: boolean;
    first_livestream: Date;
    last_livestream: Date;
}

type StreamTokenResponse = {
    token: string
}

const { data: userResponse }
    = useAppFetch<UserResponse>(`/users/${authState.user}`).get().json()

const { data: streamTokenResponse, execute: fetchStreamToken }
    = useAppFetch<StreamTokenResponse>(`/users/${authState.user}/stream`, { immediate: false }).get().json()

watch(userResponse, d => {
    console.log(d)
})

function generateToken() {
    fetchStreamToken()
}
</script>

<template>
    <main class="account" aria-label="Personal account">
        <section class="header">
            <img :src="staticDataServer + `\\${userResponse.avatar}`" alt="Avatar" class="avatar" />
            <h1 class="name">{{ userResponse.name }}</h1>
        </section>

        <section class="stats" aria-label="Account statistics">
            <div class="stat" aria-label="Followers">
                <strong>{{ userResponse.followers }}</strong>
                <span>Followers</span>
            </div>

            <div class="stat" aria-label="Following">
                <strong>{{ userResponse.following }}</strong>
                <span>Following</span>
            </div>

            <div class="stat" aria-label="Following">
                <strong>{{ Date.parse(userResponse.last_livestream) === -62135596800000 ? "never" :
                    userResponse.last_livestream
                    }}</strong>
                <span>last livestream</span>
            </div>

            <div class="stat" aria-label="Following">
                <strong>{{ 123 }}</strong>
                <span>hours streamed</span>
            </div>

            <div class="stat" aria-label="Following">
                <strong>{{ Date.parse(userResponse.first_livestream) === -62135596800000 ? "never" :
                    userResponse.first_livestream
                    }}</strong>
                <span>first livestream</span>
            </div>
        </section>

        <section class="actions" aria-label="Actions">
            <button @click="generateToken">generate stream token</button>
        </section>
    </main>
</template>

<style scoped>
.account {
    margin: 2rem auto;
    padding: 1.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #fff;
    gap: 1rem;
    color: black;
}

.header {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e5e7eb;
}

.name {
    font-size: 1.75rem;
    margin: 0;
}

.role {
    color: #6b7280;
}

.bio {
    font-size: 1rem;
    color: #374151;
}

.contact {
    display: grid;
    gap: 0.5rem;
}

.contact-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.stats {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.25rem;
    border-top: 1px solid #f0f0f0;
    margin-top: 0.5rem;
}

.stat {
    text-align: center;
    flex: 1;
    color: black;
}

.stat strong {
    display: block;
    font-size: 1.25rem;
}

.stat span {
    font-size: 0.75rem;
    color: #6b7280;
}

.actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    padding-top: 0.25rem;
    border-top: 1px solid #f0f0f0;
    margin-top: 0.5rem;
}

button {
    padding: 0.55rem 1rem;
    border: 1px solid #d1d5db;
    background: #f8fafc;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background: #eef2f7;
}
</style>
