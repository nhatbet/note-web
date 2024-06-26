import { defineStore } from 'pinia'
import SelectionRepository from '@/repositories/SelectionRepository'

export const useSelectionStore = defineStore('selection', {
    state: () => ({
        data: {
            article_status: []
        }
    }),

    actions: {
        setData(data: any) {
            this.data = data
        }
    }
})
