<template>
    <CInput v-model="article.title" :errors="articleErrors?.title" placeholder="Username" label="Title"
        classes="mb-2"></CInput>
        <div class="flex">
            <CSelect
                v-model="article.category_id"
                :options="selection?.categories"
                classes="mb-2 mr-4"
                label="Category"
            ></CSelect>
            <CMultiSelect
                v-model="article.tags"
                :options="selection?.tags"
                classes="mb-2 mr-4"
                label="Tags"
            ></CMultiSelect>
            <CSelect
                v-model="article.status"
                :options="selection?.article_status"
                classes="mb-2"
                label="Status"
            ></CSelect>
        </div>
    <MDEditor v-model="article.content" :errors="articleErrors?.content"></MDEditor>
    <CButton
        text="Update"
        class="btn-submit mt-5"
        classes="!w-[100px] my-4"
        :variant="'outlined'"
        :severity="'help'"
        @click="submitArticleUpdate()"
    />
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue'
import MDEditor from '@/components/Editor/MDEditor.vue'
import type { ArticleStore, ArticleShow } from '@/types/TArticle'
import { useRoute } from 'vue-router';
import { useSelectionStore } from '@/stores/selection';
import Api from '@/network/Api';
import type { SelectionType } from '@/types/TSelect';
import CMultiSelect from '@/components/General/CMultiSelect.vue';
import { useToast } from "primevue/usetoast";

export default {
    name: 'VArticleEdit',
    props: {},
    components: {
        MDEditor,
        CMultiSelect
    },
    setup(props, { emit }) {
        const toast = useToast();
        const selectionStore = useSelectionStore()
        const selection = ref<SelectionType>();
        const route = useRoute()
        const id = route.params.id as string

        const article = ref<ArticleStore>({
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
            await Api.article.show(id as any)
                .then((res: any) => {
                    article.value = res.data as ArticleShow
                })
                .catch((err: any) => {
                })
        })

        return { article, articleErrors, selection, selectSearch, id, toast }
    },

    methods: {
        async submitArticleUpdate() {
            await Api.article.update(this.id, this.article)
                .then((res: any) => {
                    this.toast.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
                })
                .catch((err: any) => {
                    if (err?.status == 422) {
                        this.articleErrors = err.data
                    }
                    this.toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
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
