<template>
    <div class="btn-share">
        <CIcon name="share" class="cursor-pointer" @click="openPopup"></CIcon>
        <PopupCommon ref="popup">
            <div class="popup-content text-base">
                <div @click="copyLink">
                    <CIcon name="copy"></CIcon>
                    <span>Copy link</span>
                </div>
                <div @click="shareToTwitter">
                    <CIcon name="x"></CIcon>
                    <span>Share on X</span>
                </div>
                <div @click="shareToFacebook">
                    <CIcon name="facebook"></CIcon>
                    <span>Share on Facebook</span>
                </div>
                <div @click="shareToLinkedIn">
                    <CIcon name="linkedin"></CIcon>
                    <span>Share on LinkedIn</span>
                </div>
            </div>
        </PopupCommon>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PopupCommon from '@/components/Parts/PopupCommon.vue'
import { useToast } from "primevue/usetoast";

const toast = useToast();
const popup = ref<InstanceType<typeof PopupCommon> | null>(null)
// Function open popup
const openPopup = (event: any) => {
    popup.value?.showPopup(event) // Gọi phương thức showPopup từ CommonPopup
}

// Function copy text into clipboard
const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href) // Sao chép văn bản vào clipboard
        toast.add({ severity: 'success', summary: 'Success', detail: 'Copy success', life: 3000 });
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Copy fail', life: 3000 });
    }
    popup.value?.hidePopup()
}

// Function to share article on Facebook
const urlToShare = window.location.href // Get the current page URL
const shareToFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`
    window.open(facebookShareUrl, '_blank', 'width=600,height=400')
}

// Function to share on Twitter
const shareToTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`
    window.open(twitterShareUrl, '_blank', 'width=600,height=400')
}

// Function to share on LinkedIn
const shareToLinkedIn = () => {
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(urlToShare)}`
    window.open(linkedInShareUrl, '_blank', 'width=600,height=400')
}
</script>

<style lang="scss" scoped>
.btn-share {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    .popup-content {
        position: absolute;
        top: 100%;
        right: 0;
        width: 200px;
        z-index: 5;
        width: 240px;
        padding-top: 8px;
        padding-bottom: 8px;
        box-shadow: 0 1px 4px var(--shadow-color-primary);
        background-color: var(--bg-color-primary);
        > div {
            cursor: pointer;
            display: flex;
            align-items: center;
            height: 36px;
            &:hover {
                color: var(--text-color-second);
            }
        }
    }
}
span {
    padding: 0 10px;
    display: inline-block;
}
</style>
