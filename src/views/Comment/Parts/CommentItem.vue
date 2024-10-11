<template>
    <div class="mt-5 comment-item" :class="{ 'border-bottom-gray': !isLastItem }">
        <CUserInfo :user="user" :info="createdAtFormated" classes="h-[34px] mb-5">
            <template v-slot:actionRight>
                <CIcon name="horizontal-dot" class="cursor-pointer" @click="toggleBtnReport()"></CIcon>
                <CButton
                    text="Report this response"
                    classes="px-[15px] absolute top-[100%] right-[0] w-[170px]"
                    v-show="isShowBtnReport"
                    @click="handleReport"
                ></CButton>
            </template>
        </CUserInfo>
        <div class="comment__body">
            {{ comment.content }}
        </div>
        <div class="comment__action flex justify-between my-5">
            <div>
                <div class="flex" v-show="commentCount > 0">
                    <CIcon class="inline-block" name="message"></CIcon>
                    <p class="content-center cursor-pointer">
                        {{ commentCount }}
                        <span v-if="!isShowSubComment" @click="showSubComments()">
                            {{ commentCount > 1 ? 'replies' : 'reply' }}
                        </span>
                        <span v-else @click="hideSubComment()">hide replies</span>
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
        <div class="child ml-[15px] pl-[15px] mb-5" v-show="isShowSubComment">
            <CommentItem
                v-for="(comment, index) in subComments"
                :key="index"
                :level="subLevel"
                :user="comment.commentator"
                :comment="comment"
                :isLastItem="subComments.length === index + 1"
            ></CommentItem>

            <CButton
                v-show="!isLastPage"
                text="Load more replies"
                :type="3"
                @clickCButton="getMoreComments()"
            ></CButton>
        </div>
    </div>
    <CDialogReport :isShow="isShowDialogReport" :id="comment.id" @close="isShowDialogReport = false" name="Response"></CDialogReport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Api from '@/network/Api'
import CUserInfo from '@/components/General/CUserInfo.vue'
import type { UserInfo } from '@/types/TUser'
import ReplyForm from './ReplyForm.vue'
import type { Comment } from '@/types/TComment'
import moment from 'moment'
import CButton from '@/components/General/CButton.vue'
import CDialogReport from '@/components/General/CDialogReport.vue'

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
const isShowSubComment = ref(false)
const isLastPage = ref(false)
const currentPage = ref(1)
const defaultPaginate = import.meta.env.VITE_HOST
const isShowBtnReport = ref(false)
const isShowDialogReport = ref(false)

const createdAtFormated = computed(() => {
    return props.comment.created_at ? moment(props.comment.created_at).fromNow() : ''
})

const getMoreComments = async () => {
    if (!isLastPage.value) {
        currentPage.value += 1
        await getListSubComment()
    }
}

const showSubComments = async () => {
    isShowSubComment.value = true
    if (currentPage.value === 1) {
        subComments.value = []
        await getListSubComment()
    }
}

const getListSubComment = async () => {
    await Api.comment
        .index({ parent_id: props.comment.id, page: currentPage.value })
        .then((res: any) => {
            isLastPage.value = res.data.last_page === res.data.current_page
            currentPage.value = res.data.current_page
            subComments.value = subComments.value.concat(res.data.data)
        })
        .catch((err: any) => {
            console.log(err)
        })
}
const toggleBtnReport = () => {
    isShowBtnReport.value = !isShowBtnReport.value
}
const hideSubComment = () => {
    isShowSubComment.value = false
}
const hidenReplyForm = () => {
    visibleReplyForm.value = false
}
const showReplyForm = () => {
    visibleReplyForm.value = true
}
// chi refresh khi la trang cuoi cung
const refreshListComment = async () => {
    commentCount.value = commentCount.value + 1
    if (isLastPage.value) {
        const countItemLastPage = subComments.value.length % defaultPaginate
        if (countItemLastPage === defaultPaginate) {
            currentPage.value++
        } else {
            subComments.value.splice(-countItemLastPage)
        }
        await showSubComments()
    }
    hidenReplyForm()
}

const handleReport = async () => {
    // show dialog report
    isShowDialogReport.value = true
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
