<template>
    <div class="article-create">
        <CInput
            v-model="articleData.title"
            :errors="articleErrors?.title"
            placeholder="Title article"
            label="Title"
            classes="mb-2"
        ></CInput>

        <div class="flex">
            <CSelect
                v-model="articleData.category"
                :options="selection?.categories"
                classes="mb-2 mr-4"
                label="Category"
            ></CSelect>
            <CMultiSelect
                v-model="articleData.tags"
                :options="selection?.tags"
                classes="mb-2 mr-4"
                label="Tags"
            ></CMultiSelect>
            <CSelect
                v-model="articleData.status"
                :options="selection?.article_status"
                classes="mb-2"
                label="Status"
            ></CSelect>
        </div>
        <MDEditor v-model="articleData.content" :errors="articleErrors?.content"></MDEditor>
        <CButton
            text="Create"
            classes="!w-[100px] my-5 mt-[200px]"
            @clickCButton="submitArticleCreate()"
        ></CButton>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import MDEditor from '@/components/Editor/MDEditor.vue'
import type { ArticleStore } from '@/types/TArticle'
import { useSelectionStore } from '@/stores/selection'
import Api from '@/network/Api'
import CMultiSelect from '@/components/General/CMultiSelect.vue'
import type { SelectionType } from '@/types/TSelect'

export default {
    name: 'VArticleCreate',
    props: {},
    components: {
        CMultiSelect,
        MDEditor
    },
    setup(props, { emit }) {
        const selectionStore = useSelectionStore()
        const selection = ref<SelectionType>()
        const articleData = ref<ArticleStore>({
            title: '',
            content: '',
            status: 1,
            category: 1,
            tags: []
        })
        const articleErrors = ref({
            title: [],
            content: [],
            status: [],
            category: [],
            tags: []
        })
        const selectSearch = ref(1)

        onMounted(async () => {
            selection.value = await selectionStore.getData()
            console.log('selection?.article_status', selection.value?.article_status)
        })

        return { articleData, articleErrors, selection, selectSearch }
    },

    methods: {
        async submitArticleCreate() {
            await Api.article
                .store(this.articleData)
                .then((res: any) => {
                    console.log('created', res.message)
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
<style lang="scss" scoped>
.article-create {
    // margin-top: 0px;
}
</style>
