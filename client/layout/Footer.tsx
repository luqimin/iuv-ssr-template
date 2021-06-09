/**
 * 页面通用尾
 */

import { Layout } from 'antd';
import * as React from 'react';

import styles from './index.less';

const { Footer } = Layout;

interface Props {
    text?: React.ReactNode | string;
    fixBottom?: boolean;
}

const IUVFooter = (props: Props) => {
    const { text, fixBottom } = props;
    return <Footer className={`${styles.footer} ${fixBottom ? styles.fixBottom : ''}`}>{text || 'IUV'}</Footer>;
};

export default IUVFooter;
