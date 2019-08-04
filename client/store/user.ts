/**
 * 用户
 */

import { LOGOUT } from '@const/url';
import { get } from '@utils/fetch';
import { action, observable } from 'mobx';

import Abstract from './Abstract';

export default class UserStore extends Abstract {
    @observable data: GLOBAL_USER | null = null;

    constructor(data?: { data: GLOBAL_USER; loaded: boolean }) {
        super();
        data && data.loaded && this.initData(data.data);
    }

    initData(data: GLOBAL_USER) {
        if (data) {
            this.loaded = true;
            this.data = data;
        }
    }

    logout() {
        return get(LOGOUT).then((res: any) => {
            if (res && res.code === 0) {
                this.data = null;
                this.loaded = false;
            }
        });
    }
}
