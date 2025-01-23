<template>
    <div class="flex flex-col gap-1" :class="classes">
        <label class="label" for="">{{ label }}</label>
        <IconField>
            <slot name="firstIcon"></slot>
            <InputText class="w-full" v-model="model" :type="type" :placeholder="placeholder" />
            <slot name="lastIcon"></slot>
        </IconField>
        <Message v-if="errors.length > 0" severity="error" size="small" variant="simple">
            {{ errors[0] }}
        </Message>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'

const props = defineProps({
    modelValue: {
        type: [String, Number] as PropType<string | null>,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    errors: {
        type: [Array],
        default: () => []
    },
    required: {
        type: Boolean,
        default: false
    },
    classes: {
        type: [String, Array, Object],
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
const inputRef = ref<HTMLInputElement | null>(null)

const focusInput = () => {
    if (inputRef.value) {
        inputRef.value.focus()
    }
}

defineExpose({
    focusInput
})
</script>

<style lang="scss" scoped></style>
