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
    },

    getByArticleId(articleId: any) {
        return BaseApi.get('comments/get-by-article', { article_id: articleId })
    },

    index(params: any) {
        // parent_id
        return BaseApi.get('comments', params)
    }
})
