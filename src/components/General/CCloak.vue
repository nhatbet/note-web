<template>
    <div class="cloak" :class="{ hidden: !visible }" @click="handleClick"></div>
</template>

<script lang='ts'>
export default {
    name: 'CCloak',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        return {}
    },
    methods: {
        handleClick(event: Event) {
            this.$emit('clickCloak')
        }
    }
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
        background: rgba(189, 189, 189, 0.3);
    }
}
</style>
