import BaseApi from '@/network/BaseApi'

export default () => ({
    saveArticle(articleId: number) {
        return BaseApi.setAuth().post(`articles/${articleId}/save`)
    },

    unSaveArticle(articleId: number) {
        return BaseApi.setAuth().post(`articles/${articleId}/unsave`)
    },

    getByArticle(articleId: number) {
        return BaseApi.setAuth().get(`articles/${articleId}/save-status`)
    }
})
