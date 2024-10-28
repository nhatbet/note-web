import BaseApi from '@/network/BaseApi'

export default () => ({
    index(params: any) {
        return BaseApi.setAuth().get('notifications', params)
    },
})
