import { action, observable } from 'mobx';

export default class AbstrctStore {
    @observable loaded: boolean = false;

    @action init() {
        if (this.loaded) {
            return Promise.resolve();
        }
        return Promise.resolve({});
    }

    initData(data: any) {
        if (data) {
            this.loaded = true;
        }
    }
}
