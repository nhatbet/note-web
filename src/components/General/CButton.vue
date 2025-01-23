<template>
    <Button :severity="severity" class="custom-button" @click="handleClick" :variant="variant" :class="classes">
    {{ text }}
        <!-- <CIcon :name="icon" v-if="!!icon"></CIcon> -->
    </Button>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import type { PropType } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    classes: {
        type: String,
        default: ''
    },
    href: {
        type: String,
        default: '#'
    },
    disable: {
        type: Boolean,
        default: false
    },
    type: {
        type: Number,
        default: 0
    },
    severity: {
        type: String,
        default: 'secondary'
    },
    variant: {
        type: String as PropType<'undefined' | 'text' | 'outlined'>,
        default: 'undefined'
    }
})
const emit = defineEmits(['clickCButton'])
const handleClick = (event: Event) => {
    emit('clickCButton')
}
</script>

<style lang="scss" scoped>
.disable {
    opacity: 0.3;
    cursor: not-allowed;
}

</style>
