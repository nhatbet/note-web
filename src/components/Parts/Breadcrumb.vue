<template>
    <nav aria-label="breadcrumb">
        <ul class="breadcrumb">
            <li
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="index"
                :class="{ 'breadcrumb-item': true, active: index === breadcrumbs.length - 1 }"
            >
                <router-link v-if="index !== breadcrumbs.length - 1" :to="breadcrumb.path">
                    <span class="flex items-center">
                        <CIcon :name="breadcrumb.icon" class="mr-1"></CIcon> <span>{{ breadcrumb.name }}</span>
                    </span>
                </router-link>
                <span v-else>
                    <span class="flex items-center">
                        <CIcon :name="breadcrumb.icon" class="mr-1"></CIcon> <span>{{ breadcrumb.name }}</span>
                    </span>
                </span>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CIcon from '../General/CIcon.vue'

interface Breadcrumb {
    name: string
    path: string
    icon?: string
}

const route = useRoute()

const breadcrumbs = computed<Breadcrumb[]>(() => {
    return route.matched.map((match) => ({
        name: match.meta.breadcrumb || '', // Lấy title từ meta
        path: match.path,
        icon: match.meta.icon || '' 
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
    display: flex;
    align-items: center;
    margin-right: 8px;
}
.breadcrumb-item.active {
    font-weight: bold;
    color: gray;
}
.breadcrumb-icon {
    margin-right: 5px;
}
.breadcrumb-item::after {
    content: '/';
    margin-left: 8px;
}
.breadcrumb-item:last-child::after {
    content: '';
}
</style>
