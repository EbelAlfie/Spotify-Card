const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.export = {
    mode: 'development',
    entry : "./index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
    ] 
}