<template>
    <h2 class="title my-5 px-[20px]">{{ article.title }}</h2>
    <CUserInfo classes="author px-[20px] h-[50px]" :user="author" :info="article.created_at"></CUserInfo>
    <div class="action mx-[20px] h-[50px] flex justify-between items-center text-base">
        <div class="h-full flex items-center">
            <CIcon name="clap" class="cursor-pointer"></CIcon>
            <CIcon name="comment" class="cursor-pointer" @click="toggleComment()"></CIcon>
        </div>
        <div class="h-full flex items-center">
            <CIcon name="bookmark" class="cursor-pointer"></CIcon>
            <CIcon name="share" class="cursor-pointer"></CIcon>
        </div>
    </div>

    <MdPreview editorId="show-article" :modelValue="article.content" theme="light" />
    <VCommentIndex :articleId="article.id" :showComment="visibleComment" @closeComment="visibleComment = false"></VCommentIndex>
</template>

<script setup lang="ts">
import Api from '@/network/Api'
import { MdPreview } from 'md-editor-v3'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { ArticleShow, Author } from '@/types/TArticle'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faComment, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons'
import VCommentIndex from '../Comment/VCommentIndex.vue'
import CUserInfo from '@/components/General/CUserInfo.vue'

library.add({ faHeart, faComment, faBookmark, faShare })
const route = useRoute()
const id = route.params.id as string
const article = ref({} as ArticleShow)
const visibleComment = ref(false);

const author = ref({} as Author)
const toggleComment = () => {
    visibleComment.value = !visibleComment.value
    console.log('show', visibleComment.value);
    return visibleComment.value
}

onMounted(async () => {
    await Api.article
        .show(id)
        .then((res: any) => {
            article.value = res.data as ArticleShow
            author.value = res.data.author
        })
        .catch((err: any) => {
            console.log(err)
        })
})
</script>

<style scoped>
.title {
    font-size: 40px;
    font-weight: bold;
}

.action {
    margin-top: 40px;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    span {
        padding: 0 10px;
        display: inline-block;
    }
}
</style>
