<template>
    <CInput v-model="article.title" :errors="articleErrors?.title" placeholder="Username" label="Title"
        classes="mb-2"></CInput>
    <CSelect v-model="article.status" :options="selection.article_status" classes="mb-2" label="Status"></CSelect>
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
import type { ArticleStore } from '@/types/TArticle'
import BaseApi from '@/network/BaseApi'
import { useRoute } from 'vue-router';
import { useSelectionStore } from '@/stores/selection';

export default {
    name: 'VArticleEdit',
    props: {},
    components: {
        MDEditor
    },
    setup(props, { emit }) {
        const selectionStore = useSelectionStore()
        const selection: any = ref([]);
        const route = useRoute()
        const id = route.params.id

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
            await BaseApi.get('articles/' + id)
                .then((res: any) => {
                    article.value = res.data
                    console.log('article.value', article.value);

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
            
            await BaseApi.setAuth().put('articles/' + this.id, this.article)
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
