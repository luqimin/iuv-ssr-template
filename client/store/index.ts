import UserStore from './user';

export class RootStore {
    user: UserStore;

    constructor(initState: Window['INITIAL_STATE']) {
        const { user } = initState;
        this.user = new UserStore(user);
    }
}

export default (initState: Window['INITIAL_STATE']): RootStore => {
    const store = new RootStore(initState);
    return store;
};
