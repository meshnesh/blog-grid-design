const path = require('path');
const glob = require('glob');
const webpack = require("webpack");
const PurifyCSSPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const bootstrapEntryPoints = require('./webpack.bootstrap.config');

const isProd = process.env.NODE_ENV === "production";
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", 'sass-loader', 'css-loader?sourceMap!sass-loader?config=sassLoader'],
    publicPath: './dist'
})

const cssConfig = isProd ? cssProd : cssDev;

const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;


module.exports = {
    entry: {
        app: './src/index.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [{
                test: /(\.scss|\.css)$/,
                use: cssConfig
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ["babel-loader", "source-map-loader"],
                enforce: "pre"
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: [
                        // "file-loader?name=imgs/[name].[ext]",
                        "file-loader?name=[name].[ext]&publicPath=&outputPath=imgs/",
                        'image-webpack-loader'
                    ] //custom output path for the images and hash name length
            }, {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            }, {
                test: /\.(ttf|eot|otf)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports-loader?jQuery=jquery'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Grid Layout Blog',
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            template: './src/index.ejs',
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true,
            disable: !isProd
        }),
        new webpack.HotModuleReplacementPlugin({}),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/index.ejs')),
        })
    ]
}