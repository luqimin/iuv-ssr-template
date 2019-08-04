import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';

import styles from './index.less';

interface IFormComponentProps extends Readonly<FormComponentProps> {
    /**
     * 提交中
     */
    submitting?: boolean;
    onSubmit: any;
}

class LoginForm extends React.PureComponent<IFormComponentProps> {
    constructor(props: IFormComponentProps) {
        super(props);
    }

    handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.onSubmit && typeof this.props.onSubmit === 'function') {
                    this.props.onSubmit(values);
                }
            }
        });
    }

    render() {
        const { form, submitting } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit} className={styles.login}>
                <div className={styles.logo}>
                    <span className={styles.img} />
                    <span>IUV</span>
                </div>
                <Form.Item>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: '请输入账户' }],
                    })(
                        <Input
                            autoFocus
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="账户"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />
                    )}
                </Form.Item>
                <Button block type="primary" htmlType="submit" className={styles.submit} loading={submitting}>
                    {submitting ? '登录中...' : '登 录'}
                </Button>
            </Form>
        );
    }
}
export default Form.create<IFormComponentProps>()(LoginForm);
