const path = require('path');
const base = require('./webpack.base.config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebPackConfig = require('../config/webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(base, {
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            include: [path.resolve('assets')],
            loader: "style-loader!css-loader"
        }, {
            test: /\.scss$/,
            include: [path.resolve('assets')],
            loader: "style-loader!css-loader!sass-loader"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        ...WebPackConfig.getDirectory().map(file => {
            return new HtmlWebpackPlugin({
                filename: file + ".html",
                inject: true,
                template: path.resolve('assets/view/' + file + '/index.html'),
                chunks: ['vendors', file],
                minify: false
            })
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${WebPackConfig.dev.host}:${WebPackConfig.dev.port}/${WebPackConfig.dev.productName}/`]
            }
        })
    ],
    stats: {
        assets: true,
        children: false,
        modules: false,
        colors: true
    }
});