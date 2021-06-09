import { Spin } from 'antd';
import React from 'react';

import loadable from '@loadable/component';

const Loading = () => (
    <div style={{ width: '100%', minHeight: 300, marginTop: 100, padding: 30, textAlign: 'center' }}>
        <Spin size="large" tip="加载中..." />
    </div>
);

export interface RouteIF {
    /**
     * 需初始化的store名数据
     */
    store: string[];

    /**
     * 当前页面菜单key
     */
    menuKey: string;

    name: string;
    path: string;
    exact?: boolean;
    strict?: boolean;
    component: any;
}

// 首页
const LazyHome = loadable(() => import(/* webpackChunkName: "home" */ './pages/Home'), {
    fallback: <Loading />,
});

// 登录页
const LazyLogin = loadable(() => import(/* webpackChunkName: "login" */ './pages/Login'), {
    fallback: <Loading />,
});

// 测试页
const LazyTest = loadable(() => import(/* webpackChunkName: "test" */ './pages/Test'), {
    fallback: <Loading />,
});

const Routes: RouteIF[] = [
    {
        name: '首页',
        menuKey: 'home',
        store: [''],
        path: '/',
        exact: true,
        strict: true,
        component: LazyHome,
    },
    {
        name: '登录',
        menuKey: 'login',
        store: [''],
        path: '/login',
        component: LazyLogin,
    },
    {
        name: '测试页面',
        menuKey: 'test',
        store: [''],
        path: '/test/:params?',
        component: LazyTest,
    },
];

export default Routes;
