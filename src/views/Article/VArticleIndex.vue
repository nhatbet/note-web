<template>
    <div class="column-header flex items-center text-base border-b-2 border-stone-200 h-[56px]">
        <div class="column-header__title w-[50%]">Title</div>
        <div class="column-header__avatar w-[20%]"></div>
        <div class="column-header__replies w-[10%] text-center">Replies</div>
        <div class="column-header__views w-[10%] text-center">Views</div>
        <div class="column-header__actions w-[10%] text-center">Action</div>
    </div>
    <div class="column-body" @scroll="onScroll()">
        <div
            class="flex border-b border-stone-200 px-[5px] py-[10px]"
            v-for="(item, index) in articles"
            :key="index"
        >
            <div class="w-[50%]">
                <div class="title text-base">
                    {{ item.title }}
                </div>
                <div class="subtitle text-sm">{{ item.content.substring(0, 20) }}</div>
            </div>
            <div class="avatar w-[20%] flex content-center items-center">
                <img
                    src="https://picsum.photos/200/300"
                    class="w-[24px] h-[24px] rounded-full mx-1"
                    alt="avatar"
                />
                <img
                    src="https://picsum.photos/200/300"
                    class="w-[24px] h-[24px] rounded-full mx-1"
                    alt="avatar"
                />
                <img
                    src="https://picsum.photos/200/300"
                    class="w-[24px] h-[24px] rounded-full mx-1"
                    alt="avatar"
                />
            </div>
            <div class="replies w-[10%] content-center text-center">2</div>
            <div class="views w-[10%] content-center text-center">3.0k</div>
            <div class="activity w-[10%] content-center text-center">1h</div>
        </div>
    </div>
</template>
<script lang="ts">
import Api from '@/network/Api'
import { onMounted, ref } from 'vue'

interface TArticle {
    id: number
    title: string
    content: string
    author_id: number
    created_at: string
    updated_at: string
    comments: []
}
interface TComment {
    id: number
    content: string
}

export default {
    name: 'VArticleIndex',
    props: {},
    components: {},

    setup(props) {
        const items = ref(10)
        const articles = ref([] as TArticle[])
        const comments = ref([] as TComment[])
        const isLastPage = ref(false)
        onMounted(async () => {
            await Api.article.index()
                .then((res: any) => {
                    articles.value = res.data.data
                    comments.value = res.data.data.comments
                    console.log('articles.value', articles.value)

                    isLastPage.value = res.data.current_page == res.data.last_page
                })
                .catch((err: any) => {
                    console.log(err)
                })
        })

        return { items, articles, isLastPage, comments }
    },

    methods: {
        onScroll() {}
    },

    watch: {},
    computed: {}
}
</script>
<style scoped lang="scss"></style>
