import axios from "axios";
import {ElMessage} from "element-plus";

const service = axios.create({})

service.interceptors.request.use(config => {
    console.log('------HTTP_REQUEST : ' + config.method + ' : ' + config.url + '\n' + 'Param: ' + (config.data ? JSON.stringify(config.data) : ""));
    return config;
}, (error) => {
    console.log('httpRequestError' + error);
    return Promise.reject(error);
})

service.interceptors.response.use((response) => {
    console.log('------HTTP_RESPONSE : ' + response.config.method + ' : ' + response.config.url + '\n' + 'Param: ' + (response.config.data ? JSON.stringify(response.config.data) : "") + '\n' + 'Response: ' + (JSON.stringify(response.data)) );
    if (response.status === 200 && response.data.code === 0) {
        return response.data;
    }
    if (response.data.message) {
        ElMessage.error(response.data.message);
    }
    /*
    TODO: 这里抛异常, 则会跳出爆红页面, 目前处理不了, 先不抛了. 返回正常就算了
     */
    // return Promise.reject(new Error(response.data.message || '请求失败'));
    return response.data;
}, (error) => {
    console.log('httpResponseError' + error);
    return Promise.reject(error);
})

export default service;