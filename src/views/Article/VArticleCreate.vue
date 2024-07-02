<template>
    <CInput v-model="articleData.title" :errors="articleErrors?.title" placeholder="Username" label="Title"
        classes="mb-2"></CInput>
    <CSelect v-model="articleData.status" :options="selection.article_status" classes="mb-2" label="Status"></CSelect>
    <!-- <CSelectSearch
        v-model="articleData.tags"
        :multipleSelect="true"
        label="Tags"
        :options="selection.article_status"
        placeholder="Select tag"
    ></CSelectSearch> -->
    <MDEditor v-model="articleData.content" :errors="articleErrors?.content"></MDEditor>
    <CButton text="Create" classes="!w-[100px] my-5 mt-[200px]" @clickCButton="submitCreateArticle()"></CButton>
</template>

<script lang='ts'>
import { ref } from 'vue'
import MDEditor from '@/components/Editor/MDEditor.vue'
import type { ArticleStore } from '@/types/TArticle'
import { SelectionService } from '@/services/SelectionService'
import ArticleRepository from '@/repositories/ArticleRepository'
import BaseApi from '@/network/BaseApi'

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
        const selectSearch = ref(1)

        return { articleData, articleErrors, selection, selectSearch }
    },

    methods: {
        async submitCreateArticle() {
            await BaseApi.setAuth().post('articles', this.articleData)
                .then((res: any) => {
                    console.log('ress', res);
                })
                .catch((err: any) => {
                    console.log('err', err)

                    if (err?.status == '422') {
                        this.articleErrors = err.data
                    }
                })
        }
    }
}
</script>
