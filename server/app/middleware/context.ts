/**
 * 为context添加通用方法
 */

import { Context } from 'egg';

export default () => {
    return async (ctx: Context, next: () => Promise<void>) => {
        // 为ctx添加success、error和json通用方法, 所有方法默认status均为200
        Object.assign(ctx, {
            success(data: any, msg = 'success') {
                ctx.body = {
                    code: 0,
                    msg,
                    data,
                };
            },
            error(code: number | string, msg: any, data: any) {
                if (typeof code !== 'number') {
                    ctx.body = {
                        code: -1,
                        data: msg,
                        msg: code,
                        err: code,
                    };
                    return;
                }
                ctx.body = {
                    code,
                    msg,
                    err: msg,
                    data,
                };
            },
            json(data: { [key: string]: any }) {
                ctx.body = data;
            },
        });

        await next();
    };
};
