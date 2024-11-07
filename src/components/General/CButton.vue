<template>
    <Button severity="secondary" class="custom-button" @click="handleClick" :class="classes">
    {{ text }}
        <CIcon :name="icon" v-if="!!icon"></CIcon>
    </Button>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'

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
    }
})
const emit = defineEmits(['clickCButton'])
const handleClick = (event: Event) => {
    emit('clickCButton')
}
</script>

<style lang="scss" scoped>
.style-type-3 {
    line-height: 12px;
    color: var(--text-color-second);
    border-bottom: 1px solid transparent;
    &:hover {
        border-bottom: 1px solid var(--text-color-second);
    }
}
.stype-type-1 {
    background-color: var(--text-color-second);
    color: white;
}
.style-type-2 {
    border: 1px solid var(--border-color-primary);
}

.radius-cycle {
    border-radius: 99em;
}

.disable {
    opacity: 0.3;
    cursor: not-allowed;
}

.custom-button {
  font-size: 1.6rem;
}
</style>
