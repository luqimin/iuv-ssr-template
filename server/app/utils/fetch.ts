import OriginAxios from 'axios';

// 为axios配置超时时长
const axios = OriginAxios.create({ timeout: 30 * 1000, withCredentials: true });

/**
 * get请求
 * @param url - 请求地址
 * @param params - 请求发送数据
 * @returns - 请求返回promise
 */
export function get<D = any>(url: string, params?: any) {
    return axios.get<GLOBAL_RESPONSE<D>, GLOBAL_RESPONSE<D>>(url, { params });
}

/**
 * post请求
 * @param url - 请求地址
 * @param data - 请求发送数据
 * @returns - 请求返回promise
 */
export function post<D = any>(url: string, data?: any) {
    return axios.request<GLOBAL_RESPONSE<D>, GLOBAL_RESPONSE<D>>({
        url,
        method: 'post',
        data,
    });
}

/**
 * delete请求
 * @param url - 请求地址
 * @param data - 请求发送数据
 * @returns - 请求返回promise
 */
export function deleteAxios<D = any>(url: string, data?: any) {
    return axios.request<GLOBAL_RESPONSE<D>, GLOBAL_RESPONSE<D>>({
        url,
        method: 'delete',
        data,
    });
}

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        if (error.response) {
            console.error(`系统错误(${error.response.status})：${error.message}`);
        } else if (error.request) {
            console.error(`服务未响应：${error.message}`);
        } else {
            console.error(`请求失败：${error.message}`);
        }
        return Promise.reject(error);
    },
);

export default axios;
