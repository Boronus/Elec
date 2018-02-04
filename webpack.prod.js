const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: "./script/application.js",
    output: {
        filename: "bundle.js",
        library:"script"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false,
                        minimize: true,
                        sourceMap: true
                    }
                }],
                fallback: "style-loader"
            })
        },{
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader"
        },{
            test: /\.otf$/,
            loader: 'url-loader?limit=100000'
        },{
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader'
        }],
        loaders: [{
            test: /\.js?$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),//,
        new UglifyJsPlugin()
    ]
};