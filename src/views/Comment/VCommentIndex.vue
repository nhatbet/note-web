<template>
    <div class="comments p-5 text-base">
        <div class="head flex justify-between py-5">
            <h2>Comment(12)</h2>
            <CIcon name="close" class="cursor-pointer"></CIcon>
        </div>
        <div class="comment__create">
            <div v-if="visibleInput" class="avatar flex pb-5">
                <img
                    src="https://picsum.photos/300/300"
                    class="w-[30px] h-[30px] mr-5 rounded-full"
                    alt="avatar"
                />
                <p class="flex content-center items-center">Name</p>
            </div>
            <textarea
                name="content"
                @input="resize()"
                class="input-content p-[10px]"
                Placeholder="Placeholder"
                ref="textarea"
                @click="close()"
            ></textarea>
            <div v-if="visibleInput" class="action flex">
                <div class="w-1/2"></div>
                <div class="w-1/2 flex justify-end">
                    <CButton
                        text="Close"
                        classes="!w-[100px] my-5 mr-5"
                        @clickCButton="close()"
                    ></CButton>
                    <CButton text="Save" classes="!w-[100px] my-5" @clickCButton="save()"></CButton>
                </div>
            </div>
        </div>
        <CommentItem
            v-for="(comment, index) in comments"
            :key="index"
            :commentsCount="comment.comments_count"
            :content="comment.content"
            :id="comment.id"
        ></CommentItem>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Comment } from '@/types/TComment'
import Api from '@/network/Api'
import { onMounted } from 'vue'
import { watch } from 'vue'
import CommentItem from './Parts/CommentItem.vue'

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

const comments = ref([] as Comment[])
watch(
    () => props.showComment,
    async (newVal, oldVal) => {
        if (newVal && comments.value.length === 0) {
            await getComments()
        }
    }
)

const getComments = async () => {
    if (comments.value.length === 0) {
        await Api.comment
            .getByArticleId(props.articleId)
            .then((res: any) => {
                comments.value = res.data.data
            })
            .catch((err: any) => {
                console.log(err)
            })
    }
}

const textarea: any = ref(null)
const visibleInput = ref(false)
const resize = () => {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
}
const close = () => {
    visibleInput.value = !visibleInput.value
}
const save = () => {
    console.log('save')
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
