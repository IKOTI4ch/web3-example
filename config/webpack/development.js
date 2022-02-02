const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  stats: 'normal',
  devServer: {
    historyApiFallback: true,
    // disableHostCheck: true,
    hot: false
    // inline: false
  },
  module: {
    rules: [
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name]-[fullhash].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[fullhash].[ext]',
          outputPath: 'images/'
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[fullhash:base64:5]'
              },
              importLoaders: 1,
              sourceMap: true

            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['src/views/layouts/Application/stylesheets']
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      safe: true,
      path: '.env.dev',
    }),
    new ESLintPlugin({
      failOnError: false,
      fix: true
    }),
  ],
})
