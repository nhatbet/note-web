<template>
    <div class="container">
        <h2>Upload and Crop Image</h2>

        <!-- Input để chọn ảnh -->
        <div class="upload-container">
            <input type="file" @change="onFileChange" accept="image/*" />
        </div>

        <!-- Hiển thị ảnh gốc để crop -->
        <div v-if="imageUrl" class="crop-container">
            <img ref="image" :src="imageUrl" alt="Image for Cropping" class="image-to-crop" />
        </div>

        <!-- Nút crop ảnh -->
        <button v-if="cropper" @click="cropImage" class="btn">Crop Image</button>

        <!-- Hiển thị ảnh đã crop -->
        <div v-if="croppedImage" class="preview-container">
            <h3>Cropped Image Preview:</h3>
            <img :src="croppedImage" alt="Cropped Image" class="cropped-preview" />
        </div>

        <!-- Nút submit ảnh -->
        <button v-if="croppedImage" @click="submitImage" class="btn submit-btn">
            Submit Cropped Image
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const imageUrl = ref<string | null>(null)
const cropper = ref<Cropper | null>(null)
const croppedImage = ref<string | null>(null)

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
                const imageElement = document.querySelector('img') as HTMLImageElement
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

const cropImage = () => {
    if (cropper.value) {
        const canvas = cropper.value.getCroppedCanvas()
        croppedImage.value = canvas.toDataURL('image/png')
    }
}

const submitImage = () => {
    if (!croppedImage.value) return

    const blob = dataURLtoBlob(croppedImage.value)

    const formData = new FormData()
    formData.append('image', blob, 'cropped-image.png')

    fetch('/upload-endpoint', {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            alert('Image uploaded successfully!')
        })
        .catch((error) => {
            console.error('Error uploading image:', error)
        })
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

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}

.upload-container {
    margin-top: 20px;
    margin-bottom: 20px;
}

h2 {
    font-family: 'Roboto', sans-serif;
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 20px;
}

.crop-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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

button {
    margin-top: 20px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #2980b9;
}

.preview-container {
    margin-top: 30px;
    text-align: center;
}

.cropped-preview {
    max-width: 300px;
    margin-top: 10px;
    border: 2px solid #2ecc71;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-btn {
    background-color: #2ecc71;
}

.submit-btn:hover {
    background-color: #27ae60;
}
</style>
