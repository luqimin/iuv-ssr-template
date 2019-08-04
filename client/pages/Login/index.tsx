/*
 * 登录页面
 */

import { LOGIN } from '@const/url';
import IUVFooter from '@layout/Footer';
import UserStore from '@store/user';
import { post } from '@utils/fetch';
import { Button, Checkbox, Form, Icon, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Location } from 'history';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import styles from './index.less';

const FormItem = Form.Item;

/**
 * 用户登录表单接口
 */
interface UserFormProps extends FormComponentProps {
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
interface Props extends UserFormProps, RouteComponentProps<{ tag: string }> {
    user: UserStore;
}

@inject('user')
@observer
class Login extends React.Component<Props> {
    state = { submitting: false };

    /**
     * 登录
     */
    handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
        const { user, form, history } = this.props;

        form.validateFields({ force: true }, (err, values) => {
            if (!err) {
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
                    .catch((_err) => {
                        message.error(`登陆失败: ${_err.message}`);
                        this.setState({ submitting: false });
                    });
            }
        });
    }

    /**
     * 登陆后跳转页面
     */
    redirect = () => {
        const { location, history } = this.props;
        // 来源页面
        const from: Location | undefined = location.state && location.state.from;

        // 有来源页面，则跳转到来源页面, 没有来源页面，则跳转到首页
        if (from) {
            history.replace(from || '/');
        }
    }

    render() {
        const { form, user, location } = this.props;
        const { getFieldDecorator } = form;
        const { submitting } = this.state;

        // 用户是否登录
        const isLogin: boolean = !!user!.data;

        if (isLogin) {
            // 来源页面
            const from: Location | undefined = location.state && location.state.from;
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
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ],
                            })(
                                <Input
                                    size="large"
                                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                                    placeholder="用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                ],
                            })(
                                <Input
                                    size="large"
                                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                                    type="password"
                                    placeholder="密码"
                                />
                            )}
                        </FormItem>
                        <FormItem className={styles.additional}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox className={styles.autoLogin}>自动登录</Checkbox>)}
                            <Button
                                size="large"
                                loading={submitting}
                                className={styles.submit}
                                type="primary"
                                htmlType="submit"
                            >
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

const WrappedLoginForm = Form.create()(Login);

export default WrappedLoginForm;
