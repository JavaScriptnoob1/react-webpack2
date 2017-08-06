import webpack from 'webpack';
import Koa from 'koa';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import devConfig from '../webpack.config.dev';
import { port } from '../config/server';
// import opn from 'opn';

const compile = webpack(devConfig);

const app = new Koa();

app.use(devMiddleware(compile, devConfig.devServer));
app.use(hotMiddleware(compile, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
  log: console.log,
}));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  // const uri = `http://localhost:${port}`;
  // opn(uri);
});
