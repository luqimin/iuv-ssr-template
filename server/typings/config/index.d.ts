// This file is created by iuv-egg-ts-helper@1.0.1
// Do not modify this file!!!!!!!!!

import { EggAppConfig } from 'egg';

import ExportConfigDefault from '../../config/config.default';

type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
type NewEggAppConfig = ConfigDefault;
declare module 'egg' {
    interface EggAppConfig extends NewEggAppConfig {}
}
