import BaseApi from '@/network/BaseApi'

export default () => ({
    index() {
        return BaseApi.get('articles')
    },

    store(data: any) {
        return BaseApi.setAuth().post('articles', data)
    },

    update(id: string, data: any) {
        return BaseApi.setAuth().put('articles/' + id, data)
    },

    show(id: string) {
        return BaseApi.get('articles/' + id)
    }
})
