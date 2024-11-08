<template>
    <div class="flex flex-col gap-1" :class="classes">
        <Password v-model="model" fluid :feedback="feedback" :placeholder="placeholder">
            <template #header>
                <div class="font-semibold text-base mb-4">Pick a password</div>
            </template>
            <template #footer>
                <Divider />
                <ul class="pl-2 ml-2 my-0 leading-normal text-base">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                </ul>
            </template>
        </Password>
        <Message v-if="errors.length > 0" severity="error" size="small" variant="simple">
            {{ errors[0] }}
        </Message>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'
import Password from 'primevue/password'

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
    },
    feedback: {
        type: Boolean,
        default: false
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

<style lang="scss" scoped>
::v-deep .p-password input {
    font-size: 1.6rem;
}
</style>
