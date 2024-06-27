import { useSelectionStore } from '@/stores/selection'
import { onMounted, reactive } from 'vue'
import SelectionRepository from '@/repositories/SelectionRepository'

export const SelectionService = () => {
    const selectionStore = useSelectionStore()
    const selectionData = reactive(selectionStore.data)

    const fetchSelection = async () => {
        await SelectionRepository.index()
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
