/**
 * user 控制器
 */

import { Controller } from 'egg';

export default class UserController extends Controller {
    /**
     * 登录
     */
    async login() {
        const { ctx } = this;

        try {
            let { username, password } = ctx.request.body;
            username = username.trim();
            password = password.trim();

            if (!username || !password) {
                ctx.error(100, '请输入账号或密码');
                return;
            }

            const userinfo: GLOBAL_USER = {
                userid: username,
                username,
                email: `${username}@github.com`,
                roles: ['user', 'admin'],
            };

            // 登陆成功后写入cookie, 并将用户信息存于session
            const cookieOption = { httpOnly: false, maxAge: 14 * 24 * 60 * 60 * 1000 };
            ctx.cookies.set('userid', userinfo.userid, cookieOption);
            ctx.session.userinfo = userinfo;

            ctx.success(userinfo, '登录成功');
            // 日志
            ctx.logger.info(`${userinfo.username} (id:${userinfo.userid}) 登录`);
        } catch (error) {
            ctx.error(102, `登录异常发生：${error.message}`);
            ctx.logger.info(`登录发生异常：${error.stack}`);
        }
    }

    /**
     * 退出
     */
    async logout() {
        const { ctx } = this;
        // 销毁session
        ctx.session = null;
        // 销毁cookies
        ctx.cookies.set('userid', '', { maxAge: -1000 });
        ctx.success('退出成功');
    }
}
