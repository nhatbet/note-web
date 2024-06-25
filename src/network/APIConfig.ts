import axios from 'axios'
import LocalStorageService from '@/services/LocalStorageService'
import { useAuthStore } from '@/stores/auth'

const baseURL = import.meta.env.VITE_HOST + '/api'

const api = axios.create({
    baseURL: baseURL,
    timeout: 7000,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Authorization: LocalStorageService.getBearerToken()
    }
})
// headers['Content-Type'] = 'application/json';
api.interceptors.response.use(
    (response) => {
        const status = response.data.status
        const data = response.data
        if (status == '200') {
            return data
        }

        return Promise.reject(data)
    },
    (error) => {
        console.log('error', error)

        if (error && error.response && [401, 403].includes(error.response.status)) {
            // handle error
            if (error.response.status) {
                switch (error.response.status) {
                    case 401:
                        const authStore = useAuthStore()
                        authStore.setIsAuthenticated(true)
                        break
                    case 403:
                        // handle permission
                        break
                    default:
                    // code block
                }
            }
        }
        return Promise.reject(error)
    }
)

export default api
