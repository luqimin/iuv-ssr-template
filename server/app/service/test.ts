import { Service } from 'egg';

import axios from '../utils/fetch';

export default class TestService extends Service {
    /**
     * 获取数据
     */
    async getData(filename: string) {
        try {
            return { data: { me: 'test' } };
        } catch (error) {
            throw error;
        }
    }
}
