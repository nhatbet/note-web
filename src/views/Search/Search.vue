<template>
    <div class="search-icon">
        <div
            class="cursor-pointer w-full h-full flex items-center justify-center"
            @click="openPopup"
        >
            <CIcon name="search"></CIcon>
        </div>
        <div v-if="showPopup" class="search-body text-base" ref="popup">
            <CInput
                v-model="text"
                placeholder="Search"
                @keyup.enter="submitSearch"
                classes="mb-2 relative"
                ref="commonInput"
            >
                <template v-slot:RIcon>
                    <CIcon
                        name="xmark"
                        @click="clearText()"
                        class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-1 cursor-pointer"
                    ></CIcon>
                </template>
            </CInput>
            <small v-show="isShowInstruct">Enter to search</small>
            <div class="list-result">
                <div
                    v-for="(result, index) in results"
                    :key="index"
                    @click="gotoDetail(result.id)"
                    class="cursor-pointer item-result"
                >
                    {{ result.title }}
                </div>
                <CButton
                    v-show="showBtnLoadMore"
                    text="More..."
                    :type="3"
                    @clickCButton="getMoreResult()"
                ></CButton>
                <div v-show="isShowNoResult">No result</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, watch, nextTick } from 'vue'
import Api from '@/network/Api'
import type { SearchResult } from '@/types/TSearch'
import { useRouter } from 'vue-router'
import CInput from '@/components/General/CInput.vue'

const router = useRouter()
const showPopup = ref(false)
const text = ref('')
const isLastPageResult = ref(false)
const currentPage = ref(1)
const results = ref([] as SearchResult[])
const isShowNoResult = ref(false)
const isShowInstruct = ref(true)
const showBtnLoadMore = ref(false)
const clearText = () => {
    text.value = ''
    isShowNoResult.value = false
    isShowInstruct.value = true
    showBtnLoadMore.value = false
    results.value = []
}

const gotoDetail = async (id: number) => {
    showPopup.value = false

    await router.push({ name: 'VArticleShow', params: { id } })
}

const submitSearch = async () => {
    isShowInstruct.value = false
    await getResult()
}

const getMoreResult = async () => {
    if (!isLastPageResult.value) {
        currentPage.value++
        await getResult()
    }
}

const getResult = async () => {
    await Api.article
        .index({ title: text.value, page: currentPage.value, per_page: 5 })
        .then((res: any) => {
            results.value = results.value.concat(res.data.data)

            isLastPageResult.value = res.data.last_page === res.data.current_page
            showBtnLoadMore.value = !isLastPageResult.value

            isShowNoResult.value = false
            if (results.value.length === 0) {
                isShowNoResult.value = true
                showBtnLoadMore.value = false
            }
        })
        .catch((err: any) => {
            console.log(err)
        })
}

// Xử lý click ra ngoài thì đống popup, open thì focus input search
const popup = ref<HTMLElement | null>(null)
const commonInput = ref<InstanceType<typeof CInput> | null>(null)

const openPopup = (event: MouseEvent) => {
    event.stopPropagation()
    showPopup.value = true

    nextTick(() => {
        commonInput.value?.focusInput()
    })
}

const handleClickOutside = (event: MouseEvent) => {
    if (popup.value && !popup.value.contains(event.target as Node)) {
        showPopup.value = false
    }
}

watch(showPopup, (newValue) => {
    if (newValue) {
        window.addEventListener('click', handleClickOutside)
    } else {
        window.removeEventListener('click', handleClickOutside)
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.search-icon {
    width: 43px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    position: relative;
    // &:hover {
    //     background-color: var(--border-color-primary);
    // }

    .search-body {
        overflow-y: auto;
        position: absolute;
        top: 45px;
        right: -103px;
        width: 500px;
        max-height: 700px;
        padding: 16px;
        background-color: var(--bg-color-primary);
        box-shadow: var(--shadow-color-primary) 0px 4px 12px;
        border-radius: 2px;

        .list-result .item-result {
            padding: 8px;
            color: var(--text-color-second);
            &:hover {
                background-color: var(--bg-color-third);
            }
        }
    }
}

@media (max-width: 500px) {
    .search-body {
        width: 100vw !important;
        max-height: 50%;
    }
}
</style>
