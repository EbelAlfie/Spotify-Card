const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    target: "web",
    mode: 'development',
    entry : "./index.js",
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // Extract CSS into separate file
                    'css-loader'  // Resolve CSS imports
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "./style.css"
        })
    ] 
}