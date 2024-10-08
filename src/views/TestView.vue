<template>
    <div class="w-full">
        <CSelectSearch v-model="tags" :multipleSelect="true" label="Tags" :options="selection?.article_status"
            placeholder="Select tag"></CSelectSearch>
        Single
        <CSelectSearch v-model="tags" :multipleSelect="false" label="Single Tags" :options="selection?.article_status"
            placeholder="Select tag"></CSelectSearch>
        <!-- <UploadImage></UploadImage> -->
    </div>
</template>
<script setup lang="ts">
import { useSelectionStore } from '@/stores/selection';
import type { SelectionType } from '@/types/TSelect';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue'
// import UploadImage from '@/components/File/UploadImage.vue'
const selectionStore = useSelectionStore()
const selection = ref<SelectionType>();
const tags = ref();

watch(tags, (newValue, oldValue) => {
      console.log(`Giá trị mới: ${newValue}, Giá trị cũ: ${oldValue}`);
    });

onMounted(async () => {
    selection.value = await selectionStore.getData()
    console.log('value', selection.value);
    
})
</script>
