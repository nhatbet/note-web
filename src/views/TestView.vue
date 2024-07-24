<template>
    <div class="w-full">
        <!-- <CSelectSearch v-model="tags" :multipleSelect="true" label="Tags" :options="selection.article_status"
            placeholder="Select tag"></CSelectSearch> -->
        <!-- <UploadImage></UploadImage> -->
        data
        <div>
            storage: {{ storage }}
        </div>
        <div>
            session: {{ session }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// import UploadImage from '@/components/File/UploadImage.vue'
const data = ref({
    user: {
        username: '0588a384-f854-49a6-ab23-42769cf4285b',
        email_verified: true
    },
    steps: [
        {
            date: '2024-07-12',
            point: 9000
        },
        {
            date: '2024-07-15',
            point: 7000
        },
        {
            date: '2024-07-17',
            point: 1111
        },
        {
            date: '2024-07-18',
            point: 45252
        }
    ]
})
// localStorage.setItem('STEP-COUNT-INFORMATION', JSON.stringify(data.value))
// sessionStorage.setItem('STEP-COUNT-INFORMATION', JSON.stringify(data.value))

const storage = localStorage.getItem('STEP-COUNT-INFORMATION')
const session = sessionStorage.getItem('STEP-COUNT-INFORMATION')
</script>
