import webpack from 'webpack';
import Koa from 'koa';
import opn from 'opn';
import { hotMiddleware } from 'koa-webpack-middleware';
import devConfig from '../webpack.config.dev';
import { port } from '../config/server';
import devMiddleware from './utils/webpackUtils';

const compile = webpack(devConfig);

const app = new Koa();
const devMiddlewareCOmpile = devMiddleware(compile, devConfig.devServer, () => {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    const uri = `http://localhost:${port}`;
    opn(uri);
  });
});
app.use(devMiddlewareCOmpile);
app.use(hotMiddleware(compile, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
  log: console.log,
}));

