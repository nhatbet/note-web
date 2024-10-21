import BaseApi from '@/network/BaseApi'

export default () => ({
    upload(collection: string, file: any) {
        return BaseApi.setAuth().post('upload', { collection: collection, file: file })
    },

    getProfile() {
        return BaseApi.setAuth().get('user/profile')
    },

    updateProfile(data: any) {
        return BaseApi.setAuth().post('user/profile', data)
    }
})
