import axios from "axios";
import LocalStorageService from '@/services/LocalStorageService'

class BaseApi {
    public baseURL: string = import.meta.env.VITE_HOST + '/api'
    public method: any = null;
    public timeout: number = 7000;
    public headers: any = {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'No auth'
    }
    public params: string | null = null;
    public data: any = null;
    public url: any = null

    setHeader(headers: object) {
        this.headers = headers

        return this;
    }

    setAuth() {
        this.headers['Authorization'] = LocalStorageService.getBearerToken();

        return this;
    }

    post(url: string, data: any) {
        this.url = url;
        this.data = data;
        this.method = 'post';

        return this.execute();
    }

    get(params: any) {
        if (params) {
            this.params = params;
        }
        this.method = 'get';

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
                    if (response.data?.status == 200) {
                        resolve(response.data);
                    } else {
                        reject(response.data);
                    }
                }).catch(error => {
                    reject(error);
                });
            }
        )
    }
}

export default new BaseApi();
