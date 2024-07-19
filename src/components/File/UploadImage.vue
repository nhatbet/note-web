<template>
    <div>
        <cropper
            class="cropper"
            src="https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg"
            :stencil-props="{
                aspectRatio: 1 / 1
            }"
            @change="change"
        ></cropper>
    </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
    name: 'UploadImage',
    components: {
        Cropper
    },
    props: {},
    setup(props, { emit }) {
        const img = ref('https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg')

        return { img }
    },
    methods: {
        change({ coordinates, canvas }: any) {
            console.log(coordinates, canvas)
            console.log('changed');
            
        }
    }
}
</script>
<style lang="scss"></style>
