<template>
    <div :class="[classes]">
        <label class="label" for="">{{ label }}</label>
        <MultiSelect
            name="city"
            :options="options"
            optionLabel="label"
            optionValue="value"
            filter
            placeholder="Select Cities"
            :maxSelectedLabels="3"
            class="w-full"
        />
        <small class="error">{{ errors[0] }}</small>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import type { Option } from '@/types/TSelect'
import MultiSelect from 'primevue/multiselect';

export default {
    name: 'CSelect',
    components: {
        MultiSelect
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
            type: [String, Number, Array],
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
