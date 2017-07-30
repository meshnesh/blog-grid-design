const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
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
    ]

}