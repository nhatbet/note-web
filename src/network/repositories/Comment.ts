import BaseApi from '@/network/BaseApi'

export default () => ({
    createForArticle(articleId: any, data: any) {
        return BaseApi.setAuth().post(`articles/${articleId}/comments`, data)
    },

    update(id: any, data: any) {
        return BaseApi.setAuth().put('comments/' + id, data)
    },

    delete(id: any) {
        return BaseApi.setAuth().delete('comments/' + id)
    }
})
