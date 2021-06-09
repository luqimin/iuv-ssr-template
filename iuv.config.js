const path = require('path');

module.exports = {
    /**
     * 静态文件版本号，未设置默认使用hash文件名
     */
    version: '1.0.0',

    commands: {
        start: {
            package: '@iuv/ssr-kit/build/dev-server',
        },
        build: {
            package: '@iuv/ssr-kit/build/build',
        },
    },

    clientPath: path.resolve(__dirname, 'build/client'),
    clientSourcePath: path.resolve(__dirname, 'client'),
    serverPath: path.resolve(__dirname, 'build/server'),
    serverSourcePath: path.resolve(__dirname, 'server'),

    /**
     * 兼容浏览器列表
     */
    browsers: ['chrome >= 50', 'safari >= 10'],

    /**
     * 覆盖iuv默认 webpack dllPlugin vendors 配置
     */
    dll: ['history', 'react', 'react-dom', 'axios', 'react-router-dom', 'mobx', 'mobx-react'],

    /**
     * less变量替换 modifyVars配置
     */
    lessModifyVars: {
        '@page-width': '1800px',
        '@primary-color': '#fa7241',
        '@info-color': '#fa7241',
        '@processing-color': '#56a9ff',
        '@red-6': '#f75451',
        '@gold-6': '#fd9626',
        '@body-background': '#f1f3f5',
        '@lightFontColor': '#979eb1',
        '@darkFontColor': '#d0b8a8',
        '@layout-body-background': '#f1f3f5',
        '@layout-header-background': '#424859',
        '@border-color-split': '#e8e8e8',
        '@card-shadow': '0 8px 8px rgba(10,16,20,.24), 0 0 8px rgba(10,16,20,.12)',
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
