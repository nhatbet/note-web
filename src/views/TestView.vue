<template>
    <div class="w-full">
        <!-- <CSelectSearch v-model="tags" :multipleSelect="true" label="Tags" :options="selection.article_status"
            placeholder="Select tag"></CSelectSearch> -->
        <!-- <UploadImage></UploadImage> -->
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// import UploadImage from '@/components/File/UploadImage.vue'

const tags = ref([])
</script>
