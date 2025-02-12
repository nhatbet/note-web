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
                v-model="articleData.category_id"
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
            class="btn-submit mt-5"
            classes="!w-[100px] my-4"
            :variant="'outlined'"
            :severity="'help'"
            @clickCButton="submitArticleCreate()"
        ></CButton>
        <Button label="Info" severity="info" variant="text" raised />
    </div>
</template>

<script lang="ts">
import { useToast } from 'primevue/usetoast'
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
        const toast = useToast()
        const selectionStore = useSelectionStore()
        const selection = ref<SelectionType>()
        const articleData = ref<ArticleStore>({
            title: '',
            content: '',
            status: 1,
            category_id: 1,
            tags: []
        })
        const articleErrors = ref({
            title: [],
            content: [],
            status: [],
            category_id: [],
            tags: []
        })
        const selectSearch = ref(1)

        onMounted(async () => {
            selection.value = await selectionStore.getData()
            console.log('selection?.article_status', selection.value?.article_status)
        })

        return { articleData, articleErrors, selection, selectSearch, toast }
    },

    methods: {
        async submitArticleCreate() {
            await Api.article
                .store(this.articleData)
                .then((res: any) => {
                    this.toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message,
                        life: 3000
                    })
                })
                .catch((err: any) => {
                    if (err?.status == 422) {
                        this.articleErrors = err.data
                    }
                    this.toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.message,
                        life: 3000
                    })
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.btn-submit {
    position: sticky;
    position: -webkit-sticky;
    bottom: 30px;
}
</style>
