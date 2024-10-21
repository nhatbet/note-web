<template>
    <div class="w-full">
        <ImageUploader></ImageUploader>
    </div>
</template>
<script setup lang="ts">
import { useSelectionStore } from '@/stores/selection';
import type { SelectionType } from '@/types/TSelect';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue'
import ImageUploader from '@/components/General/ImageUploader.vue';

</script>
