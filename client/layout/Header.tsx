/**
 * 页面通用头
 */

import { useStores } from '@store';
import { Layout, Menu } from 'antd';
import { observer } from 'mobx-react';
import { pathToRegexp } from 'path-to-regexp';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect, useLocation } from 'react-router-dom';

import UserDropdown from '@component/userDropdown';

import Routes from '../routes';
import styles from './index.less';

const { Header } = Layout;

const IUVHeader = () => {
    const { user, page } = useStores();
    const location = useLocation();
    const userinfo = user && user.data;

    if (!userinfo) {
        return <Redirect to="/" />;
    }

    // 获取当前menu选中key
    let selectedKey: string = '';
    let pageTitle = 'IUV';
    for (let i = 0; i < Routes.length; i++) {
        const route = Routes[i];
        if (pathToRegexp(route.path).test(location.pathname)) {
            selectedKey = route.menuKey;
            pageTitle = `IUV - ${page!.data.pageName || route.name}`;
            break;
        }
    }

    return (
        <Header className={styles.header}>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
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
                    <UserDropdown theme="dark" />
                </div>
            </div>
        </Header>
    );
};

export default observer(IUVHeader);
