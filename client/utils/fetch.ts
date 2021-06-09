import { message } from 'antd';
import OriginAxios from 'axios';
import { useState, useEffect, DependencyList } from 'react';

// 为axios配置超时时长
const axios = OriginAxios.create({
    timeout: 30 * 1000,
    withCredentials: true,
    xsrfCookieName: 'iuvCsrfToken',
    xsrfHeaderName: 'x-csrf-token',
});

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
 * post请求
 * @param url - 请求地址
 * @param data - 请求发送数据
 * @returns - 请求返回promise
 */
export function put<D = any>(url: string, data?: any) {
    return axios.request<GLOBAL_RESPONSE<D>, GLOBAL_RESPONSE<D>>({
        url,
        method: 'put',
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

export const useProgressFetch = <D = any>(
    {
        func,
        url,
        params,
        initialData,
        pause,
    }: {
        func: (url: string, params?: any) => Promise<GLOBAL_RESPONSE<D>>;
        url: string;
        params?: any;
        initialData?: D; // 初始数据
        pause?: boolean; // 停止发送请求
    },
    deps: DependencyList,
): [D | undefined, boolean, React.Dispatch<React.SetStateAction<D | undefined>>] => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<D | undefined>(initialData);
    useEffect(() => {
        if (pause) return;
        const isNode: boolean = typeof process === 'object';
        const Msg: {
            /**
             * 错误提示
             * @param m 错误文案
             */
            error(m: string): void;
        } = isNode ? console : message;
        setLoading(true);
        func(url, params)
            .then((res) => {
                setLoading(false);
                if (res.code === 0) {
                    setData(res.data);
                } else {
                    Msg.error(res.err || '请求失败，请稍后再试');
                }
            })
            .catch((error) => {
                setLoading(false);
                Msg.error(error.message);
            });
    }, deps);
    return [data, loading, setData];
};

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        const isNode: boolean = typeof process === 'object';

        const Msg: {
            /**
             * 错误提示
             * @param m 错误文案
             */
            error(m: string): void;
        } = isNode ? console : message;

        if (error.response) {
            Msg.error(`系统错误(${error.response.status})：${error.message}`);
        } else if (error.request) {
            Msg.error(`服务未响应：${error.message}`);
        } else {
            Msg.error(`请求失败：${error.message}`);
        }
        return Promise.reject(error);
    },
);

export default axios;
