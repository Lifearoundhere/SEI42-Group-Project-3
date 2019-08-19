const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      // { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, loader: ['style-loader', 'css-loader', 'file-loader'] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: ['file-loader'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  devServer: {
    contentBase: 'src',
    hot: true,
    open: true,
    port: 8000,
    watchContentBase: true,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new Dotenv()
  ]
}
