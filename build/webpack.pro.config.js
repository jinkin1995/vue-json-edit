const webpack = require('webpack');
const config = require('./webpack.base.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// config.entry = '../example/main.js';
config.entry = path.resolve(__dirname, '../example/main.js')

config.output = {
  path: path.resolve(__dirname, '../example/dist/'),
  publicPath: '',
  filename: 'bundle_[hash].js'
};

// config.devtool = 'eval';

// config.plugins = [
//   new HtmlWebpackPlugin({
//     filename: path.resolve(__dirname, '../example/index.html'),
//     template: path.resolve(__dirname, '../example/index.html'),
//     inject: true,
//   }),
// ];
config.plugins = [new HtmlWebpackPlugin({
  title: 'JsonEditor',
  template: path.resolve(__dirname, '../example/index.html'),
  inject: true
})]


// config.resolve = {
//   alias: {
//     vue$: 'vue/dist/vue.esm.js',
//   },
// };

module.exports = config;
