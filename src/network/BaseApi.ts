import axios from "axios";
import LocalStorageService from '@/services/LocalStorageService'
import type { ResponseType } from "@/types/TResponse";
import { useToast } from "primevue/usetoast";
class BaseApi {
    public baseURL: string = import.meta.env.VITE_HOST + '/api'
    public method: any = null;
    public timeout: number = 10000; // 10s
    public headers: any = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Cache-Control': 'no-cache, no-store, must-revalidate',
        // 'Pragma': 'no-cache',
        // 'Expires': '0',
        'Authorization': 'No auth'
    }
    public params: object | null = null;
    public data: any = null;
    public url: any = null;
    public notify: boolean = false;

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

    setNotify(status = true) {
        this.notify = status;

        return this;
    }

    // Thêm onUploadProgress vào đây
    post(url: string, data: any = null, onUploadProgress: (progressEvent: any) => void = () => {}) {
        this.headers['Content-Type'] = 'multipart/form-data';
        this.url = url;
        this.method = 'post';
        if (data) {
            this.data = data;
        }

        return this.execute(onUploadProgress);
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

    delete(url: string) {
        this.url = url;
        this.method = 'delete';

        return this.execute();
    }

    // Thay đổi hàm execute để nhận thêm onUploadProgress
    execute(onUploadProgress: (progressEvent: any) => void = () => {}) {
        return new Promise(
            (resolve, reject) => {
                axios({
                    baseURL: this.baseURL,
                    method: this.method,
                    url: this.url,
                    timeout: this.timeout,
                    headers: this.headers,
                    params: this.params,
                    data: this.data,
                    onUploadProgress // Thêm onUploadProgress vào đây
                }).then(async response => {
                    const data = response.data as ResponseType
                    const status = data?.status
                    const message = data?.message
                    const toast = useToast();
                    switch (status) {
                        case 200:
                            resolve(data);
                            if (this.notify) {
                                toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
                            }
                            break
                        case 401:
                            // LocalStorageService.clearAuthInfo()
                            break;
                        case 403:
                            break;
                        //TODO: handle permission

                        default:
                            if (this.notify) {
                                toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
                            }
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
