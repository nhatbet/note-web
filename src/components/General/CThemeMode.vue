<template>
    <div :class="classes" class="flex items-center">
        <input id="toggle" class="toggle" @change="toggleTheme()" type="checkbox" v-model="theme" />
    </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/stores/theme'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const props = defineProps({
    classes: {
        type: [String, Array],
        default: ''
    }
})
const theme = ref(false)
const themeStore = useThemeStore()
const { activeTheme } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
if (activeTheme.value === 'dark') {
    theme.value = false
} else {
    theme.value = true
}
</script>

<style lang="scss" scoped>
// magic
.toggle {
    --size: 1.4rem;

    appearance: none;
    outline: none;
    cursor: pointer;

    width: var(--size);
    height: var(--size);
    box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
    border-radius: 999px;
    color: hsl(240, 100%, 95%);

    transition: all 500ms;

    &:checked {
        --ray-size: calc(var(--size) * -0.4);
        --offset-orthogonal: calc(var(--size) * 0.65);
        --offset-diagonal: calc(var(--size) * 0.45);

        transform: scale(0.75);
        color: hsl(40, 100%, 50%);
        box-shadow:
            inset 0 0 0 var(--size),
            calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
            var(--offset-orthogonal) 0 0 var(--ray-size),
            0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
            0 var(--offset-orthogonal) 0 var(--ray-size),
            calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
            var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
            calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
            var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);
    }
}
</style>
