// This file is created by iuv-egg-ts-helper@1.0.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportContext from '../../../app/middleware/context';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    context: typeof ExportContext;
  }
}
