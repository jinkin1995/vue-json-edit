const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');

const config = baseConfig;

config.mode = 'development';

config.entry = './example/main.js';
config.output = {
  path: path.resolve(__dirname, './example/dist/'),
  publicPath: '',
  filename: '[name]_[hash].js',
};

config.devtool = 'inline-source-map';
config.devServer = {
	contentBase: './dist'
};

config.plugins = config.plugins.concat([
	new HtmlWebpackPlugin({
		template: './example/index.html'
	})
])

module.exports = config
