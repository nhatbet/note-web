import APIConfig from '@/network/APIConfig'
import BaseRepository from '@/repositories/BaseRepository'

class SelectionRepository extends BaseRepository {
    constructor() {
        super()
        this.controller = ''
    }

    public index() {
        return APIConfig.get(`${this.controller}/selection`)
    }
}

export default new SelectionRepository()
