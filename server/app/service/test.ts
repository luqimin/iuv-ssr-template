import { Service } from 'egg';

export default class TestService extends Service {
    /**
     * 获取数据
     */
    async getData() {
        return { data: { me: 'test' } };
    }
}
