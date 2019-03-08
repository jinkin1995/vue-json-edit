const path = require('path');
const baseConfig = require('./webpack.base');

const config = baseConfig;

config.mode = 'production';
config.entry = './src/index.js';

config.optimization = {
    minimize: true,
}

config.output = {
  path: path.resolve(__dirname, './dist'),
  filename: 'vue-json-edit.js',
  library: 'vue-json-edit',
  libraryTarget: 'umd',
};
config.externals = {
  vue: 'Vue',
};

module.exports = config