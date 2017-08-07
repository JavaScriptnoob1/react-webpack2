import devMiddleware from 'webpack-dev-middleware';

export default (compiler, opts, callback) => {
  const expressMiddleware = devMiddleware(compiler, opts);
  expressMiddleware.waitUntilValid(callback);
  return async (ctx, next) => {
    await expressMiddleware(ctx.req, {
      end: (content) => {
        ctx.body = content;
      },
      setHeader: (name, value) => {
        ctx.set(name, value);
      },
    }, next);
  };
};