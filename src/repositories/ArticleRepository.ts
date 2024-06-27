import APIConfig from '@/network/APIConfig';
import BaseRepository from '@/repositories/BaseRepository';

class ArticleRepository extends BaseRepository {

    constructor() {
        super();
        this.controller = '';
    }

    public store(payload: any) {
        return APIConfig.post(`${this.controller}/articles`, payload);
    }
}

export default new ArticleRepository();
