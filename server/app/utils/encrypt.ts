/**
 * 密码加密
 */

import * as crypto from 'crypto';

export const encryptPassword = (password: string, salt: string): string => {
    // 密码“加盐”
    const saltPassword = `${password}:${salt}`;
    // 加盐密码的md5值
    const md5 = crypto.createHash('md5');
    const result = md5.update(saltPassword).digest('hex');
    return result;
};

export const createRandomString = (): string => Math.random().toString(36).substr(2);
