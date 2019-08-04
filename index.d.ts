declare module '*.less' {
    const content: { [key: string]: string };
    export default content;
}

interface BASE {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * 接口请求
 */
declare interface GLOBAL_RESPONSE<D> {
    code: number;
    data: D;
    msg: string;
    err: string;
}

/**
 * 翻页数据
 */
declare interface PAGED_DATA_WRAPPER<D = any> {
    page: number;
    size: number;
    total: number;
    list: D[];
}

/**
 * 用户
 */
declare interface GLOBAL_USER extends BASE {
    userid: string;
    username?: string;
    email?: string;
    avatar?: string;
    roles: string[];
}

/**
 * 页面全局变量
 */
declare interface Window {
    INITIAL_STATE: {
        user?: { loaded: boolean; data: GLOBAL_USER };
    };
}
