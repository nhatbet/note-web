<template>
    <CArticleList apiSource="articles"></CArticleList>
</template>
<script lang="ts">
import CArticleList from '@/components/General/CArticleList.vue'

export default {
    name: 'VArticleIndex',
    props: {},
    components: {
        CArticleList
    },

    setup(props) {
        return {}
    },

    methods: {},

    watch: {},
    computed: {}
}
</script>
<style scoped lang="scss">
.search-bar__btn:hover {
    background: rgb(235, 235, 235);
    border-radius: 3px;
}
</style>
