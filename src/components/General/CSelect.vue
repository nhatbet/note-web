<template>
    <div :class="[classes]" class="text-base">
        <label class="block mb-2">
            <span class="text-base">{{ label }}</span>
            <select
                class="block w-full p-2 rounded-sm focus:outline-none h-[38px] focus:border-purple-400"
                @change="model = ($event?.target as HTMLInputElement).value"
            >
                <option v-show="visibleOptionFirst" :value="null">Nothing selected</option>
                <option
                    :selected="option?.value == model"
                    v-for="(option, index) in options"
                    :key="index"
                    :value="option?.value"
                >
                    {{ option?.label }}
                </option>
            </select>
            <small class="error">{{ errors[0] }}</small>
        </label>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import type { Option } from '@/types/TSelect'

export default {
    name: 'CSelect',
    props: {
        visibleOptionFirst: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: null
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: null,
            default: [] as Option[]
        },
        classes: {
            type: String,
            default: ''
        },
        errors: {
            type: [Array],
            default: []
        }
    },
    setup(props, { emit }) {
        const model = computed({
            get: () => props.modelValue,
            set: (value) => {
                emit('update:modelValue', value)
            }
        })

        return { model }
    }
}
</script>

<style lang="scss" scoped>
select {
    background-color: var(--bg-color-primary);
    border: 1px solid var(--border-color-primary);
    option {
        height: 38px;
    }
}
.error {
    color: var(--text-color-third);
}
</style>
