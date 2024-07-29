<template>
    <img
        v-if="src"
        :src="src"
        class="w-[24px] h-[24px] rounded-full mx-1 inline-block"
        :class="classes"
        alt="avatar"
    />
</template>

<script setup lang="ts">
const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    classes: {
        type: [String, Array],
        default: ''
    }
})
</script>
<style scoped lang="scss"></style>
