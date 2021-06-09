import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';

import PageStore from './page';
import UserStore from './user';

export class RootStore {
    user: UserStore;

    page: PageStore;

    constructor(initState: Window['INITIAL_STATE']) {
        const { user } = initState;
        this.user = new UserStore(user);
        this.page = new PageStore();
    }
}
export const useStores = () => useContext<RootStore>(MobXProviderContext as any);

export default (initState: Window['INITIAL_STATE']): RootStore => {
    const store = new RootStore(initState);
    return store;
};
