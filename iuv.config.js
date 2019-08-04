const path = require('path');

module.exports = {
    /**
     * 静态文件版本号，未设置默认使用hash文件名
     */
    version: '1.0.0',

    commands: {
        start: {
            package: '@iuv/ssr-kit/lib/dev-server',
        },
        build: {
            package: '@iuv/ssr-kit/lib/build',
        },
    },

    clientPath: path.resolve(__dirname, 'build/client'),
    clientSourcePath: path.resolve(__dirname, 'client'),
    serverPath: path.resolve(__dirname, 'build/server'),
    serverSourcePath: path.resolve(__dirname, 'server'),

    /**
     * 兼容浏览器列表
     */
    browsers: ['chrome >= 50', 'ff >= 50', 'IE >= 9', 'ios >= 10', 'safari >= 10', 'android >= 6.0'],

    /**
     * 覆盖iuv默认 webpack dllPlugin vendors 配置
     */
    dll: ['history', 'react', 'react-dom', 'axios', 'react-router-dom', 'mobx', 'mobx-react'],

    /**
     * less变量替换 modifyVars配置
     */
    lessModifyVars: {
        '@primary-color': '#fa7241',
        '@info-color': '#fa7241',
        '@processing-color': '#56a9ff',
        '@red-6': '#f75451',
        '@gold-6': '#fd9626',
        '@body-background': '#f1f3f5',
        '@layout-body-background': '#f1f3f5',
        '@layout-header-background': '#424859',
        '@border-color-split': '#e8e8e8',
    },

    /**
     * 覆盖iuv默认nodemon配置
     */
    nodemon: {
        enable: false,
    },

    /**
     * egg-ts-helper
     */
    ets: {
        enable: true,
    },
};
