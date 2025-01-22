<template>
    <div class="article-item">
        <img :src="getImageSrc" alt="article.title" @click="gotoDetail(article.id)" />

        <div class="article-content">
            <h3>{{ article.title }}</h3>
            <p>{{ article.content }}</p>
        </div>
        <div class="user-info">
            <img class="avatar" src="/images/default-avatar.png" alt="avatar" />
            <div>
                <p>name</p>
                <p>12 th12 2024 • 2 min read</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { extractFirstImageUrl } from '@/utils/functions'
import { computed } from 'vue'
import type { Article } from '@/types/TArticle'
import { useRouter } from 'vue-router'

const props = defineProps<{
    article: Article
}>()

const router = useRouter();
const getImageSrc = computed(() => {
    return extractFirstImageUrl(props.article.content) ?? '/images/default-article.png'
})

const gotoDetail = (id: number) => {
    router.push({ name: 'VArticleShow', params: { id } })
}
</script>

<style lang="scss" scoped>
.article-item {
    width: calc(33.333% - 20px);
    img {
        cursor: pointer;
        width: 100%;
        aspect-ratio: 1.5 / 1;
        object-fit: cover;
    }
}

.article-content {
    h3 {
        font-size: 2rem;
        font-weight: 700;
    }
    p {
        font-size: 1.6rem;
        display: -webkit-box; /* Thêm hiển thị dạng box linh hoạt */
        -webkit-line-clamp: 3; /* Giới hạn tối đa 3 dòng hiển thị */
        -webkit-box-orient: vertical; /* Hiển thị theo chiều dọc */
        overflow: hidden; /* Ẩn nội dung vượt quá */
        text-overflow: ellipsis; /* Thêm dấu "..." ở cuối nếu tràn */
    }
}

.user-info {
    display: flex;
    .avatar {
        width: 36px;
        height: 36px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 7px;
    }
    div {
        line-height: 1.3em;
        font-size: 1.3rem;
    }
}
</style>
