/**
 * 页面主要内容
 */

import { Breadcrumb, Icon, Layout } from 'antd';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
const { Content } = Layout;
import Routes from '../routes';

import styles from './index.less';

const breadcrumbNameMap: { [key: string]: string } = {};
Routes.forEach((route) => {
    breadcrumbNameMap[route.path] = route.name;
});

class IUVContent extends React.PureComponent<RouteComponentProps<{}>, any> {
    render() {
        const { children } = this.props;

        return (
            <Content className={styles.content}>
                <div className={styles.contentWrap}>
                    <Layout className={styles.main}>
                        {children}
                    </Layout>
                </div>
            </Content>
        );
    }
}

export default withRouter<RouteComponentProps<{}>, any>(IUVContent);
