import Api from '@/network/Api'
import { defineStore } from 'pinia'
import type { SelectionType } from '@/types/TSelect'

export const useSelectionStore = defineStore('selection', {
    state: (): {
        data: SelectionType
    } => ({
        data: null
    }),

    actions: {
        setData(data: any) {
            this.data = data
        },
        async getData() {
            if (this.data == null) {
                await Api.selection.index()
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
