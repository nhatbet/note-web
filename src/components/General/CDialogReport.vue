<template>
    <div class="report-dialog" v-if="isShow" @click.self="close()">
        <div class="content text-base p-[20px]">
            <h2 class="text-lg mb-[20px]">Report {{ name }}</h2>
                <CRadio v-model="reportData.type" :options="selection?.report_categories" classes="mb-5"></CRadio>
            <CTextarea v-model="reportData.content" label="Description" classes="mb-[20px]"></CTextarea>
            <div class="flex justify-between">
                <CButton
                    text="Cancel"
                    classes="radius-cycle p-2 px-5"
                    :type="2"
                    @clickCButton="close()"
                ></CButton>
                <CButton
                    text="Report"
                    classes="radius-cycle p-2 px-5"
                    :type="1"
                    @clickCButton="report()"
                ></CButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSelectionStore } from '@/stores/selection'
import type { SelectionType } from '@/types/TSelect'
import CRadio from './CRadio.vue'
import CButton from './CButton.vue'
import Api from '@/network/Api'
import CTextarea from './CTextarea.vue'

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    isShow: {
        type: Boolean,
        default: false
    },
    id: {
        type: Number,
        default: null
    }
})

const selectionStore = useSelectionStore()
const selection = ref<SelectionType>()
const emit = defineEmits(['close'])
const reportData = ref({
    content: '',
    type: 1
})

watch(
    () => props.isShow,
    async (newVal, oldVal) => {
        if (newVal) {
            selection.value = await selectionStore.getData()
            console.log('value', selection.value)
        }
    }
)

const close = () => {
    reportData.value.content = ''
    reportData.value.type = 1
    emit('close')
}
const report = async () => {
    Api.comment
        .report(props.id, reportData.value)
        .then((res: any) => {
            close()
        })
        .catch((err: any) => {
            console.log(err)
        })
}
</script>

<style lang="scss" scoped>
.report-dialog {
    background-color: rgba(216, 216, 216, 0.15);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
        background-color: white;
        min-width: 400px;
        min-height: 300px;
        border-radius: 5px;
    }
}
textarea {
    border: 1px solid black;
}

@media (max-width: 500px) {
    .content {
        min-width: 90% !important;
    }
}
</style>
