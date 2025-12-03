<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/shared/components/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/shared/components/form'
import { Input } from '@/shared/components/input'
import { watch } from 'vue'
import { setToken } from '../store'
import { useAppFetch } from '@/shared'

const formSchema = toTypedSchema(z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    const { data, onFetchError } = useAppFetch('/auth/login')
        .post({ username: values.username, password: values.password })
        .json()

    watch(data, (data) => {
        console.log(data)

        setToken(data.access)
    })
})
</script>

<template>
    <form @submit="onSubmit" class="flex flex-col gap-y-4">
        <FormField v-slot="{ componentField: usernameField }" name="username">
            <FormItem>
                <FormControl>
                    <Input type="text" placeholder="Логин" v-bind="usernameField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField: passwordField }" name="password">
            <FormItem>
                <FormControl>
                    <Input type="text" placeholder="Пароль" v-bind="passwordField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit">
            Войти
        </Button>
    </form>
</template>
