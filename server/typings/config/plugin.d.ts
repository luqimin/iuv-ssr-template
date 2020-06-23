// This file is created by iuv-egg-ts-helper@1.0.1
// Do not modify this file!!!!!!!!!

import { EggPluginItem } from 'egg';
import 'egg-onerror';
import 'egg-session';
import 'egg-i18n';
import 'egg-watcher';
import 'egg-multipart';
import 'egg-security';
import 'egg-development';
import 'egg-logrotator';
import 'egg-schedule';
import 'egg-static';
import 'egg-jsonp';
import 'egg-view';

declare module 'egg' {
    interface EggPlugin {
        onerror?: EggPluginItem;
        session?: EggPluginItem;
        i18n?: EggPluginItem;
        watcher?: EggPluginItem;
        multipart?: EggPluginItem;
        security?: EggPluginItem;
        development?: EggPluginItem;
        logrotator?: EggPluginItem;
        schedule?: EggPluginItem;
        static?: EggPluginItem;
        jsonp?: EggPluginItem;
        view?: EggPluginItem;
        redis?: EggPluginItem;
        sessionRedis?: EggPluginItem;
    }
}
