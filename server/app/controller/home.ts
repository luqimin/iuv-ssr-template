import { Controller } from 'egg';
import { StaticRouterContext } from 'react-router';

import { isDevelopment } from '../const/env';

// iuv动态生成的文件
// eslint-disable-next-line import/extensions
const SSR = require('../../ssr/app');

export default class HomeController extends Controller {
    async render() {
        const { ctx, app } = this;

        const context: StaticRouterContext = {};
        const rootStore = {};

        const fetchStore: { [key: string]: (...args: any[]) => Promise<any> } = {
            user: this.getUser.bind(this),
        };

        const ssrResult = await SSR(ctx, context, rootStore, fetchStore);
        const { html = '', style = '', script = '', helmet } = ssrResult || {};

        const vendorScript: string = isDevelopment
            ? '<script src="/dist/vendor.dev.js"></script>'
            : '<script src="/dist/vendor.js"></script>';
        const metaHtml = helmet ? helmet.title.toString() : `<title>${app.config.name}</title>`;

        ctx.body = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="icon" href="/favicon.ico" />
                    ${metaHtml}
                    ${style}
                    </head>
                <body>
                    <script>
                        window.ENV="${app.config.env}"
                        window.SITE_NAME="${app.config.name}"
                        window.INITIAL_STATE = ${JSON.stringify(rootStore)}
                    </script>
                    <div id="app">${html}</div>
                    ${vendorScript}
                    ${script}
                </body>
            </html>
          `;
    }

    /**
     * 获取用户信息
     */
    async getUser() {
        const { ctx } = this;
        return {
            code: ctx.session.userinfo ? 0 : -1,
            data: ctx.session.userinfo,
        };
    }
}
