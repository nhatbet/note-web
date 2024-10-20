<template>
    <div v-if="isVisible" class="popup-wrapper" ref="popup">
        <div class="popup-body" @click.self="hidePopup">
            <slot></slot>
            <!-- Nơi để hiển thị nội dung truyền từ component cha -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false) // Trạng thái hiển thị popup
const popup = ref<HTMLElement | null>(null)

const showPopup = (event: MouseEvent) => {
    event.stopPropagation()
    isVisible.value = true
}

// Phương thức đóng popup
const hidePopup = () => {
    isVisible.value = false
}

// Phương thức xử lý khi click bên ngoài để đóng popup
const handleClickOutside = (event: MouseEvent) => {
    if (popup.value && !popup.value.contains(event.target as Node)) {
        hidePopup()
    }
}

// Gắn sự kiện khi component được mount
onMounted(() => {
    window.addEventListener('click', handleClickOutside)
})

// Loại bỏ sự kiện khi component bị hủy
onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside)
})

// Phơi bày các phương thức để component cha có thể sử dụng
defineExpose({
    showPopup,
    hidePopup
})
</script>

<style scoped></style>
