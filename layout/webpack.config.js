const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    target: "node",
    mode: 'development',
    entry : "./index.js",
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "./layout/style.css"
        })
    ] 
}