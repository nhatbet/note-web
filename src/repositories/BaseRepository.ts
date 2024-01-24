import APIConfig from '@/network/APIConfig';

export default class BaseRepository {

    public controller = '';

    getByID(id: number) {
        return APIConfig.get(`${this.controller}?id=${id}`);
    }
}
