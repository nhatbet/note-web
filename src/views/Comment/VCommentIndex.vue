<template>
    <div class="comments p-5 text-base">
        <div class="head flex justify-between py-5">
            <h2 class="text-lg">Comments ({{ commentsCount }})</h2>
            <CIcon name="close" @click="closeComment()" class="cursor-pointer"></CIcon>
        </div>
        <ReplyForm :user="user" @createCommentSuccess="refreshListComment()"></ReplyForm>
        <CommentItem
            v-for="(comment, index) in comments"
            :key="index"
            :user="comment.commentator"
            :comment="comment"
            :class="{ active: showComment }"
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
    articleId: {
        type: Number,
        required: true
    },
    showComment: {
        type: Boolean,
        default: false
    }
})


const emit = defineEmits(['closeComment'])
const commentsCount = ref(0)

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
            await getCommentCount()
        }
    }
)

const getCommentCount = async () => {
    await Api.comment.getCountByArticleId(props.articleId)
        .then((res: any) => {
            commentsCount.value = res.data
        })
        .catch((err: any) => {
            console.log(err)
        })
}

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
const closeComment = () => {
    emit('closeComment')
}
</script>

<style scoped lang="scss">
.comments {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
    width: 420px;
    transition: all 0.3s ease-in-out;
    background-color: white;
    position: fixed;
    top: 0;
    right: -100%;
    height: 100%;
    overflow-y: auto;
    z-index: 100;
    &:has(.active) {
        right: 0;
    }
}

</style>
