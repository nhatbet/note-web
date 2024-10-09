<template>
    <div class="comment__create">
        <CUserInfo
            v-show="showUserInfo && visibleInput"
            :user="user"
            :info="info"
            classes="h-[45px]"
        >
            <template v-slot:actionRight>
                <CIcon name="comment" class="cursor-pointer"></CIcon>
            </template>
        </CUserInfo>
        <textarea
            name="content"
            @input="resize()"
            class="input-content"
            Placeholder="Comment here !"
            ref="textarea"
            v-model="text"
            @click="open()"
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Api from '@/network/Api'
import CUserInfo from '@/components/General/CUserInfo.vue'
import type { UserInfo } from '@/types/TUser'
import { useRoute } from 'vue-router'

const props = defineProps({
    parentId: {
        type: Number,
        default: null
    },
    showUserInfo: {
        type: Boolean,
        default: true
    },
    user: {
        type: Object,
        default: {} as UserInfo
    },
    info: {
        type: String,
        default: ''
    },
    defaultShow: {
        type: Boolean,
        default: false
    }
})
const route = useRoute()
const articleId = route.params.id

const emit = defineEmits(['closeReplyForm', 'createCommentSuccess'])
const textarea: any = ref(null)
const text = ref('')
// check show input and userinfo
var visibleInput = ref(false)
if (props.defaultShow) {
    visibleInput.value = true
}
const resize = () => {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
}
const close = () => {
    visibleInput.value = false
    emit('closeReplyForm')
}
const open = () => {
    visibleInput.value = true
    // textarea.value.focus()
}
const save = async () => {
    await Api.comment
        .createForArticle(articleId, {
            content: text.value,
            parent_id: props.parentId
        })
        .then((res: any) => {
            if (res.status == 200) {
                text.value = ''
                visibleInput.value = false

                emit('createCommentSuccess')
            }
        })
        .catch((err) => {
            console.log(err)
        })
}
</script>

<style lang="scss" scoped>
.comment__create {
    transition: all 0.3s ease-in-out;
    width: 100%;
    padding: 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 8px;
    border-radius: 4px;
}
.input-content {
    height: 30px;
    width: 100%;
    resize: none;
    overflow: hidden;
}
</style>
