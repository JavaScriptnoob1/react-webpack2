const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ROOT_PATH = resolve(__dirname);

module.exports = {
  entry: {
    main: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './index.js',
    ],
  },
  output: {
    filename: '[name].js',
    path: resolve(ROOT_PATH, 'dist'),
    publicPath: '/',
  },

  context: resolve(ROOT_PATH, 'src'),

  devtool: 'eval',

  devServer: {
    hot: true,
    contentBase: resolve(ROOT_PATH, 'dist'),
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    historyApiFallback: true,
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    stats: {
      colors: true,
      timings: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(resolve(ROOT_PATH, 'lib', 'manifest.json')),
      context: ROOT_PATH,
    }),

    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve(resolve(ROOT_PATH, 'lib', 'vendor.dll.js')),
    }),
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'disabled',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'report.html',
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: 'parsed',
      // Automatically open report in default browser
      openAnalyzer: true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: false,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'info',
    }),
  ],
};
