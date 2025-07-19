import axios from 'axios';

const BASE_URL = `http://localhost://8090`; //API URI

const apiClient = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


const _get = async (url: string, config = {}) => {
    const response = await apiClient.get(url, config);
    return response;
};

const _post = async (url: string, data = {}, config = {}) => {
    const response = await apiClient.post(url, data, config);
    return response;
};


apiClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx will cause this function to trigger
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx will cause this function to trigger
    return Promise.reject(error);
});

apiClient.interceptors.request.use(function (request) {
    // Any status code that lie within the range of 2xx will cause this function to trigger
    return request;
}, function (error) {
    // Any status codes that falls outside the range of 2xx will cause this function to trigger
    return Promise.reject(error);
});

// Export API methods
export { _get, _post };