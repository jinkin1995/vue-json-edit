const webpack = require('webpack');
const config = require('./webpack.base.config');
const path = require('path');

// config.entry = '../src/index.js';
// config.entry = path.resolve('../src/main.js');

config.entry = path.resolve(__dirname, '../src/index.js')

config.output = {
    path: path.join(__dirname, '../dist'),
    filename: 'vue-jsonEditor.js',
    // library: 'vue-jsonEditor',
    // libraryTarget: 'umd',
};

config.externals = {
    vue: 'Vue'
};

config.plugins = (config.plugins || []).concat([

    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }),

    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false,
        },
        comments: false,
    }),
]);


module.exports = config;