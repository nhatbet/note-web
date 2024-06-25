<template>
    <div class="mb-5">
        <CInput
            v-model="articleData.title"
            :errors="articleErrors?.title"
            placeholder="username"
            label="Title"
        ></CInput>
    </div>
    <div>
        <MDEditor v-model="articleData.content" :errors="articleErrors?.content"></MDEditor>
    </div>
</template>

<script lang='ts'>
import { ref } from 'vue'
import MDEditor from '@/components/Editor/MDEditor.vue'
import type { ArticleStore } from '@/types/TArticle'

export default {
    name: 'VArticleCreate',
    props: {},
    components: {
        MDEditor
    },
    setup(props, { emit }) {
        const articleData = ref<ArticleStore>({
            title: '',
            content: '',
            tags: []
        })
        const articleErrors = ref({
            title: [],
            content: [],
            tags: []
        })

        return { articleData, articleErrors }
    },

    methods: {}
}
</script>
