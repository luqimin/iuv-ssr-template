import UserStore from '@store/user';
import { Alert, BackTop, Button, Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import IUVContent from '../layout/Content';
import IUVFooter from '../layout/Footer';
import IUVHeader from '../layout/Header';

interface Props {
    component: React.ComponentClass<RouteComponentProps, any>;
    user?: UserStore;
}

interface State {
    /**
     * 组件是否catch到错误
     */
    hasError: boolean;
}

@inject('user')
@observer
class Auth extends React.Component<Props, State> {
    state = { hasError: false };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const loadChunkErrorReg = /.*Loading.*chunk.*/;
        if (loadChunkErrorReg.test(error.message)) {
            window.location.reload();
        }
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        const { component: Component, user, ...rest } = this.props;

        if (this.state.hasError) {
            return (
                <div style={{ margin: '100px auto', width: 666 }}>
                    <Alert
                        message="对不起，页面发生了错误"
                        description={
                            <div>
                                <p>请尝试刷新页面</p>
                                <p>
                                    <Button
                                        onClick={() => {
                                            window.location.reload();
                                        }}
                                    >
                                        立即刷新
                                    </Button>
                                    <Button
                                        style={{ marginLeft: 10 }}
                                        onClick={() => {
                                            window.history.go(-1);
                                        }}
                                    >
                                        返回上页
                                    </Button>
                                </p>
                            </div>
                        }
                        type="error"
                    />
                </div>
            );
        }

        // 用户是否登录
        const isLogin: boolean = !!user!.data;

        return (
            <Route
                {...rest}
                render={(props) =>
                    isLogin ? (
                        <Layout style={{ minHeight: '100vh' }}>
                            <IUVHeader />
                            <IUVContent>
                                <Component {...props} />
                            </IUVContent>
                            <IUVFooter />
                            <BackTop />
                        </Layout>
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}

export default Auth;
