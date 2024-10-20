<template>
    <CInput v-model="article.title" :errors="articleErrors?.title" placeholder="Username" label="Title"
        classes="mb-2"></CInput>
    <CSelect v-model="article.status" :options="selection?.article_status" classes="mb-2" label="Status"></CSelect>
    <!-- <CSelectSearch
        v-model="articleData.tags"
        :multipleSelect="true"
        label="Tags"
        :options="selection.article_status"
        placeholder="Select tag"
    ></CSelectSearch> -->
    <MDEditor v-model="article.content" :errors="articleErrors?.content"></MDEditor>
    <CButton text="Update" classes="!w-[100px] my-5 mt-[200px]" @clickCButton="submitArticleUpdate()"></CButton>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue'
import MDEditor from '@/components/Editor/MDEditor.vue'
import type { ArticleStore, ArticleShow } from '@/types/TArticle'
import { useRoute } from 'vue-router';
import { useSelectionStore } from '@/stores/selection';
import Api from '@/network/Api';
import type { SelectionType } from '@/types/TSelect';

export default {
    name: 'VArticleEdit',
    props: {},
    components: {
        MDEditor
    },
    setup(props, { emit }) {
        const selectionStore = useSelectionStore()
        const selection = ref<SelectionType>();
        const route = useRoute()
        const id = route.params.id as string

        const article = ref<ArticleStore>({
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

        onMounted(async () => {
            selection.value = await selectionStore.getData()
            await Api.article.show(id as any)
                .then((res: any) => {
                    article.value = res.data as ArticleShow
                    console.log('ArticleShow', article.value);
                })
                .catch((err: any) => {
                    console.log(err)
                })
        })

        return { article, articleErrors, selection, selectSearch, id }
    },

    methods: {
        async submitArticleUpdate() {
            console.log('this.article', this.article);
            
            await Api.article.update(this.id, this.article)
                .then((res: any) => {
                    console.log('ress', res);
                })
                .catch((err: any) => {
                    console.log('err', err)

                    if (err?.status == 422) {
                        this.articleErrors = err.data
                    }
                })
        }
    }
}
</script>
