<template>
    <h2>{{ article.title }}</h2>
    <MdPreview editorId="show-article" :modelValue="article.content" theme="light" />
</template>

<script setup lang="ts">
import Api from '@/network/Api';
import { MdPreview } from 'md-editor-v3'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id as string
const article = ref({
    title: '',
    content: '',
})
onMounted(async () => {
    await Api.article.show(id)
        .then((res: any) => {
            article.value = res.data
            console.log('article.value', article.value);
            
        })
        .catch((err: any) => {
            console.log(err)
        })
})
</script>
