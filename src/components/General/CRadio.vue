<template>
    <div :class="classes">
        <section v-for="(option, index) in options" :key="index" class="text-base" :clas="classes">
        <input
            class="mr-3 w-[20px] h-[20px]"
            type="radio"
            :name="name"
            :id="option.label"
            :value="option"
            :checked="modelValue === option.value"
            @change="$emit('update:modelValue', option.value)"
        />
        <label :for="option.label">{{ option.label }}</label>
    </section></div>
</template>

<script lang="ts" setup>
import type { Option } from '@/types/TSelect'

const props = defineProps({
    modelValue: {
        type: [String, Number, Array],
        default: ''
    },
    classes: {
        type: [String, Array],
        default: ''
    },
    options: {
        type: null,
        default: [] as Option[]
    },
    name: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
section {
    display: flex;
    align-items: center;
    margin-top: 1rem;
}
</style>
