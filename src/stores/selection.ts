import { defineStore } from 'pinia'

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
