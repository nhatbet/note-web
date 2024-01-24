import axios from 'axios';

const baseURL = import.meta.env.VITE_HOST + '/api';

let api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

api.interceptors.response.use((response) => {
    const status = response.data.status;
    const data = response.data;
    if (status == '200') {
        return data;
    }

    return Promise.reject(data);
}, (error) => {
    console.log('error', error);

    if (error && error.response && [401, 403].includes(error.response.status)) {
        // handle error
    }
    return Promise.reject(error);
});

export default api;
