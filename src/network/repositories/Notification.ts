import BaseApi from '@/network/BaseApi'

export default () => ({
    index(params: any) {
        return BaseApi.setAuth().get('notifications', params)
    },
    countNotReadYet() {
        return BaseApi.setAuth().get('notifications/count-not-read-yet')
    },
})
