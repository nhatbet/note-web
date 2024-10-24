<template>
    <CArticleList apiSource="articles"></CArticleList>
</template>

<script lang="ts" setup>
import CArticleList from '@/components/General/CArticleList.vue'
</script>
<style scoped lang="scss">
.search-bar__btn:hover {
    background: rgb(235, 235, 235);
    border-radius: 3px;
}
</style>
