const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: __dirname + '/script',
    entry: "./application.js",
    output: {
        filename: "bundle.js",
        library:"script"
    },

    plugins: [
        /*new UglifyJsPlugin({
         compress: {
         warnings:false,
         drop_console:true,
         unsafe:true
         }
         })*/
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                //exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'//,
                    /*options: {
                     presets: ['env']
                     }*/
                }
            },{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },{
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader"
            },{
                test: /\.otf$/,
                loader: 'url-loader?limit=100000'
            },{
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            }
        ]
    }
};