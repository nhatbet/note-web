<template>
    <div class="mt-5 comment-item" :class="{'border-bottom-gray': !isLastItem}">
        <CUserInfo :user="user" :info="createdAtFormated"></CUserInfo>
        <div class="comment__body">
            {{ comment.content }}
        </div>
        <div class="comment__action flex justify-between my-5">
            <div>
                <div class="flex" v-show="commentCount > 0">
                    <CIcon class="inline-block" name="message"></CIcon>
                    <p class="content-center cursor-pointer" @click="showSubComments()">
                        {{ commentCount }} replies
                    </p>
                </div>
            </div>
            <div>
                <span class="reply content-center cursor-pointer" @click="showReplyForm"
                    >Reply</span
                >
            </div>
        </div>
        <ReplyForm
            :showUserInfo="false"
            :defaultShow="true"
            :parentId="comment.id"
            v-if="visibleReplyForm"
            @closeReplyForm="hidenReplyForm"
            @createCommentSuccess="refreshListComment"
        ></ReplyForm>
        <div class="child ml-[15px] pl-[15px]">
            <CommentItem
                v-for="(comment, index) in subComments"
                :key="index"
                :level="subLevel"
                :user="comment.commentator"
                :comment="comment"
                :isLastItem="subComments.length === index + 1"
            ></CommentItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Api from '@/network/Api'
import CUserInfo from '@/components/General/CUserInfo.vue'
import type { UserInfo } from '@/types/TUser'
import ReplyForm from './ReplyForm.vue'
import type { Comment } from '@/types/TComment'
import moment from 'moment';

const props = defineProps({
    comment: {
        type: Object,
        default: {} as Comment
    },
    level: {
        type: Number,
        default: 1
    },
    user: {
        type: Object,
        defult: {} as UserInfo
    },
    info: {
        type: String,
        default: ''
    },
    isLastItem: {
        type: Boolean,
        default: false
    }
})
const visibleReplyForm = ref(false)
const subComments = ref([] as Comment[])
const subLevel = props.level + 1
const commentCount = ref(props.comment.comments_count as Number)

const createdAtFormated = computed(() => {
  return props.comment.created_at ? moment(props.comment.created_at).fromNow() : ''
})

const showSubComments = async () => {
    await Api.comment
        .index({ parent_id: props.comment.id })
        .then((res: any) => {
            commentCount.value = res.data.length
            subComments.value = res.data
        })
        .catch((err: any) => {
            console.log(err)
        })
}
const hidenReplyForm = () => {
    visibleReplyForm.value = false
}
const showReplyForm = () => {
    visibleReplyForm.value = true
}
const refreshListComment = async () => {
    await showSubComments()
    hidenReplyForm()
}
</script>

<style scoped lang="scss">
.border-bottom-gray {
    border-bottom: 1px solid #f2f2f2;
}
.reply {
    border-bottom: 1px solid transparent;
    &:hover {
        border-bottom: 1px solid black;
    }
}

.child {
    border-left: 3px solid #f2f2f2;
}
</style>
