import { Application } from 'egg';

export default (app: Application) => {
    const { router, controller } = app;

    /**
     * 用户
     */
    router.post('/user/login', controller.user.login);
    router.get('/user/logout', controller.user.logout);

    /**
     * 页面ssr
     */
    router.get('*', controller.home.render);
};
