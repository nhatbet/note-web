<template>
    <MdEditor
        ref="editorRef"
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
        :footers="footers"
        :maxLength="maxLength"
        :autoDetectCode="true"
    />
    <small class="text-sm text-rose-600">{{ errors[0] }}</small>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { MdEditor, config } from 'md-editor-v3'
import type { ExposeParam } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import BaseApi from '@/network/BaseApi'

config({
    editorConfig: {
        languageUserDefined: {
            'en-US': {
                toolbarTips: {
                    bold: 'bold',
                    underline: 'underline',
                    italic: 'italic',
                    strikeThrough: 'strikeThrough',
                    title: 'title',
                    sub: 'subscript',
                    sup: 'superscript',
                    quote: 'quote',
                    unorderedList: 'unordered list',
                    orderedList: 'ordered list',
                    task: 'task list',
                    codeRow: 'inline code',
                    code: 'block-level code',
                    link: 'link',
                    image: 'image',
                    table: 'table',
                    mermaid: 'mermaid',
                    katex: 'formula',
                    revoke: 'back',
                    next: 'forward',
                    save: 'save',
                    prettier: 'prettier',
                    pageFullscreen: 'fullscreen in page',
                    fullscreen: 'fullscreen',
                    preview: 'preview',
                    previewOnly: 'previewOnly',
                    htmlPreview: 'html preview',
                    catalog: 'catalog',
                    github: 'source code'
                },
                titleItem: {
                    h1: 'Lv1 Heading',
                    h2: 'Lv2 Heading',
                    h3: 'Lv3 Heading',
                    h4: 'Lv4 Heading',
                    h5: 'Lv5 Heading',
                    h6: 'Lv6 Heading'
                },
                imgTitleItem: {
                    link: 'Add Img Link',
                    upload: 'Upload Img',
                    clip2upload: 'Clip Upload'
                },
                linkModalTips: {
                    linkTitle: 'Add Link',
                    imageTitle: 'Add Image',
                    descLabel: 'Desc:',
                    descLabelPlaceHolder: 'Enter a description...',
                    urlLabel: 'Link:',
                    urlLabelPlaceHolder: 'Enter a link...',
                    buttonOK: 'OK'
                },
                clipModalTips: {
                    title: 'Crop Image',
                    buttonUpload: 'Upload'
                },
                copyCode: {
                    text: 'Copy',
                    successTips: 'Copied!',
                    failTips: 'Copy failed!'
                },
                mermaid: {
                    flow: 'flow',
                    sequence: 'sequence',
                    gantt: 'gantt',
                    class: 'class',
                    state: 'state',
                    pie: 'pie',
                    relationship: 'relationship',
                    journey: 'journey'
                },
                katex: {
                    inline: 'inline',
                    block: 'block'
                },
                footer: {
                    markdownTotal: 'Word Count',
                    scrollAuto: 'Scroll Auto'
                }
            }
        }
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
const props = defineProps({
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
    },
    footers: {
        type: Array,
        default: ['markdownTotal', '=', 'scrollSwitch']
    },
    errors: {
        type: [Array],
        default: []
    }
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})

const editorRef = ref<ExposeParam>()

onMounted(() => {
    editorRef.value?.on('catalog', console.log)
})

const onChange = (val: string) => {
    console.log('change', val)
}

const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise((rev, rej) => {
                const form = new FormData()
                form.append('file', file)
                BaseApi.setAuth().post('upload', { collection: 'article-image', file: file })
                    .then((res: any) => rev(res))
                    .catch((err: any) => rej(err))
            })
        })
    )

    callback(
        res.map((item: any) => ({
            url: item.data.original_url,
            alt: item.data.name
            // title: item.data.file_name
        }))
    )
}
</script>

<style lang="scss" scoped>
.md-editor {
    height: calc(100vh - 170px);
}
</style>
