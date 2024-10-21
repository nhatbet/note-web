<template>
    <div class="container">
        <h2>Upload and Crop Image</h2>

        <div class="upload-container" v-if="!imageUrl">
            <input type="file" @change="onFileChange" accept="image/*" />
            <span>Click or drop image to here!</span>
        </div>

        <div class="img mx-auto" v-if="imageUrl">
            <img ref="image" class="crop-img" :src="imageUrl" alt="Image for Cropping" />
        </div>

        <div class="flex justify-between mt-[20px]" v-if="imageUrl">
            <CButton
                text="Save"
                classes="px-[15px] h-[30px] btn"
                @clickCButton="cropImage()"
                :type="1"
            ></CButton>
            <CButton text="Clear" classes="px-[15px] btn" @clickCButton="clear" :type="2"></CButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import CButton from './CButton.vue'
import Api from '@/network/Api'

const imageUrl = ref<string | null>(null)
const cropper = ref<Cropper | null>(null)
const croppedImage = ref<string | null>(null)
const emit = defineEmits(['upload'])

const onFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            imageUrl.value = reader.result as string

            nextTick(() => {
                if (cropper.value) {
                    cropper.value.destroy()
                }
                const imageElement = document.querySelector('.crop-img') as HTMLImageElement
                cropper.value = new Cropper(imageElement, {
                    aspectRatio: 1,
                    viewMode: 1
                })
            })
        }
    } else {
        alert('Please select a valid image file.')
        imageUrl.value = null
    }
}

const cropImage = async () => {
    if (cropper.value) {
        const canvas = cropper.value.getCroppedCanvas()
        croppedImage.value = canvas.toDataURL('image/png')
    }

    if (!croppedImage.value) return
    const blob = dataURLtoBlob(croppedImage.value)

    const file = new File([blob], 'avatar.png', { type: 'image/png' })
    await Api.user
        .upload('avatar', file)
        .then((res: any) => {
            // console.log('res', res)
            emit('upload', res.data.original_url)
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const clear = () => {
    imageUrl.value = null
    cropper.value = null
    croppedImage.value = null
}

const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}
</script>

<style scoped lang="scss">
.container {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    background-color: var(--bg-color-primary);
    box-shadow: var(--shadow-color-primary) 0px 2px 8px;
    padding: 20px;
}

.upload-container {
    border: 2px dashed var(--border-color-primary);
    border-radius: 3px;
    height: 200px;
    position: relative;

    input {
        cursor: pointer;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: transparent;
    }

    span {
        cursor: pointer;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

h2 {
    font-family: 'Roboto', sans-serif;
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: left;
}

.crop-container {
    margin-top: 20px;
    border: 2px dashed #3498db;
    padding: 10px;
    border-radius: 10px;
    background-color: #ecf0f1;
}

.image-to-crop {
    max-width: 100%;
    max-height: 400px;
    border-radius: 10px;
}
.cropper-bg {
    background: none !important;
    background-image: none !important;
}

.btn {
    border-radius: 3px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
