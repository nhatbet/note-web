import BaseApi from '@/network/BaseApi'

export default () => ({
    index(params: any) {
        return BaseApi.get('articles', params)
    },

    store(data: any) {
        return BaseApi.setAuth().post('articles', data)
    },

    update(id: string, data: any) {
        return BaseApi.setAuth().put('articles/' + id, data)
    },

    show(id: number) {
        return BaseApi.get('articles/' + id)
    },

    delete(id: string) {
        return BaseApi.setAuth().delete('articles/' + id)
    }
})
