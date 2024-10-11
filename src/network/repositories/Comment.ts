import BaseApi from '@/network/BaseApi'

export default () => ({
    createForArticle(articleId: any, data: any) {
        return BaseApi.setAuth().setNotify().post(`articles/${articleId}/comments`, data)
    },

    update(id: any, data: any) {
        return BaseApi.setAuth().put('comments/' + id, data)
    },

    delete(id: any) {
        return BaseApi.setAuth().delete('comments/' + id)
    },

    getByArticleId(articleId: any, page: number) {
        return BaseApi.setAuth().setNotify(false).get('comments/get-by-article', { article_id: articleId, page })
    },

    getCountByArticleId(articleId: any) {
        return BaseApi.setAuth().setNotify(false).get('comments/articles-count', { article_id: articleId })
    },

    index(params: any) {
        // parent_id
        return BaseApi.setNotify(false).get('comments', params)
    },

    report(id: number, data: any) {
        return BaseApi.setNotify(false).get('comments/' + id + '/report', data)
    }
})
