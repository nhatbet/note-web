<template>
    <div class="cloak" :class="{ hidden: !canShow }" @click="canShow = false"></div>
</template>

<script lang='ts'>
import { computed } from 'vue'
export default {
    name: 'CCloak',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const canShow = computed({
            get: () => props.modelValue,
            set: (value) => {
                emit('update:modelValue', value)
            }
        })

        return { canShow }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.cloak {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
}
@media (max-width: 768px) {
    .cloak {
        // background-color: var(--shadow-color-primary);
    }
}
</style>
