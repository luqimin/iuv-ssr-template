/**
 * 页面头部用户下拉菜单
 */

import { LOGIN } from '@const/url';
import UserStore from '@store/user';
import { post } from '@utils/fetch';
import { Avatar, Dropdown, Icon, Menu, message, Modal } from 'antd';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import styles from './index.less';
import LoginForm from './login';

interface Props {
    user?: UserStore;
    theme?: 'light' | 'dark';
    visible: boolean;
    onChange?(value: boolean): void;
}

@inject('user')
@observer
export default class UserDropdown extends React.Component<Props> {
    @observable
    submitting: boolean = false;

    handleOpenLoginModel = () => {
        const onChange = this.props.onChange;
        onChange && onChange(true);
    }

    handleCloseLoginModel = () => {
        const onChange = this.props.onChange;
        onChange && onChange(false);
    }

    handleLogin = (values: any) => {
        this.submitting = true;
        const user = this.props.user;
        // 用户登录
        post(LOGIN, values)
            .then((res: any) => {
                if (res.code === 0) {
                    // 修改用户状态
                    user!.initData(res.data);
                    this.handleCloseLoginModel();

                    message.success(res.msg || '登录成功');
                } else {
                    message.error(res.msg || '登陆失败');
                }

                this.submitting = false;
            })
            .catch((err: any) => {
                message.error(`登陆失败: ${err.message}`);
                this.submitting = false;
            });
    }

    /**
     * 菜单dropdown点击
     */
    handleUserMenuClick = ({ key }: { [key: string]: any }) => {
        if (key === 'logout') {
            this.props.user!.logout();
        }
    }

    render() {
        const { user, theme = 'light', visible = false } = this.props;
        const userinfo = user && user.data!;

        if (!userinfo) {
            return (
                <div className={`${styles.wrap} ${styles[theme]}`}>
                    <div className={styles.btn}>
                        <a onClick={this.handleOpenLoginModel}>登录</a>
                    </div>
                    <Modal
                        visible={visible}
                        maskClosable={false}
                        title={null}
                        footer={null}
                        width={462}
                        onCancel={this.handleCloseLoginModel}
                    >
                        <LoginForm submitting={this.submitting} onSubmit={this.handleLogin} />
                    </Modal>
                </div>
            );
        }

        const menu = (
            <Menu className={`${styles.menu} ${styles[theme]}`} theme={theme} onClick={this.handleUserMenuClick}>
                <Menu.Item key="logout">
                    <Icon type="logout" />
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
                        <Icon type="caret-down" />
                    </span>
                </Dropdown>
            </div>
        );
    }
}
