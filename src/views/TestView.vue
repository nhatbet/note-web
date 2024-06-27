<template>
    <main>
        <div>cookie: {{ test }}</div>
        <div>local_storage: {{ local_storage }}</div>
        <div>session_storage: {{ session_storage }}</div>
        <div>count_session:
            {{ count_session }}
        </div>
    </main>
</template>
<script lang='ts'>
import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
export default {
    name: 'CCloak',
    props: {},
    setup(props, { emit }) {
        const { cookies } = useCookies()

        const test = cookies.get('test')
        const local_storage = localStorage.getItem('local_storage')
        const session_storage = sessionStorage.getItem('session_storage')
        const count_session = sessionStorage.length

        return { test, local_storage, session_storage, count_session }
    },
    methods: {}
}
</script>
