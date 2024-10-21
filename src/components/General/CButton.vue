<template>
    <a
        class="text-base cursor-pointer transition-all inline-block text-center h-full"
        :class="[
            classes,
            { disable: disable },
            type === 4
                ? ''
                : type === 3
                  ? 'style-type-3'
                  : type === 2
                    ? 'style-type-2'
                    : type === 1
                      ? 'stype-type-1'
                      : 'border border-purple-700 hover:bg-purple-700 hover:text-white rounded-md'
        ]"
        @click="handleClick"
        :href="href"
    >
        <CIcon :name="icon" v-if="!!icon"></CIcon>
        <span>{{ text }}</span>
    </a>
</template>

<script lang="ts">
export default {
    name: 'CButton',
    props: {
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
    },
    methods: {
        handleClick(event: Event) {
            this.$emit('clickCButton')
        }
    }
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
</style>
