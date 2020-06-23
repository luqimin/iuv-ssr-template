import '@babel/polyfill';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { loadableReady } from '@loadable/component';

// 引入mobx数据状态库
import Main from './pages/Main';
import getRootStore from './store';

const stores = getRootStore(window.INITIAL_STATE);

loadableReady(() => {
    ReactDOM.hydrate(
        <Provider {...stores}>
            <Router>
                <Main />
            </Router>
        </Provider>,
        document.getElementById('app')
    );
});
