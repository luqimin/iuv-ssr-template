import 'egg';

declare module 'egg' {
    interface Context {
        session: { userinfo: GLOBAL_USER } | any;

        /**
         * 请求成功方法
         * @param data - 返回数据
         * @param msg - 文案
         */
        success(
            /**
             * 返回数据
             */
            data: any,
            /**
             * 文案
             */
            msg?: string
        ): void;

        /**
         * 请求失败方法
         */
        error(
            /**
             * 错误码
             */
            code: number,
            /**
             * 错误文案
             */
            msg?: string,
            /**
             * 返回数据
             */
            data?: any
        ): void;
        error(
            /**
             * 错误文案
             */ msg: string,
            /**
             * 返回数据
             */ data?: any
        ): void;

        /**
         * 请求返回json
         */
        json(data: { [key: string]: any }): void;
    }
}
