<template>
    <h2 class="title my-5 px-[20px]">{{ article.title }}</h2>
    <CUserInfo
        :classes="'author px-[20px] h-[50px]'"
        :user="author"
        :info="moment(article.created_at).format('dddd, MMMM Do YYYY')"
    ></CUserInfo>
    <div class="action mx-[20px] h-[50px] flex justify-between items-center text-base">
        <div class="h-full flex items-center">
            <CIcon name="clap" class="cursor-pointer"></CIcon>
            <CIcon name="comment" class="cursor-pointer" @click="toggleComment()"></CIcon>
        </div>
        <div class="h-full flex items-center">
            <CIcon
                name="bookmark"
                @click="toggleBookmark(article.id)"
                :load="loadBookmark"
                :classes="{ 'color-red': statusBookmark }"
                class="cursor-pointer"
            ></CIcon>
            <CIcon name="share" class="cursor-pointer"></CIcon>
        </div>
    </div>

    <MdPreview editorId="show-article" :modelValue="article.content" :theme="themeMode" />
    <VCommentIndex
        :articleId="article.id"
        :showComment="visibleComment"
        @closeComment="visibleComment = false"
    ></VCommentIndex>
</template>

<script setup lang="ts">
import Api from '@/network/Api'
import { MdPreview } from 'md-editor-v3'
import type { Themes } from 'md-editor-v3'
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ArticleShow, Author } from '@/types/TArticle'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faComment, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons'
import VCommentIndex from '../Comment/VCommentIndex.vue'
import CUserInfo from '@/components/General/CUserInfo.vue'
import moment from 'moment'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { activeTheme } = storeToRefs(themeStore)
const themeMode = computed(() => {
    return activeTheme.value as Themes
})
library.add({ faHeart, faComment, faBookmark, faShare })
const route = useRoute()
const article = ref({} as ArticleShow)
const visibleComment = ref(false)
const loadBookmark = ref(false)
const statusBookmark = ref(false)

const author = ref({} as Author)
const toggleComment = () => {
    visibleComment.value = !visibleComment.value
    return visibleComment.value
}

onMounted(async () => {
    await getDetailArticle(route.params.id as any)
    await getBookmarkStatus(route.params.id as any)
})

const getDetailArticle = async (articleId: number) => {
    await Api.article
        .show(articleId)
        .then((res: any) => {
            article.value = res.data as ArticleShow
            author.value = res.data.author
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const getBookmarkStatus = async (articleId: number) => {
    await Api.save
        .getByArticle(articleId)
        .then((res: any) => {
            statusBookmark.value = res.data
        })
        .catch((err: any) => {
            statusBookmark.value = false
            console.log(err)
        })
}

// Sử dụng watch để theo dõi sự thay đổi của route.params.id
watch(
    () => route.params.id,
    async (newId) => {
        await getDetailArticle(newId as any)
        await getBookmarkStatus(newId as any)
    }
)

const bookmark = async (id: number) => {
    loadBookmark.value = true
    await Api.save
        .saveArticle(id)
        .then((res: any) => {
            statusBookmark.value = true
        })
        .catch((err: any) => {
            console.log(err)
        })
        .finally(() => {
            loadBookmark.value = false
        })
}

const unBookmark = async (id: number) => {
    loadBookmark.value = true
    await Api.save
        .unSaveArticle(id)
        .then((res: any) => {
            statusBookmark.value = false
        })
        .catch((err: any) => {
            console.log(err)
        })
        .finally(() => {
            loadBookmark.value = false
        })
}

const toggleBookmark = async (articleId: number) => {
    if (statusBookmark.value) {
        await unBookmark(articleId)
    } else {
        await bookmark(articleId)
    }
}
</script>

<style scoped>
.title {
    font-size: 40px;
    font-weight: bold;
}

.action {
    margin-top: 40px;
    border-top: 1px solid var(--border-color-primary);
    border-bottom: 1px solid var(--border-color-primary);
    span {
        padding: 0 10px;
        display: inline-block;
    }
}
</style>
