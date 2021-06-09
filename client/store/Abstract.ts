import { action, makeObservable, observable } from 'mobx';

export default class AbstrctStore {
    loaded: boolean = false;

    constructor() {
        makeObservable(this, {
            loaded: observable,
            init: action,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    init(...args: any[]): Promise<any> | undefined {
        if (this.loaded) {
            return;
        }
        return Promise.resolve({});
    }
}
