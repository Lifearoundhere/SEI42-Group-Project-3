const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const env = process.env.NODE_ENV === 'development' ? (
  new Dotenv()
) : (
  new webpack.EnvironmentPlugin({ ...process.env })
)

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader',
        options: {
          outputPath: 'webpack-assets/', // Output location for assets. Final: `app/assets/webpack/webpack-assets/`
          publicPath: 'webpack-assets/' // Endpoint asset can be found at on Rails server
        }
      }

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
    env
  ]
}
