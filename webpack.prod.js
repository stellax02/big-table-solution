
const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: function () {
                                return [autoprefixer, cssnano]

                            }
                        }
                    },
                    { loader: 'sass-loader' },
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
                        presets: [
                            ['@babel/preset-env', {"useBuiltIns": "usage"}]
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: false, // Note `mangle.properties` is `false` by default.
              output: null,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_fnames: true,
            },
          }),
        ],
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
        new ImageminPlugin({
            bail: false,
            cache: true,
            name: '[path][name].[ext]',
            test: /\.(jpe?g|png|gif|svg)$/i,
            // start @TODO: remove /icons/ folder when svg sprite plugin applied
            include: /\/images/|/\/icons/,
            // end @TODO
            exclude: /\/fonts/,
            imageminOptions: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    ['svgo', {
                        plugins: [{ removeViewBox: false }]
                        }
                    ]
                ]
            }
        }),
    ]
});
