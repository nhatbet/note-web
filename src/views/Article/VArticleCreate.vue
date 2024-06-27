<template>
    <CInput
        v-model="articleData.title"
        :errors="articleErrors?.title"
        placeholder="username"
        label="Title"
        classes="mb-2"
    ></CInput>
    <CSelect
        v-model="articleData.status"
        :options="selection.article_status"
        classes="mb-2"
        label="Status"
    ></CSelect>
    <MDEditor v-model="articleData.content" :errors="articleErrors?.content"></MDEditor>
    <CButton
        text="Create"
        classes="bg-purple-800 !text-gray-100 tracking-wide font-semibold w-[100px] my-5"
        @clickCButton="submitCreateArticle()"
    ></CButton>
</template>

<script lang='ts'>
import { ref } from 'vue'
import MDEditor from '@/components/Editor/MDEditor.vue'
import type { ArticleStore } from '@/types/TArticle'
import { SelectionService } from '@/services/SelectionService'

export default {
    name: 'VArticleCreate',
    props: {},
    components: {
        MDEditor
    },
    setup(props, { emit }) {
        const selection = SelectionService()
        const articleData = ref<ArticleStore>({
            title: '',
            content: '',
            status: 1,
            tags: []
        })
        const articleErrors = ref({
            title: [],
            content: [],
            status: [],
            tags: []
        })

        return { articleData, articleErrors, selection }
    },

    methods: {
        submitCreateArticle() {
            console.log('form:', this.articleData);
            
        }
    }
}
</script>
