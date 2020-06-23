import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

// 路由
import Routes from '../routes';
import Auth from './Auth';
import Exception from './Exception';

// 全局样式
import '../style/global.less';

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
