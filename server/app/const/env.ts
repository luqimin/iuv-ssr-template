export const env: string = process.env.NODE_ENV || 'development';

/**
 * 开发环境
 */
export const isDevelopment: boolean = env === 'development';

/**
 * 测试环境
 */
export const isTesting: boolean = env === 'testing';

/**
 * 生产环境
 */
export const isProduction: boolean = env === 'production';
