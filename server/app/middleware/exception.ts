/**
 * 错误统一处理中间件
 */

import { Context } from 'egg';

export default () => {
    return async (ctx: Context, next: () => void) => {
        try {
            await next();
        } catch (error) {
            ctx.status = error.statusCode || error.status || 500;
            ctx.body = {
                code: ctx.status,
                err: error.message,
                msg: error.stack,
            };
            // 统一记录日志
            ctx.logger.error(error);
        }
    };
};
