<template>
    <div :class="classes">
        <label class="block mb-1">
            {{ label }}
            <textarea
                class="block w-full p-3 h-[100px]"
                v-model="inputValue"
                @input="$emit('update:modelValue', inputValue)"
            ></textarea>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    classes: {
        type: [String, Array],
        default: ''
    },
    label: {
        type: String,
        default: ''
    }
})

const inputValue = ref(props.modelValue)

// Đồng bộ giá trị giữa modelValue và inputValue
watch(
    () => props.modelValue,
    (newValue) => {
        inputValue.value = newValue
    }
)
</script>

<style lang="scss" scoped>
textarea {
    border: 1px solid var(--border-color-primary);
    background-color: var(--bg-color-primary);
    box-shadow: var(--shadow-color-primary) 0px 2px 68x;
}
</style>
