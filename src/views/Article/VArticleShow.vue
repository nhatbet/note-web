<template>
    <h2>{{ article.title }}</h2>
    <MdPreview editorId="show-article" :modelValue="article.content" theme="light" />
</template>

<script setup lang="ts">
import BaseApi from '@/network/BaseApi'
import { MdPreview } from 'md-editor-v3'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const article = ref({
    title: '',
    content: '',
})
onMounted(async () => {
    await BaseApi.get('articles/' + id)
        .then((res: any) => {
            article.value = res.data
            console.log('article.value', article.value);
            
        })
        .catch((err: any) => {
            console.log(err)
        })
})
</script>
