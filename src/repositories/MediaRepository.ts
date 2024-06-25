import APIConfig from '@/network/APIConfig'
import BaseRepository from '@/repositories/BaseRepository'

class MediaRepository extends BaseRepository {
    constructor() {
        super()
        this.controller = ''
    }

    public upload(payload: any) {
        return APIConfig.post(`${this.controller}/upload`, payload)
    }
}

export default new MediaRepository()
