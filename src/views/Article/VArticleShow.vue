<template>
    <MdPreview editorId="show-article" :modelValue="content" theme="light" />
</template>

<script setup lang='ts'>
import { MdPreview } from 'md-editor-v3'
import { onMounted, ref } from 'vue';

const content = ref('# Hello Editor');

onMounted(() => {
    // editorRef.value?.on('catalog', console.log)
    // editorRef.value?.togglePreviewOnly(true);
})

</script>
