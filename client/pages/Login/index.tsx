/*
 * 登录页面
 */

import { Button, Checkbox, Form, Input, message } from 'antd';
import { FormProps } from 'antd/lib/form';
import { Location } from 'history';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LOGIN } from '@const/url';
import IUVFooter from '@layout/Footer';
import UserStore from '@store/user';
import { post } from '@utils/fetch';

import styles from './index.less';

const FormItem = Form.Item;

/**
 * 用户登录表单接口
 */
interface UserFormProps extends FormProps {
    /**
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 是否记住登录状态
     */
    remember: boolean;
}

/**
 * 组件Props接口
 */
interface Props extends UserFormProps, RouteComponentProps<{}, {}, { from?: Location }> {
    user: UserStore;
}

@inject('user')
@observer
class Login extends React.Component<Props> {
    state = { submitting: false };

    /**
     * 登录
     */
    handleSubmit = (values: any) => {
        const { user } = this.props;
        this.setState({ submitting: true });

        // 用户登录
        post(LOGIN, values)
            .then((res) => {
                if (res.code === 0) {
                    message.success(res.msg || '登录成功', 1, () => {
                        // 修改用户登录状态
                        user.initData(res.data);
                        // 登陆后页面跳转
                        this.redirect();
                    });
                } else {
                    message.error(res.msg || '登陆失败');
                }
                this.setState({ submitting: false });
            })
            .catch((err) => {
                message.error(`登陆失败: ${err.message}`);
                this.setState({ submitting: false });
            });
    };

    /**
     * 登陆后跳转页面
     */
    redirect = () => {
        const { location, history } = this.props;
        // 来源页面
        const from = location.state?.from;

        // 有来源页面，则跳转到来源页面, 没有来源页面，则跳转到首页
        from && history.replace(from as any);
    };

    render() {
        const { user, location } = this.props;
        const { submitting } = this.state;

        // 用户是否登录
        const isLogin: boolean = !!user!.data;

        if (isLogin) {
            // 来源页面
            const from = location.state && location.state.from;
            return (
                <Redirect
                    to={{
                        pathname: from ? from.pathname : '/',
                    }}
                />
            );
        }

        return (
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <span className={styles.title}>IUV Web App</span>
                    </div>
                    <div className={styles.desc}>哎呦喂~</div>
                </div>

                <div className={styles.main}>
                    <Form name="login" onFinish={this.handleSubmit} initialValues={{ remember: true }}>
                        <FormItem
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        >
                            <Input size="large" prefix={<UserOutlined className={styles.prefixIcon} />} placeholder="用户名" />
                        </FormItem>
                        <FormItem
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                            <Input.Password size="large" prefix={<LockOutlined className={styles.prefixIcon} />} placeholder="密码" />
                        </FormItem>
                        <FormItem className={styles.additional} name="remember" valuePropName="checked">
                            <Checkbox className={styles.autoLogin}>自动登录</Checkbox>
                        </FormItem>
                        <FormItem className={styles.additional}>
                            <Button size="large" loading={submitting} className={styles.submit} type="primary" htmlType="submit">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <IUVFooter />
            </div>
        );
    }
}

export default Login;
