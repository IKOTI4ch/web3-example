// noinspection JSUnresolvedFunction
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require("webpack");

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, '../../src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      os: require.resolve('os-browserify/browser'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url'),
      https: require.resolve('http-browserify'),
      http: require.resolve('https-browserify'),
      buffer: require.resolve('buffer'),
    },
  },
  stats:{
    logging: 'verbose',
    children: true,
  },
  entry: {
    main: 'index.tsx',
    vendor: [
      // React
      'react',
      'react-dom',

      // Requests
      'axios',

      // Routes
      'react-router-dom',

      // Crypto
      'web3',
    ],
  },
  output: {
    filename: 'javascripts/[name].js?v=[fullhash]',
    chunkFilename: 'javascripts/core/[name].js?v=[fullhash]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Web3',
      template: 'src/index.html',
      // inject: 'head',
      // base: '/'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ],
};
