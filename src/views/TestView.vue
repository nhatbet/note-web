<template>
    <div class="w-full">
        <!-- <CSelectSearch v-model="tags" :multipleSelect="true" label="Tags" :options="selection.article_status"
            placeholder="Select tag"></CSelectSearch> -->
        <UPanelMenu/>
    </div>

</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { SelectionService } from '@/services/SelectionService';
import UPanelMenu from '@/views/Units/UPanelMenu.vue';

const tags = ref([]);
const selection = SelectionService()

</script>
