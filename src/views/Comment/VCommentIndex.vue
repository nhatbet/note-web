<template>
    <div class="comments p-5 text-base">
        <div class="head flex justify-between py-5">
            <h2>Comment({{ commentsCount }})</h2>
            <CIcon name="close" class="cursor-pointer"></CIcon>
        </div>
        <ReplyForm :user="user" @createCommentSuccess="refreshListComment()"></ReplyForm>
        <CommentItem
            v-for="(comment, index) in comments"
            :key="index"
            :user="comment.commentator"
            :comment="comment"
        ></CommentItem>
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
    commentsCount: {
        type: Number,
        default: 0
    },
    articleId: {
        type: Number,
        required: true
    },
    showComment: {
        type: Boolean,
        default: false
    }
})

// TODO: check login thi moi cho tao comment
const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)
console.log('authStore', profile.value)

const user = {
    name: profile.value.name,
    email: profile.value.email
}

const comments = ref([] as Comment[])
watch(
    () => props.showComment,
    async (newVal, oldVal) => {
        if (newVal && comments.value.length === 0) {
            await getComments()
        }
    }
)

const listComment = async () => {
    await Api.comment
        .getByArticleId(props.articleId)
        .then((res: any) => {
            comments.value = res.data.data
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const getComments = async () => {
    if (comments.value.length === 0) {
        await listComment()
    }
}
const refreshListComment = async () => {
    await listComment()
}
</script>

<style scoped lang="scss">
.comments {
    width: 400px;
    transition: all 0.3s ease-in-out;
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    overflow-y: auto;
    z-index: 11;

    .comment__create {
        transition: all 0.3s ease-in-out;
        width: 100%;
        padding: 10px 10px;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 8px;
        border-radius: 4px;
    }
}

.input-content {
    height: auto;
    width: 100%;
    resize: none;
    overflow: hidden;
    min-height: 50px;
}
</style>
