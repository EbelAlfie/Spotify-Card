const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
        publicPath: '/',
      },
      {
        directory: path.join(__dirname, '../common'),
        publicPath: '/common',
      }
    ],
    open: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ],
  mode: 'development',
};