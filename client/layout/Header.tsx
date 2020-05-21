/**
 * 页面通用头
 */

import UserDropdown from '@component/userDropdown';
import { Layout, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { pathToRegexp } from 'path-to-regexp';
import * as React from 'react';
import { Link, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

import Routes from '../routes';
import UserStore from '../store/user';

import styles from './index.less';

const { Header } = Layout;

interface InjectedProps extends RouteComponentProps<{}> {
    user?: UserStore;
}

@inject('user')
@observer
class IUVHeader extends React.Component<InjectedProps, any> {
    render() {
        const { user, location } = this.props;
        const userinfo = user && user.data!;

        if (!userinfo) {
            return <Redirect to="/" />;
        }

        // 获取当前menu选中key
        let selectedKey: string = '';
        for (let i = 0; i < Routes.length; i++) {
            const route = Routes[i];
            if (pathToRegexp(route.path).test(location.pathname)) {
                selectedKey = route.menuKey;
                break;
            }
        }

        return (
            <Header className={styles.header}>
                <div className={styles.wrap}>
                    <div className={styles.left}>
                        <Link className={styles.logo} to="/">
                            <span className={styles.img} />
                            IUV
                        </Link>
                        <Menu
                            className={styles.menu}
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={[selectedKey]}
                            selectedKeys={[selectedKey]}
                        >
                            <Menu.Item key="home" className={styles.menuItem}>
                                <Link className={styles.link} to="/">
                                    首页
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="test" className={styles.menuItem}>
                                <Link className={styles.link} to="/test">
                                    测试页面
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className={styles.right}>
                        <UserDropdown theme="dark" visible />
                    </div>
                </div>
            </Header>
        );
    }
}

export default withRouter<RouteComponentProps<{}>, any>(IUVHeader);
