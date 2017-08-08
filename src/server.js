import webpack from 'webpack';
import Koa from 'koa';
import opn from 'opn';
import { koaDevMiddleware, koaHotMiddleware } from 'webpack-dev-middleware-for-koa2';
import devConfig from '../webpack.config.dev';
import { port } from '../config/server';

const compile = webpack(devConfig);

const app = new Koa();
const devMiddlewareCompile = koaDevMiddleware(compile, devConfig.devServer, () => {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    const uri = `http://localhost:${port}`;
    opn(uri);
  });
});
app.use(devMiddlewareCompile);
app.use(koaHotMiddleware(compile, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
  log: console.log,
}));

