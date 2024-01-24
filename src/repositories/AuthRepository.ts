import APIConfig from '@/network/APIConfig';
import BaseRepository from '@/repositories/BaseRepository';

class AuthRepository extends BaseRepository {

    constructor() {
        super();
        this.controller = '';
    }

    public login(payload: any) {
        return APIConfig.post(`${this.controller}/login`, payload);
    }
}

export default new AuthRepository();
