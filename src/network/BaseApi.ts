import axios from "axios";
import LocalStorageService from '@/services/LocalStorageService'
import { useAuthStore } from '@/stores/auth'

class BaseApi {
    public baseURL: string = import.meta.env.VITE_HOST + '/api'
    public method: any = null;
    public timeout: number = 7000;
    public headers: any = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'No auth'
    }
    public params: object | null = null;
    public data: any = null;
    public url: any = null

    setHeader(headers: object) {
        this.headers = headers;

        return this;
    }

    resetHeader() {
        this.headers = {};

        return this;
    }

    setAuth() {
        this.headers['Authorization'] = LocalStorageService.getBearerToken();

        return this;
    }

    post(url: string, data: any = null) {
        this.headers['Content-Type'] = 'multipart/form-data';
        this.url = url;
        this.method = 'post';
        if (data) {
            this.data = data;
        }

        return this.execute();
    }

    get(url: string, params: any = null) {
        this.url = url;
        if (params) {
            this.params = params;
        }
        this.method = 'get';

        return this.execute();
    }

    put(url: string, data: any = null) {
        this.url = url;
        this.method = 'put';

        if (data) {
            this.data = data;
        }

        return this.execute();
    }

    execute() {
        return new Promise(
            (resolve, reject) => {
                axios({
                    baseURL: this.baseURL,
                    method: this.method,
                    url: this.url,
                    timeout: this.timeout,
                    headers: this.headers,
                    params: this.params,
                    data: this.data
                }).then(async response => {
                    const status = response.data?.status
                    const data = response.data
                    switch (status) {
                        case 200:
                            resolve(response.data);
                            break
                        case 401:
                            const authStore = useAuthStore()
                            authStore.setIsAuthenticated(false)
                            break
                        case 403:
                        //TODO: handle permission

                        default:
                        // code block
                    }

                    reject(data);
                }).catch(error => {
                    reject(error);
                });
            }
        )
    }
}

export default new BaseApi();
