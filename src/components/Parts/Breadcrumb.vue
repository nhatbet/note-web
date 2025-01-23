<template>
    <nav aria-label="breadcrumb">
        <ul class="breadcrumb">
            <li
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="index"
                :class="{ 'breadcrumb-item': true, active: index === breadcrumbs.length - 1 }"
            >
                <!-- Hiển thị đường dẫn link nếu không phải là mục cuối -->
                <router-link v-if="index !== breadcrumbs.length - 1" :to="breadcrumb.path">
                    {{ breadcrumb.name }}
                </router-link>
                <!-- Hiển thị text nếu là mục cuối -->
                <span v-else>{{ breadcrumb.name }}</span>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Breadcrumb {
    name: string
    path: string
}

const route = useRoute()

// Tạo breadcrumbs từ các route đã match
const breadcrumbs = computed<Breadcrumb[]>(() => {
    return route.matched.map((match) => ({
        name: match.name || 'Unknown',
        path: match.path
    }))
})
</script>

<style>
.breadcrumb {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}
.breadcrumb-item {
    margin-right: 8px;
}
.breadcrumb-item.active {
    font-weight: bold;
    color: gray;
}
.breadcrumb-item::after {
    content: '/';
    margin-left: 8px;
}
.breadcrumb-item:last-child::after {
    content: '';
}
</style>
