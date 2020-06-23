/**
 * 用户
 */

import { observable } from 'mobx';

import { LOGOUT } from '@const/url';
import { get } from '@utils/fetch';

import Abstract from './Abstract';

export default class UserStore extends Abstract {
    @observable data: GLOBAL_USER | null = null;

    constructor(data?: { data: GLOBAL_USER; loaded: boolean }) {
        super();
        data?.loaded && this.initData(data.data);
    }

    initData(data: GLOBAL_USER) {
        if (data) {
            this.loaded = true;
            this.data = data;
        }
    }

    async logout() {
        const res = await get(LOGOUT);
        if (res && res.code === 0) {
            this.data = null;
            this.loaded = false;
        }
    }
}
