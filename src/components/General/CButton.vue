<template>
    <a
        class="text-base cursor-pointer transition-all inline-block text-center"
        :class="[
            classes,
            disabled ? 'opacity-50 cursor-not-allowed' : '',
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
        disabled: {
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
    color: #1a8917;
    border-bottom: 1px solid transparent;
    &:hover {
        border-bottom: 1px solid black;
    }
}
.stype-type-1 {
    background-color: #1a8917;
    color: white;
}
.style-type-2 {
    border: 1px solid black;
}

.radius-cycle {
    border-radius: 99em;
}
</style>
