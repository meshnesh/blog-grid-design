const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", 'sass-loader', 'css-loader?sourceMap!sass-loader?config=sassLoader'],
    publicPath: './dist'
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /(\.scss|\.css)$/,
            use: cssConfig
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Grid Blog',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.ejs',
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunk: true,
            disable: !isProd
        }),
        new webpack.HotModuleReplacementPlugin({}),
    ]

}