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
        classes="w-[100px] my-5"
        @clickCButton="submitCreateArticle()"
    ></CButton>
</template>

<script lang='ts'>
import { ref } from 'vue'
import MDEditor from '@/components/Editor/MDEditor.vue'
import type { ArticleStore } from '@/types/TArticle'
import { SelectionService } from '@/services/SelectionService'
import ArticleRepository from '@/repositories/ArticleRepository'

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
            ArticleRepository.store(this.articleData)
                .then((res: any) => {
                    this.$notify(
                        {
                            group: 'success',
                            title: 'success',
                            text: res.message
                        },
                        4000
                    )
                    // this.$router.push({ name: 'VLogin' })
                })
                .catch((err: any) => {
                    console.log('err', err);
                    
                    if (err?.status == '422') {
                        this.articleErrors = err.data
                    }
                })
        }
    }
}
</script>
