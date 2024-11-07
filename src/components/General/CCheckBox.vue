<template>
    <div class="flex items-center gap-2 custom-checkbox-label ml-[3px]" :classes="classes">
        <Checkbox v-model="model" :inputId="name" :value="true" />
        <label :for="name" class="cursor-pointer"> {{ label }} </label>
    </div>
</template>

<script lang="ts" setup>
import Checkbox from 'primevue/checkbox'
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    classes: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})
</script>

<style lang="scss" scoped>
.custom-checkbox-label {
    font-size: 1.6rem;
}

::v-deep .p-checkbox-box {
    transform: scale(1.5);
}
label {
    padding-left: 10px;
}
</style>
