<template>
    <div :class="classes">
        <label>
            <span class="text-base">{{ label }}</span>
            <span v-show="required" class="error">
                <FontAwesomeIcon :icon="['fas', 'asterisk']" />
            </span>
            <input
                class="w-full p-2 rounded-sm focus:outline-none text-base h-[38px] focus:border-purple-400"
                :placeholder="placeholder"
                :type="type"
                v-model="model"
                ref="inputRef"
            />
            <slot name="RIcon" /><slot />
            <small class="error">{{ errors[0] }}</small>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { computed, ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
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

library.add({ faAsterisk })
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

<style lang="scss" scoped>
input {
    background-color: var(--bg-color-primary);
    border: 1px solid var(--border-color-primary);
}
.error {
    color: var(--text-color-third);
}
</style>
