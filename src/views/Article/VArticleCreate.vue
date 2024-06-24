<template>
    <div>
        <MDEditor v-model="content"></MDEditor>
    </div>
</template>

<script lang='ts'>
import { ref } from 'vue'
import MDEditor from '@/components/Editor/MDEditor.vue'

export default {
    name: 'VArticleCreate',
    props: {},
    components: {
        MDEditor
    },
    setup(props, { emit }) {
        const content = ref('# ok')

        return { content }
    },

    methods: {}
}
</script>
