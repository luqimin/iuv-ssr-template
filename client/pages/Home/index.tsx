import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import UserStore from '@store/user';

import styles from './index.less';

interface Props extends RouteComponentProps<{ tag: string }> {
    user: UserStore;
}

@inject('user')
@observer
class Home extends React.Component<Props> {
    render() {
        const account = this.props.user.data || {};
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <p>下了一整夜的雨, 早起就是好天气</p>
                    <p>
                        用户信息:
                        {JSON.stringify(account)}
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;
