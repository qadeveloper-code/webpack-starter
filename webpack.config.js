// $ npm i -D webpack-dev-server
// $ npm i -D html-loader html-webpack-plugin
// npm i -D css-loader style-loader
// $ npm i -D optimize-css-assets-webpack-plugin
// $ npm i -D file-loader
// npm install --save-dev babel-loader @babel/core
// npm install babel-preset-minify --save-dev
// npm install babel-minify-webpack-plugin --save-dev
// npm install --save-dev @babel/preset-env
// npm install --save-dev clean-webpack-plugin
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // minimize: true,
                    attributes: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin([
            {
                from: 'src/assets',
                to: 'assets/'
            }
        ]),
        new CleanWebpackPlugin(),
    ]

};