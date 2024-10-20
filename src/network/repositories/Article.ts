import BaseApi from '@/network/BaseApi'

export default () => ({
    index(params: any) {
        return BaseApi.get('articles', params)
    },

    store(data: any) {
        return BaseApi.setAuth().setNotify().post('articles', data)
    },

    update(id: string, data: any) {
        return BaseApi.setAuth().setNotify().put('articles/' + id, data)
    },

    show(id: string) {
        return BaseApi.get('articles/' + id)
    },

    delete(id: string) {
        return BaseApi.setAuth().setNotify().delete('articles/' + id)
    }
})
