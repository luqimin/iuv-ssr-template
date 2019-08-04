import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as fs from 'fs-extra';
import * as path from 'path';

// 网站favicon文件地址
const favicon = fs.readFileSync(path.join(__dirname, '../favicon.ico'));

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // 覆盖框架，插件的配置
    Object.assign(config, {
        development: {
            watchDirs: ['ssr'],
        },

        keys: 'iuv,keys',

        security: {
            csrf: {
                cookieName: 'iuvCsrfToken',
            },
        },

        middleware: ['auth', 'context', 'exception'],

        logger: {
            dir: path.join(__dirname, '../../../logs'),
        },

        siteFile: { '/favicon.ico': favicon },

        /* 静态文件路由 */
        static: {
            dir: path.join(__dirname, '../../client'),
            prefix: '/',
        },
    });

    // 应用本身的配置
    const bizConfig = {
        /* cors配置 */
        cors: {
            origin: '*',
            allowMethods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'DELETE', 'PUT'],
            credentials: 'true',
        },

        session: {
            key: '_iuv_sess',
            maxAge: 86400000 * 30, // 30天
        },

        multipart: {
            fileSize: '500mb',
        },

        redis: {
            client: {
                port: 6379, // Redis port
                host: '127.0.0.1', // Redis host
                password: 'auth',
                db: 0,
            },
            agent: true,
        },
    };

    // 目的是将业务配置属性合并到 EggAppConfig 中返回
    return {
        // 如果直接返回 config ，将该类型合并到 EggAppConfig 的时候可能会出现 circulate type 错误。
        ...config,
        ...bizConfig,
    };
};
