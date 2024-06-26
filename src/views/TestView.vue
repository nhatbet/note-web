<template>
    <main>
        <div>{{ username }}</div>
    </main>
</template>
<script lang='ts'>
import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
export default {
    name: 'CCloak',
    props: {},
    setup(props, { emit }) {
        console.log('test')
        const { cookies } = useCookies()

        cookies.set('username', '123@123')
        const username = cookies.get('username')

        return { username }
    },
    methods: {}
}
</script>
