<template>
    <div class="bell-icon">
        <CIcon
            name="bell"
            class="w-[43px] h-full flex items-center justify-center cursor-pointer"
            @click="openPopup"
        ></CIcon>
        <PopupCommon ref="popup">
            <div class="bell-content text-base">
                <div class="head-notice flex justify-between py-3 px-4 border-bottom">
                    <div>Notification</div>
                    <div class="cursor-pointer">
                        <CIcon name="setting" @click="gotoSetting"></CIcon>
                    </div>
                </div>
                <div @scroll="onScroll" class="content-notice">
                    <div
                        v-for="(notice, index) in notifications"
                        :key="index"
                        class="item-notice cursor-pointer py-3 px-4 border-bottom"
                    >
                        <div class="title-notice">{{ notice.title }}</div>
                        <div class="body-notice">{{ getContentNotice(notice.body) }}</div>
                    </div>
                </div>
                <div class="text-center cursor-pointer p-2" @click="gotoListNotification">View Detail</div>
            </div>
        </PopupCommon>
    </div>
</template>

<script lang="ts" setup>
import PopupCommon from '@/components/Parts/PopupCommon.vue'
import { ref, onMounted } from 'vue'
import Api from '@/network/Api'
import { useRouter } from 'vue-router'

const notifications = ref([])
const isLoading = ref(false)
const router = useRouter()

onMounted(async () => {
    isLoading.value = true
    await Api.notification
        .index({})
        .then((res: any) => {
            console.log('rr', res.data)
            notifications.value = res.data.data
        })
        .catch((err: any) => {
            console.log(err)
        })
        .finally(() => {
            isLoading.value = false
        })
})

const getContentNotice = (text: string) => {
    return text.length > 100 ? text.slice(0, 100) + '...' : text
}

const onScroll = (event: Event) => {
    const target = event.target as HTMLElement
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
        console.log('load mỏe')

        if (!isLoading.value) {
            //   loadMoreItems()
        }
    }
}

const popup = ref<InstanceType<typeof PopupCommon> | null>(null)

const openPopup = (event: any) => {
    popup.value?.showPopup(event)
}

const gotoSetting = () => {
    popup.value?.hidePopup()
    router.push({ name: 'VSetting' })
}

const gotoListNotification = () => {
    popup.value?.hidePopup()
    router.push({ name: 'VNotification' })
}
</script>

<style lang="scss" scoped>
.bell-icon {
    position: relative;

    .bell-content {
        position: absolute;
        right: -90px;
        width: 400px;
        background-color: var(--bg-color-primary);
        box-shadow: var(--shadow-color-primary) 0px 4px 12px;
        border-radius: 2px;

        .content-notice {
            max-height: 500px;
            overflow-y: auto;

            .item-notice {
                &:hover {
                    background-color: var(--bg-color-third);
                }
            }
        }
    }
}
/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgb(209, 209, 209);
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(185, 185, 185);
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    // background: #b4b4b4;
}

.border-bottom {
    border-bottom: 1px solid var(--border-color-primary);
}
</style>
