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
        <div class="mt-5">
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
                    <CIcon class="inline-block" name="ellipsis-vertical"></CIcon>
                </div>
            </div>
            <div class="comment__body">
                It's never the resume that gets you the job. The resume gets you the technical
                interview. Your ability to perform during the technical interview gets you the job.
            </div>
            <div class="comment__action flex justify-between py-5">
                <div>
                    <div class="flex">
                        <CIcon class="inline-block" name="message"></CIcon>
                        <p class="content-center">4 replies</p>
                    </div>
                </div>
                <div class="reply content-center">Reply</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const textarea = ref(null)
const visibleInput = ref(false)
const comments = [
    {
        id: 1,
        content: 'ok2',
        parent_id: 0,
        commentator_id: 3,
        commentable_id: 8,
        commentable_type: 'App\\Models\\Article',
        deleted_at: null,
        created_at: '2024-07-14T21:21:14.000000Z',
        updated_at: '2024-07-14T21:21:14.000000Z'
    },
    {
        id: 2,
        content: 'ok1',
        parent_id: 0,
        commentator_id: 3,
        commentable_id: 8,
        commentable_type: 'App\\Models\\Article',
        deleted_at: null,
        created_at: '2024-07-14T21:21:21.000000Z',
        updated_at: '2024-07-14T21:21:21.000000Z'
    },
    {
        id: 3,
        content: 'ok3',
        parent_id: 0,
        commentator_id: 3,
        commentable_id: 8,
        commentable_type: 'App\\Models\\Article',
        deleted_at: null,
        created_at: '2024-07-14T21:21:25.000000Z',
        updated_at: '2024-07-14T21:21:25.000000Z'
    }
]
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
    max-width: 350px;
    transition: all 0.3s ease-in-out;
    background-color: white;

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
