<template>
    <div v-if="loading" class="loading">
        <CLoading></CLoading>
    </div>
    <div v-else-if="articles.length == 0" class="loading">Không có bài viết nào</div>

    <div v-else>
        <div class="article-list" ref="collection">
            <CArticleItem
                v-for="(article, index) in articles"
                :key="index"
                :article="article"
                :style="childStyle"
            ></CArticleItem>
        </div>
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
    </div>
</template>

<script lang="ts" setup>
import CArticleItem from './CArticleItem.vue'
import CLoading from './CLoading.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelectionStore } from '@/stores/selection'
import type { SelectionType } from '@/types/TSelect'
import { onMounted, ref, watch, reactive } from 'vue'
import BaseApi from '@/network/BaseApi'
import { useRoute } from 'vue-router'
import type { Article } from '@/types/TArticle'

const props = defineProps({
    apiSource: {
        type: String,
        default: '',
        required: true
    }
})

const loading = ref(false)
library.add({ faAngleLeft, faAngleRight })
const route = useRoute()
const params = ref({} as any)
const articles = ref([] as Article[])
const selectionStore = useSelectionStore()
const selection = ref<SelectionType>()
const currentPage = ref(1)
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
const getList = async (page = 1) => {
    loading.value = true
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
        .finally(() => {
            loading.value = false
        })
}

onMounted(async () => {
    selection.value = await selectionStore.getData()
    await getList()

    window.addEventListener('resize', updateChildStyle)
    updateChildStyle() // Gọi một lần khi component được mount
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
    },
    { immediate: true } // Kích hoạt ngay khi component được mount
)

const childStyle = reactive({
    width: '33.3333%' // Giá trị mặc định
})
const collection = ref<HTMLDivElement | null>(null)
const updateChildStyle = () => {
    if (collection.value) {
        const width = collection.value.offsetWidth // Lấy chiều rộng của thẻ cha
        if (width < 500) {
            childStyle.width = '100%'
        } else if (width < 768) {
            childStyle.width = 'calc(50% - 10px)'
        } else {
            childStyle.width = 'calc(33.3333% - 20px)'
        }
    }
}
</script>

<style lang="scss" scoped>
.article-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: left;
    padding-bottom: 20px;
    padding-top: 20px;
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
</style>
