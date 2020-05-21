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

class IUVFooter extends React.PureComponent<Props> {
    render() {
        const { text, fixBottom } = this.props;
        return <Footer className={`${styles.footer} ${fixBottom ? styles.fixBottom : ''}`}>{text || 'IUV'}</Footer>;
    }
}

export default IUVFooter;
