<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/dialog'
import Label from '@/shared/components/label/Label.vue';
import Input from '@/shared/components/input/Input.vue';
import Button from '@/shared/components/button/Button.vue';

import { useAppFetch } from '@/shared/lib/utils'
import { authState, setToken, clearUser } from '@/features/auth/store'
import SignInForm from '@/features/auth/components/SignInForm.vue';

// import SignOutButton from '@/auth/components/SignOutButton.vue';


function onClickLogout(e: PointerEvent) {
  clearUser()
  useAppFetch('/auth/logout').post()
}
</script>

<template>
  <header class="sticky left-0 top-0 z-10 bg-gray-700">
    <div class="px-4 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <router-link to="/" class="text-2xl font-bold hover:text-white" style="color: var(--font-color-violet-primary)">
          StreamHub
        </router-link>
        <nav class="flex space-x-6">
          <router-link to="/following" class="px-3 py-2 rounded transition-colors" :class="$route.path === '/following'
            ? 'bg-violet-primary text-white'
            : 'hover:bg-gray-700'">
            Отслеживаемое
          </router-link>
        </nav>
      </div>
      <Button v-if="authState.isAuthenticated" @click="onClickLogout">Выйти ({{ authState.user }})</Button>
      <Dialog>
        <DialogTrigger as-child>
          <Button v-if="!authState.isAuthenticated">
            Войти
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogTitle>Вход</DialogTitle>
          <!-- <DialogDescription /> -->
          <SignInForm />
          <!-- <DialogHeader>
            <DialogTitle>Вход</DialogTitle>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="username" class="text-right">
                Имя
              </Label>
              <Input id="username" v-model="username" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="password" class="text-right">
                Пароль
              </Label>
              <Input id="password" v-model="password" class="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" @click="onClickLoginSubmit">
              Войти
            </Button>
          </DialogFooter> -->
        </DialogContent>
      </Dialog>
    </div>
  </header>
</template>
