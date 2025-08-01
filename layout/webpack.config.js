const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
        publicPath: '/',
      },
      {
        directory: path.join(__dirname, '../common'), // atau folder luar kamu
        publicPath: '/common',
      }
    ],
    // static: '.',
    open: true,
    port: 3000,
  },
  mode: 'development',
};