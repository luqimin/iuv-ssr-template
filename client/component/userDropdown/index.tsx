/**
 * 页面头部用户下拉菜单
 */

import UserStore from '@store/user';
import { Avatar, Dropdown, Menu } from 'antd';
import { LogoutOutlined, CaretDownOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import styles from './index.less';

interface Props {
    user?: UserStore;
    theme?: 'light' | 'dark';
    visible: boolean;
    onChange?(value: boolean): void;
}

@inject('user')
@observer
export default class UserDropdown extends React.Component<Props> {
    /**
     * 菜单dropdown点击
     */
    handleUserMenuClick = ({ key }: { [key: string]: any }) => {
        if (key === 'logout') {
            this.props.user!.logout();
        }
    };

    render() {
        const { user, theme = 'light' } = this.props;
        const userinfo = user && user.data!;

        if (!userinfo) {
            return '';
        }

        const menu = (
            <Menu className={`${styles.menu} ${styles[theme]}`} theme={theme} onClick={this.handleUserMenuClick}>
                <Menu.Item key="logout">
                    <LogoutOutlined />
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
    }
}
