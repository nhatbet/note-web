import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useWindowSize } from 'vue-window-size'

export const useScreenSize = defineStore('ScreenSize', () => {
    const maxSM = 640;
    const maxMD = 768;
    const maxLG = 1024;
    const maxXL = 1280;
    const { width, height } = useWindowSize()

    const screenWidth = computed(() => width.value)
    const screenheight = computed(() => height.value)

    function widthIsMaxSM() {
        return screenWidth.value <= maxSM
    }

    function widthIsMaxMD() {
        return screenWidth.value <= maxMD
    }

    function widthIsMaxLG() {
        return screenWidth.value <= maxLG
    }

    function widthIsMaxXL() {
        return screenWidth.value <= maxXL
    }

    return { screenWidth, screenheight, widthIsMaxSM, widthIsMaxMD, widthIsMaxLG, widthIsMaxXL }
})
