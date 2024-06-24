<template>
    <md-editor
        v-model="model"
        @onChange="onChange"
        @onUploadImg="onUploadImg"
        @onSave="onSave"
        @onBlur="onBlur"
        :theme="theme"
        :language="language"
        :showCodeRowNumber="showCodeRowNumber"
        :previewTheme="previewTheme"
        :toolbars="toolbars"
        :placeholder="placeholder"
        :footers="['markdownTotal', '=', 'scrollSwitch']"
        :maxLength="maxLength"
        :autoDetectCode="true"
    />
</template>

<script lang='ts'>
import { computed, ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

export default {
    name: 'MDEditor',
    components: {
        MdEditor
    },
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        theme: {
            type: String,
            default: 'light'
        },
        language: {
            type: String,
            default: 'en-US'
        },
        showCodeRowNumber: {
            type: Boolean,
            default: true
        },
        previewTheme: {
            type: String,
            default: 'default'
        },
        placeholder: {
            type: String,
            default: 'placeholder'
        },
        maxLength: {
            type: Number,
            default: 10000
        }
    },

    setup(props, { emit }) {
        const model = computed({
            get: () => props.modelValue,
            set: (value) => {
                emit('update:modelValue', value)
            }
        })
        const toolbars = ref([
            'revoke',
            'next',
            'save',
            '-',
            'bold',
            'underline',
            'italic',
            '-',
            'title',
            'strikeThrough',
            'sub',
            'sup',
            'quote',
            'unorderedList',
            'orderedList',
            'task',
            '-',
            'codeRow',
            'code',
            'link',
            'image',
            'table',
            'mermaid',
            'katex',
            '=',
            'pageFullscreen',
            'fullscreen',
            'preview',
            'previewOnly',
            'htmlPreview',
            'catalog'
        ])
        const emojis = ['😀', '😃']

        return { model, toolbars, emojis }
    },

    methods: {
        onChange(val) {
            this.$emit('update:modelValue', val)
        },
        onUploadImg(files) {
            console.log('upload', files)
            console.log(Array.from(files))
        }
    }
}
</script>
