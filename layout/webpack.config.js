const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    target: "web",
    mode: 'development',
    entry: './index.js',
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
    resolve: {
        fallback: {
            "path": false,
            "os": false,
            "tty": false,
            "fs": false,
            "module": false,
            "vm": false,
            "https": false,
            "http": false
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "style-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ] 
}