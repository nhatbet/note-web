<template>
    <div class="comments px-5 pb-5 text-base" :class="{ active: showComment }" >
        <div class="form-create pt-[56px]">
            <div class="head flex justify-between py-5">
                <h2 class="text-lg">Comments ({{ commentsCount }})</h2>
                <CIcon name="close" @click="closeComment()" class="cursor-pointer"></CIcon>
            </div>
            <ReplyForm :user="user" @createCommentSuccess="refreshListComment()"></ReplyForm>
        </div>
        <CommentItem
            v-for="(comment, index) in comments"
            :key="index"
            :user="comment.commentator"
            :comment="comment"
            :isLastItem="comments.length === index + 1"
        ></CommentItem>
        <CButton
            v-show="!isLastPage"
            text="Load more replies"
            classes=""
            :type="3"
            @clickCButton="getMoreComments()"
        ></CButton>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Comment } from '@/types/TComment'
import Api from '@/network/Api'
import { watch } from 'vue'
import CommentItem from './Parts/CommentItem.vue'
import ReplyForm from './Parts/ReplyForm.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const props = defineProps({
    articleId: {
        type: Number,
        required: true
    },
    showComment: {
        type: Boolean,
        default: false
    }
})

const defaultPaginate = import.meta.env.VITE_HOST
const emit = defineEmits(['closeComment'])
const commentsCount = ref(0)
const isLastPage = ref(false)
const currentPage = ref(1)

// TODO: check login thi moi cho tao comment
const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)

const user = {
    name: profile.value?.name,
    email: profile.value?.email
}

const comments = ref([] as Comment[])

watch(
    () => props.articleId,
    async (newVal, oldVal) => {
        if (newVal) {
            currentPage.value = 1;
            await getComments()
            await getCommentCount()
        }
    }
)

const getCommentCount = async () => {
    await Api.comment
        .getCountByArticleId(props.articleId)
        .then((res: any) => {
            commentsCount.value = res.data
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const listComment = async () => {
    await Api.comment
        .getByArticleId(props.articleId, currentPage.value)
        .then((res: any) => {
            isLastPage.value = res.data.last_page === res.data.current_page
            currentPage.value = res.data.current_page
            comments.value = comments.value.concat(res.data.data)
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const getMoreComments = async () => {
    if (!isLastPage.value) {
        currentPage.value += 1
        await listComment()
    }
}

const getComments = async () => {
    if (currentPage.value === 1) {
        comments.value = []
    }
    if (comments.value.length === 0) {
        await listComment()
    }
}
// chi refresh khi la trang cuoi cung
const refreshListComment = async () => {
    if (isLastPage.value) {
        const countItemLastPage = comments.value.length % defaultPaginate;
        if (countItemLastPage == defaultPaginate) {
            currentPage.value++
        } else {
            comments.value.splice(-(countItemLastPage))
        }
        await listComment()
    }
}
const closeComment = () => {
    emit('closeComment')
}
</script>

<style scoped lang="scss">
.comments {
    box-shadow: var(--shadow-color-primary) 0px 4px 12px;
    width: 420px;
    transition: right 0.3s ease-in-out;
    background-color: var(--bg-color-primary);
    position: fixed;
    top: 0;
    right: -200%;
    height: 100%;
    overflow-y: auto;
}
.comments.active {
    right: 0;
}
.form-create {
    z-index: 1;
    position: sticky;
    top: 0;
    background-color: var(--bg-color-primary);
}

@media (max-width: 550px) {
    .comments {
        width: 100%;
    }
}
</style>
