
const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: function () {
                                return [autoprefixer, cssnano]

                            }
                        }
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: ['./src/scss/base/*.scss']  // pull all resources(variables) from base folder
                        }
                    }

                ]

            },
            {
                test: /\.html?$/,
                 loader: "file-loader?name=[name].[ext]"
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css"
            /* chunkFilename: "[id].css" */
        }),
        new CopyWebpackPlugin([
            {
                from: './src/assets/',
                to: 'assets/'
            }
        ]),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./ directory is being served
            host: 'localhost',
            port: 3000,
            files: ['./*html'],
            server: { baseDir: ['./'] }
        })
    ]
});
