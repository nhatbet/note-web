import BaseApi from '@/network/BaseApi';

export default () => ({
    login(payload: any) {
        return BaseApi.post('login', payload)
    },

    logout() {
        return BaseApi.setAuth().post('logout')
    },

    loginWithGoogle(data: any) {
        // access_token
        return BaseApi.post('login/google', data)
    }
})
