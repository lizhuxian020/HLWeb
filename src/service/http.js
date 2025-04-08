import axios from "axios";

const service = axios.create({})

service.interceptors.request.use(config => {
    console.log('httpRequest' + config);
    return config;
}, (error) => {
    console.log('httpRequestError' + error);
    return Promise.reject(error);
})

service.interceptors.response.use((response) => {
    console.log('httpResponse' + JSON.stringify(response.data));
    if (response.status === 200 && response.data.code === 0) {
        return response.data;
    }
    if (response.data.message) {
        alert(response.data.message);
    }

}, (error) => {
    console.log('httpResponseError' + error);
    return Promise.reject(error);
})

export default service;