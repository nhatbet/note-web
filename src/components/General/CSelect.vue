<template>
    <div :class="[classes]">
        <label class="label" for="">{{ label }}</label>
        <Dropdown
            v-model="model"
            :options="options"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a Status"
            class="w-full md:w-14rem"
        />
        <small class="error">{{ errors[0] }}</small>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import type { Option } from '@/types/TSelect'
import Dropdown from 'primevue/dropdown'

export default {
    name: 'CSelect',
    components: {
        Dropdown
    },
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
.error {
    color: var(--text-color-third);
}
</style>
