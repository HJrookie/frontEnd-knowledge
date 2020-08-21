```js
const resolve = require('path').resolve;
const webpack = require('webpack');
const fs=require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const url = require('url');
const publicPath = '';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (options = {}) => ({
    entry: {
        vendor: './src/vendor',
        index: ['babel-polyfill','./src/main.js']
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? 'js/[name].js' : 'js/[name].js?[chunkhash]',
        chunkFilename: 'js/[name].js?[chunkhash]',
        // publicPath: options.dev ? 'http://localhost:12005/assets/' : publicPath
        publicPath: options.dev ? 'https://localhost:30600/assets/' : publicPath
        // publicPath: publicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            /*options:{
             extractCSS: true
             }*/
            options: {
                /*cssModules: {
                 localIdentName: '[local]-[hash:base64:5]',
                 camelCase: true
                 },*/
                //extractCSS: true
            }
        },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },{
                test: /\.less$/,
                use: ['less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }]
            },{
                test: /\.js$/,
                use: ['babel-loader'],
                include: [resolve(__dirname, 'node_modules/@unicloud/uni-nav')]
              }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            isPublicCloud: options.private?'false':'true',
            msBaseUrl: JSON.stringify([
                {msPrefix: '/user', matchedUrl: '/pco/user/'},
            ])
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
        //new ExtractTextPlugin('style.[chunkhash].css')
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src')
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 30600,
        https:{
            key:fs.readFileSync(resolve(__dirname,'unicloud.com.key')),
            cert:fs.readFileSync(resolve(__dirname,'unicloud.com.pem'))
        },
        proxy: {
            '/api/': {
                target: 'https://127.0.0.1:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        historyApiFallback: {
            index: url.parse(options.dev ? 'https://localhost:30600/assets/' : publicPath).pathname
        }
        // proxy: {
        //     '/api/': {
        //         target: 'http://127.0.0.1:8080',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // },
        // historyApiFallback: {
        //     index: url.parse(options.dev ? 'http://localhost:12005/assets/' : publicPath).pathname
        // }
    }
    // devtool: options.dev ? '#eval-source-map' : '#source-map'
});

```