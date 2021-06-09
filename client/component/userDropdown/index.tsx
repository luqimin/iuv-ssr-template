/**
 * 页面头部用户下拉菜单
 */

import { useStores } from '@store';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { LogoutOutlined, CaretDownOutlined } from '@ant-design/icons';

import styles from './index.less';

interface Props {
    theme?: 'light' | 'dark';
}

const UserDropdown = (props: Props) => {
    const { theme = 'light' } = props;
    const history = useHistory();
    const { user } = useStores();

    // 登录页面
    const handleLogin = () => {
        history.replace('/login');
    };
    const handleUserMenuClick = ({ key }: { [key: string]: any }) => {
        // 退出账号
        if (key === 'logout') {
            user.logout();
        }
    };

    const userinfo = user && user.data;

    if (!userinfo) {
        return (
            <div className={`${styles.wrap} ${styles[theme]}`}>
                <div className={styles.btn}>
                    <a onClick={handleLogin}>登录</a>
                </div>
            </div>
        );
    }

    const menu = (
        <Menu className={`${styles.menu} ${styles[theme]}`} theme={theme} onClick={handleUserMenuClick}>
            <Menu.Item key="logout" className={styles.menuItem} icon={<LogoutOutlined />}>
                退出登录
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={`${styles.wrap} ${styles[theme]}`}>
            <Dropdown overlay={menu} placement="bottomRight" overlayClassName={styles.dropdown}>
                <span className={styles.account}>
                    <Avatar size="small" className={styles.avatar} src={userinfo.avatar} />
                    <span className={styles.username}>{userinfo.username || userinfo.userid}</span>
                    <CaretDownOutlined />
                </span>
            </Dropdown>
        </div>
    );
};

export default UserDropdown;
