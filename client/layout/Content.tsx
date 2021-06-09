/**
 * 页面主要内容
 */

import { Layout } from 'antd';
import React, { PropsWithChildren } from 'react';

import styles from './index.less';

const { Content } = Layout;

const IUVContent = (props: PropsWithChildren<any>) => {
    const { children } = props;

    return (
        <Content className={styles.content}>
            <div className={styles.contentWrap}>
                <Layout className={styles.main}>{children}</Layout>
            </div>
        </Content>
    );
};

export default IUVContent;
