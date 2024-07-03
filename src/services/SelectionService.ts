import { useSelectionStore } from '@/stores/selection'
import { onMounted, reactive } from 'vue'
import BaseApi from '@/network/BaseApi'

export const SelectionService = () => {
    const selectionStore = useSelectionStore()
    const selectionData = reactive(selectionStore.data)

    const fetchSelection = async () => {
        await BaseApi.get('selection')
            .then((res: any) => {
                selectionData.article_status = res.data.article_status
                selectionStore.setData(selectionData)
            })
            .catch((err: any) => {
                console.log('err:', err)
            })
    }

    onMounted(async () => {
        await fetchSelection()
    })

    return selectionData
}
