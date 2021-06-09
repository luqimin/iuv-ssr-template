/**
 * 页面信息
 */

import { action, makeObservable, observable } from 'mobx';

import Abstract from './Abstract';

interface PAGE_PROPS {
    /**
     * 父目录
     */
    parentDirs?: { name: string; url: string }[];
    /**
     * 当前页面名
     */
    pageName?: string;
}

export default class PageStore extends Abstract {
    data: PAGE_PROPS = { pageName: '' };

    constructor() {
        super();
        makeObservable(this, {
            data: observable,
            setData: action,
        });
    }

    setData(data: PAGE_PROPS) {
        if (data) {
            Object.assign(this.data, data);
        }
    }
}
