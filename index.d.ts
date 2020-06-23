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
    /**
     * 运行环境
     */
    ENV: 'local' | 'test' | 'prod';
    /**
     * 网站名
     */
    SITE_NAME: string;
    /**
     * 初始化状态, ssr使用
     */
    INITIAL_STATE: {
        user?: { loaded: boolean; data: GLOBAL_USER };
    };
}
