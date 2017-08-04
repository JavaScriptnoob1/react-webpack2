const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const ROOT_PATH = resolve(__dirname);

module.exports = {
  entry: {
    main: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
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
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    // display no info to console (only warnings and errors)
    noInfo: false,
    
    // watch options (only lazy: false)
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },

    // options for formating the statistics
    stats: {
      colors: true,
      timings: true
    }
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
  ],
};
