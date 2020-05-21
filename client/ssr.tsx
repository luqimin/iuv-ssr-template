import { ChunkExtractor } from '@loadable/server';
import { Context } from 'egg';
import { find } from 'lodash';
import { toJS } from 'mobx';
import { Provider } from 'mobx-react';
import * as path from 'path';
import { pathToRegexp } from 'path-to-regexp';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

// 引入mobx数据状态库
import Main from './pages/Main';
import Routes, { RouteIF } from './routes';
import getRootStore from './store';

// iuv动态生成的文件
const statsFile = path.resolve('./build/server/ssr/loadable-stats.json');

export default async (ctx: Context, context: any, rootStore: any, fetchStore: { [key: string]: (param?: string) => Promise<any> }) => {
    // 获取mobx store
    const stores = getRootStore({});

    // 当前路由配置
    const currentRoute: RouteIF | undefined = find(Routes, (route) => {
        return pathToRegexp(route.path).test(ctx.path);
    });

    // 默认初始化用户状态store
    let preFetchStores: Array<{ name: string; param?: string }> = [{ name: 'user' }];

    if (currentRoute) {
        const reg: RegExp = pathToRegexp(currentRoute.path);
        const match = reg.exec(ctx.path)!;
        // 可能需要携带参数
        const param: string = match[1];
        preFetchStores = preFetchStores.concat(currentRoute.store.map((s) => ({ name: s, param })));
    }

    // 初始化所有的store
    const fetchStorePromises = preFetchStores.map((s) => {
        const key = s.name;
        const _store = stores[key];
        return _store ? fetchStore[key]?.(s.param) || Promise.resolve(null) : Promise.resolve(null);
    });
    const fetchRes = await Promise.all(fetchStorePromises);
    preFetchStores.forEach((s, i) => {
        const key = s.name;
        const _store = stores[key];
        _store?.initData(fetchRes[i].data, s.param);
    });

    Object.assign(rootStore, toJS(stores));

    const App = (
        <Provider {...stores}>
            <StaticRouter location={ctx.url} context={context}>
                <Main />
            </StaticRouter>
        </Provider>
    );

    // 创建ChunkExtractor
    const extractor = new ChunkExtractor({ statsFile, entrypoints: ['app'] });

    // wrap App
    const jsx = extractor.collectChunks(App);

    return {
        html: ReactDOMServer.renderToString(jsx),
        // stream: ReactDOMServer.renderToNodeStream(jsx),

        // 获取静态资源
        script: extractor.getScriptTags(),
        link: extractor.getLinkTags(),
        style: extractor.getStyleTags(),
    };
};
