import BaseApi from '@/network/BaseApi';

export default () => ({

    loginWithProvider(data: any) {
        return BaseApi.post('login/provider', data)
    }
})
