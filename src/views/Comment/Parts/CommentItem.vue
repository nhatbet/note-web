<template>
    <div class="mt-5 comment-item">
        <div class="comment__head flex justify-between">
            <div class="info flex pb-5">
                <img
                    src="https://picsum.photos/300/300"
                    class="w-[30px] h-[30px] mr-5 rounded-full"
                    alt="avatar"
                />
                <div>
                    <p class="leading-6 text-[12px]">Name</p>
                    <p class="leading-6 text-[12px]">1 Year ago</p>
                </div>
            </div>
            <div class="action">
                <CIcon name="comment" class="cursor-pointer"></CIcon>
            </div>
        </div>
        <div class="comment__body">
            {{ content }}
        </div>
        <div class="comment__action flex justify-between my-5">
            <div>
                <div class="flex" v-show="commentsCount">
                    <CIcon class="inline-block" name="message"></CIcon>
                    <p class="content-center" @click="showSubComments()">
                        {{ commentsCount }} replies
                    </p>
                </div>
            </div>
            <div>
                <span class="reply content-center cursor-pointer">Reply</span>
            </div>
        </div>
        <div class="child ml-[15px] pl-[15px]">
            <CommentItem
                v-for="(comment, index) in subComments"
                :key="index"
                :commentsCount="comment.comments_count"
                :content="comment.content"
                :id="comment.id"
                :level="subLevel"
            ></CommentItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Comment } from '@/types/TComment'
import Api from '@/network/Api'

const props = defineProps({
    commentsCount: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: ''
    },
    id: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        default: 1
    }
})
const subComments = ref()
const subLevel = props.level + 1

const showSubComments = async () => {
    await Api.comment
        .index({ parent_id: props.id })
        .then((res: any) => {
            subComments.value = res.data
            console.log('res', res)

            // comments.value = res.data.data
        })
        .catch((err: any) => {
            console.log(err)
        })
}
</script>

<style scoped lang="scss">
.comment-item {
    // border-bottom: 1px solid #f2f2f2;
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
