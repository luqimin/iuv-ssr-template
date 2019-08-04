import { action, observable } from 'mobx';

export default class AbstrctStore {
    @observable loaded: boolean = false;

    @action init(...args: any[]) {
        if (this.loaded) {
            return;
        }
        return Promise.resolve({});
    }

    initData(data: any) {
        if (data) {
            this.loaded = true;
        }
    }
}
