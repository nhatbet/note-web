import BaseApi from '@/network/BaseApi'
import { defineStore } from 'pinia'

export const useSelectionStore = defineStore('selection', {
    state: (): {
        data: null | {
            article_status: []
            categories: []
        }
    } => ({
        data: null
    }),

    actions: {
        setData(data: any) {
            this.data = data
        },
        async getData() {
            if (this.data == null) {
                await BaseApi.get('selection')
                    .then((res: any) => {
                        this.setData(res.data)
                    })
                    .catch((err: any) => {
                        console.log('err:', err)
                    })
            }

            return this.data
        }
    }
})
