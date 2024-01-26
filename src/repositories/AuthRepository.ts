import APIConfig from '@/network/APIConfig';
import BaseRepository from '@/repositories/BaseRepository';

class AuthRepository extends BaseRepository {

    constructor() {
        super();
        this.controller = '';
    }

    public register(payload: any) {
        return APIConfig.post(`${this.controller}/register`, payload);
    }

    public login(payload: any) {
        return APIConfig.post(`${this.controller}/login`, payload);
    }

    public logout() {
        return APIConfig.post(`${this.controller}/logout`);
    }

    public getUrlsGoogleSignIn() {
        return APIConfig.get(`${this.controller}/url-sign-in/google`);
    }

    public loginWithProvider(provider: string, params: any) {
        return APIConfig.get(`${this.controller}/login/${provider}/callback`, { params: params });
    }
}

export default new AuthRepository();
