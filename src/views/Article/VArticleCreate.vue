<template>
    <div>
        <MDEditor v-model="articleData.content"></MDEditor>
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

        return { articleData }
    },

    methods: {}
}
</script>
