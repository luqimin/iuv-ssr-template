import { useStores } from '@store';
import React from 'react';

import styles from './index.less';

const Home = () => {
    const { user } = useStores();
    const account = user.data || {};

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <p>下了一整夜的雨, 早起就是好天气</p>
                <p>欢迎你大兄弟</p>
                <pre>{JSON.stringify(account, undefined, 4)}</pre>
            </div>
        </div>
    );
};

export default Home;
