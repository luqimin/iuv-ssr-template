import { Context } from 'egg';

export default () => {
    return async (ctx: Context, next: () => Promise<void>) => {
        const { url } = ctx;
        const user = ctx.session.userinfo;

        if (/^\/auth/.test(url)) {
            if (!user) {
                ctx.error(403, '您当前权限不够，请联系管理员');
                return;
            }
        }

        await next();
    };
};
