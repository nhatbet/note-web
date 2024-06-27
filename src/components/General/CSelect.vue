<template>
    <div :class="[classes]">
        <label class="block mb-2 text-sm">
            <span class="text-base">{{ label }}</span>
            <select
                class="block w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:border-purple-400"
                @change="model = $event.target.value"
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
            <small class="text-sm text-rose-600">{{ errors[0] }}</small>
        </label>
    </div>
</template>

<script lang='ts'>
import { computed, ref } from 'vue'

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
            default: false
        },
        options: {
            type: Array,
            default: []
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
    methods: {},
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
</style>
