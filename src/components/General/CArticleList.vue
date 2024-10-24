<template>
    <!-- list -->
    <div class="search-bar text-base flex">
        <CSelectSearch
            v-model="category"
            :options="selection?.categories"
            placeholder="Categories"
            classes="w-[150px] mr-5"
        ></CSelectSearch>
        <CSelectSearch
            v-model="tag"
            :options="selection?.tags"
            placeholder="Tags"
            classes="w-[150px] mr-5"
        ></CSelectSearch>
        <div class="search-bar__btn px-5 flex items-center cursor-pointer">Latest</div>
    </div>
    <div class="column-header flex items-center text-base h-[56px]">
        <div class="column-header__title w-[70%]">Title</div>
        <div class="column-header__replies w-[10%] text-center">Replies</div>
        <div class="column-header__views w-[10%] text-center">Views</div>
        <div class="column-header__actions w-[10%] text-center">Action</div>
    </div>
    <div class="column-body" @scroll="onScroll()">
        <div
            class="article-item flex px-[5px] py-[10px]"
            v-for="(item, index) in articles"
            :key="index"
        >
            <div class="w-[70%] cursor-pointer" @click="gotoDetail(item.id)">
                <div class="title text-base">
                    {{ item.title }}
                </div>
                <div class="subtitle text-sm">{{ item.content.substring(0, 20) }}</div>
            </div>
            <div class="replies w-[10%] content-center text-center">2</div>
            <div class="views w-[10%] content-center text-center">3.0k</div>
            <div class="activity w-[10%] content-center text-center">1h</div>
        </div>
        <div class="text-base text-center py-5" v-show="articles.length == 0">No have</div>
    </div>
    <!-- pagination -->
    <div
        class="paginate text-base flex items-center p-5"
        v-show="articles.length > 0 && lastPage !== 1"
    >
        <ul class="page mx-auto">
            <li class="page__btn" @click="prePage()">
                <FontAwesomeIcon :icon="['fas', 'angle-left']" />
            </li>
            <li
                v-for="(page, index) in lastPage"
                :key="index"
                class="page__numbers"
                @click="updateCurrentPage(page)"
                :class="{ active: currentPage === page }"
            >
                {{ page }}
            </li>
            <li class="page__btn" @click="nextPage()">
                <FontAwesomeIcon :icon="['fas', 'angle-right']" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelectionStore } from '@/stores/selection'
import type { SelectionType } from '@/types/TSelect'
import { onMounted, ref, watch } from 'vue'
import BaseApi from '@/network/BaseApi'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

interface TArticle {
    id: number
    title: string
    content: string
    author_id: number
    created_at: string
    updated_at: string
    comments: []
}

const props = defineProps({
    apiSource: {
        type: String,
        default: '',
        required: true
    }
})

library.add({ faAngleLeft, faAngleRight })
const route = useRoute()
const params = ref({} as any)
const router = useRouter()
const articles = ref([] as TArticle[])
const selectionStore = useSelectionStore()
const selection = ref<SelectionType>()
const category = ref()
const tag = ref()
const currentPage = ref()
const lastPage = ref()

const updateCurrentPage = (value: number) => {
    currentPage.value = value
}
const nextPage = () => {
    if (currentPage.value !== lastPage.value) {
        currentPage.value++
    }
}
const prePage = () => {
    if (currentPage.value !== 1) {
        currentPage.value--
    }
}
const getList = async (page = 1) =>
    await BaseApi.get(props.apiSource, {
        page,
        ...params.value
    })
        .then((res: any) => {
            articles.value = res.data.data
            currentPage.value = res.data.current_page
            lastPage.value = res.data.last_page
        })
        .catch((err: any) => {
            console.log(err)
        })

const gotoDetail = (id: any) => {
    router.push({ name: 'VArticleShow', params: { id } })
}
const onScroll = () => {}

onMounted(async () => {
    selection.value = await selectionStore.getData()
    await getList()
})

watch(currentPage, async (newVal, oldVal) => {
    if (newVal !== oldVal) {
        await getList(newVal)
    }
})

watch(
    () => route.query, // Theo dõi object query
    async (newQuery, oldQuery) => {
        const categoriesId = newQuery.categories_id
        params.value.categories_id = categoriesId
        if (typeof categoriesId === 'string') {
            params.value.categories_id = [categoriesId]
        }

        const tagsId = newQuery.tags_id
        params.value.tags_id = tagsId
        if (typeof tagsId === 'string') {
            params.value.tags_id = [tagsId]
        }

        await getList()
    },
    { immediate: true } // Kích hoạt ngay khi component được mount
)
</script>

<style lang="scss" scoped>
.search-bar__btn:hover {
    background: rgb(235, 235, 235);
    border-radius: 3px;
}
.page {
    display: flex;
    li {
        text-align: center;
        padding: 7px 13px;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
            background-color: #cfcfcf;
        }
    }
    li.active {
        background-color: #23adad;
        color: white;
        font-weight: bold;
    }
}
.column-header {
    border-bottom: 2px solid var(--border-color-primary);
}
.article-item {
    border-bottom: 1px solid var(--border-color-primary);
}
</style>
