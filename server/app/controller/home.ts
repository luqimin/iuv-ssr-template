import { Controller } from 'egg';
import { StaticRouterContext } from 'react-router';

import { isDevelopment } from '../const/env';

/* tslint:disable */
// iuv动态生成的文件
const SSR = require('../../ssr/app');
/* tslint:enable */

export default class HomeController extends Controller {
    async render() {
        const { ctx } = this;

        const context: StaticRouterContext = {};
        const rootStore = {};

        const fetchStore: { [key: string]: (...args: any[]) => Promise<any> } = {
            user: this.getUser.bind(this),
        };

        const ssrResult = await SSR(ctx, context, rootStore, fetchStore);
        const { html = '', style = '', script = '' } = ssrResult || {};

        const vendorScript: string = isDevelopment
            ? '<script src="/dist/vendor.dev.js"></script>'
            : '<script src="/dist/vendor.js"></script>';

        ctx.body = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>IUV ISOMORPHIC DEMO</title>
                    <link rel="icon" href="/favicon.ico" />
                    ${style}
                    </head>
                <body>
                    <script>
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
