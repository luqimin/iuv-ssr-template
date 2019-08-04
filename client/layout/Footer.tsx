/**
 * 页面通用尾
 */

import { Layout } from 'antd';
import * as React from 'react';
const { Footer } = Layout;
import styles from './index.less';

interface Props {
    text?: React.ReactNode | string;
    fixBottom?: boolean;
}

class IUVFooter extends React.PureComponent<Props> {
    render() {
        const { text, fixBottom } = this.props;
        return (
            <Footer className={`${styles.footer} ${fixBottom ? styles.fixBottom : ''}`}>
                {text || 'IUV'}
            </Footer>
        );
    }
}

export default IUVFooter;
