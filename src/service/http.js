import axios from "axios";
import {ElMessage} from "element-plus";
import store from "../store";

const service = axios.create({})

service.interceptors.request.use(config => {
    console.log('------HTTP_REQUEST : ' + config.method + ' : ' + config.url + '\n' + 'Param: ' + (config.data ? JSON.stringify(config.data) : ""));
    let token = store.getters.user.token;
    config.headers['token'] = token;
    return config;
}, (error) => {
    console.log('httpRequestError' + error);
    return Promise.reject(error);
})

service.interceptors.response.use(async (response) => {
    console.log('------HTTP_RESPONSE : ' + response.config.method + ' : ' + response.config.url + '\n' + 'Param: ' + (response.config.data ? JSON.stringify(response.config.data) : "") + '\n' + 'Response: ' + (JSON.stringify(response.data)) );
    if (response.status === 200 && response.data.code === 0) {
        return response.data;
    }
    if (response.data.message) {
        ElMessage.error(response.data.message);
    }
    if (response.data.code === 401) {
        await localStorage.clear()
        await sessionStorage.clear()
        await location.reload()
    }
    /*
    TODO: 这里抛异常, 则会跳出爆红页面, 目前处理不了, 先不抛了. 返回正常就算了
     */
    // return Promise.reject(new Error(response.data.message || '请求失败'));
    return response.data;
}, (error) => {
    console.log('httpResponseError' + error);
    ElMessage.error(error.message);
    // return Promise.reject(error);
    /*
    返回正常, 避免跳红屏
     */
    return {code:500, message: "请求失败, 请稍后再试", data: {}};
    // 返回一个 resolved Promise，防止 Promise 被 reject 而引发“红屏”
    // return Promise.resolve({
    //     error: true,
    //     message: error.response?.data?.message || '网络请求出错',
    //     status: error.response?.status || 500
    // });
})

export default service;