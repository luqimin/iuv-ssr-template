// This file is created by iuv-egg-ts-helper@1.0.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/test';

declare module 'egg' {
  interface IService {
    test: ExportTest;
  }
}
