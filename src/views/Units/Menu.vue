<template>
    <div class="panel-menu select-none text-lg">
        <div class="menu-item">
            <MenuItem
                v-for="(item, index) in menuTree"
                :key="index"
                :item="item"
                :isFirstItem="index == 0"
                level="1"
                :classes="item.classes"
            ></MenuItem>
        </div>
        <div class="bottom-panel flex items-center w-full cursor-pointer" @click="logout">
            <CIcon name="logout" class="px-5"></CIcon>
            <span class="pl-2">Logout</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useSelectionStore } from '@/stores/selection'
import type { ItemMenu } from '@/types/TMenu'
import type { Option } from '@/types/TSelect'
import MenuItem from './MenuItem.vue'
import Api from '@/network/Api'
import LocalStorageService from '@/services/LocalStorageService'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useConfirm } from '@/useConfirm'

const confirm = useConfirm()
const authStore = useAuthStore()
const router = useRouter()
const selectionStore = useSelectionStore()
const menuTree: any = ref(null)
onMounted(async () => {
    const selection = await selectionStore.getData()
    const itemsCategory = selection?.categories?.map((category: Option) => {
        return {
            label: category.label,
            color: category.meta?.color,
            toRoute: {
                name: 'VArticleIndex',
                query: {
                    categories_id: [category.value],
                    name: 'article_category_' + category.value
                }
            }
        }
    }) as ItemMenu[]
    const itemsTag = selection?.tags?.map((tag: Option) => {
        let labelIcon = tag.meta?.icon ? tag.meta?.icon + '-' : ''
        return {
            label: labelIcon + tag.label,
            icon: 'tag',
            toRoute: {
                name: 'VArticleIndex',
                query: {
                    tags_id: [tag.value],
                    name: 'article_tag_' + tag.value
                }
            }
        }
    }) as ItemMenu[]
    menuTree.value = [
        {
            label: 'Topics',
            icon: 'layer-group',
            toRoute: {
                name: 'VArticleIndex',
                query: {
                    name: 'VArticleIndex'
                }
            }
        },
        {
            label: 'My Posts',
            icon: 'user',
            toRoute: {
                name: 'VMyArticle',
                query: {
                    name: 'VMyArticle'
                }
            }
        },
        {
            label: 'Create Post',
            icon: 'plus',
            toRoute: {
                name: 'VArticleCreate',
                query: {
                    name: 'VArticleCreate'
                }
            }
        },
        {
            label: 'Filter',
            icon: 'filter'
        },
        {
            label: 'User',
            icon: 'user',
            toRoute: {
                name: 'VProfile',
                query: {
                    name: 'VProfile'
                }
            }
        },
        {
            label: 'More',
            icon: 'vertical-dot',
            classes: 'mb-[6px]'
            // toRoute: 'VHome'
        },
        {
            label: 'CATEGORIES',
            icon: 'category',
            children: itemsCategory,
            isShowSubItem: true
        },
        {
            label: 'TAGS',
            children: itemsTag,
            isShowSubItem: true
        },
        {
            label: 'CHANNELS',
            children: [{ label: 'Share Chat', icon: 'chat' }],
            isShowSubItem: true
        }
    ]
})

const logout = async () => {
    const result = await confirm('Are you sure you want to log out?')
    if (result) {
        await Api.auth.logout().finally(() => {
            LocalStorageService.clearAuthInfo()
            authStore.setAuthenticated(false)
            authStore.setProfile()
            router.push({ name: 'VHome' })
        })
    }
}
</script>
<style lang="scss" scoped>
.panel-menu {
    position: sticky;
    top: 0;
    height: calc(100vh - 56px);
    position: relative;

    .menu-item {
        padding: 2rem 0.5rem 1rem 2rem;
        overflow-y: scroll;
        overflow-x: hidden;
        height: calc(100% - 50px);
        scrollbar-color: rgba(0, 0, 0, 0) transparent;
    }

    .bottom-panel {
        background-color: var(--bg-color-primary);
        height: 50px;
        position: absolute;
        bottom: 0;
        box-shadow: 0 0px 6px white;
    }
}

@media (max-width: 768px) {
    .panel-menu {
        height: 100vh;
        .menu-item {
            overflow: auto;
            padding: 2rem;
        }
    }
}
</style>
