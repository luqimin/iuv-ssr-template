import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

import Routes from '../routes';
import '../style/global.less';

import Auth from './Auth';
import Exception from './Exception';

export default () => (
    <ConfigProvider locale={zhCN}>
        <>
            <ScrollMemory />
            <Switch>
                {Routes.map((route) => {
                    // 登录页面不适用公共layout
                    if (['/login'].includes(route.path)) {
                        return <Route key={route.name} {...route} />;
                    }

                    // 其他需要鉴权的页面
                    return <Auth key={route.name} {...route} />;
                })}
                <Route component={Exception} />
            </Switch>
        </>
    </ConfigProvider>
);
