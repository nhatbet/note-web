<template>
    <div class="search-icon">
        <CIcon name="search" class="cursor-pointer"></CIcon>
        <div class="search-body text-base" ref="boxRef">
            <CInput
                v-model="text"
                placeholder="Search"
                @keyup.enter="submitSearch"
                classes="mb-2 relative"
            >
                <template v-slot:RIcon>
                    <CIcon
                        name="xmark"
                        @click.prevent="clearText()"
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
                <div v-show="isShowNoResult">No result</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, Ref } from 'vue'
import Api from '@/network/Api'
import type { SearchResult } from '@/types/TSearch'
import { useRouter } from 'vue-router'

const router = useRouter()
const text = ref('')
const results = ref([] as SearchResult[])
const isShowNoResult = ref(false)
const isShowInstruct = ref(true)
const clearText = () => {
    text.value = ''
    isShowNoResult.value = false
}

const submitSearch = async () => {
    console.log('enter')
    isShowInstruct.value = false
    await Api.article
        .index({ title: text.value })
        .then((res: any) => {
            console.log('res', res)
            results.value = res.data.data

            if (results.value.length === 0) {
                isShowNoResult.value = true
            }
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const gotoDetail = (id: number) => {
    router.push({ name: 'VArticleShow', params: { id } })
}

const boxRef: Ref<HTMLDivElement | null> = ref(null)

// Hàm xử lý sự kiện click ra ngoài, kiểu Event
const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.value && !boxRef.value.contains(event.target as Node)) {
        console.log('Bạn đã click ra ngoài phần tử')
    }
}

onMounted(() => {
    // Lắng nghe sự kiện click khi component được mounted
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    // Gỡ bỏ sự kiện khi component bị hủy
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.search-icon {
    width: 38px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    position: relative;
    &:hover {
        background-color: var(--border-color-primary);
    }

    .search-body {
        position: absolute;
        top: 45px;
        right: -88px;
        width: 500px;
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
</style>
