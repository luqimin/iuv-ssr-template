import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    static: true,

    /**
     * redis
     */
    redis: {
        enable: false,
        package: 'egg-redis',
    },

    /**
     * session
     */
    sessionRedis: {
        enable: false,
        package: 'egg-session-redis',
    },
};

export default plugin;
