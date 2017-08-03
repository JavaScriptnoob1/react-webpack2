const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const ROOT_PATH = resolve(__dirname);

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
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
