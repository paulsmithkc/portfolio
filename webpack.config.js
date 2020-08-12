require('dotenv').config();

const path = require('path');
const config = require('config');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const apiHostname = config.get('http.hostname');
const apiPort = config.get('http.port');
const devHostname = config.get('devserver.hostname');
const devPort = config.get('devserver.port');

module.exports = (env) => {
  const isProduction = (env && env.production) || false;
  const isDevServer = (env && env.devServer) || false;

  const webpackConfig = {
    entry: './src/app.js',
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimize: false,
      moduleIds: 'hashed',
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].bundle.css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          include: [path.resolve(__dirname, 'src')],
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
        {
          test: /\.scss$/i,
          include: [path.resolve(__dirname, 'src')],
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          include: [path.resolve(__dirname, 'src')],
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
            publicPath: 'assets/fonts',
            // fonts will be emitted to dist/assets/fonts/ folder
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
            publicPath: 'assets/images',
            // images will be emitted to dist/assets/images/ folder
          },
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: devPort,
      publicPath: `http://${devHostname}:${devPort}/dist`,
    },
  };

  if (isProduction) {
    webpackConfig.optimization.minimize = true;
  }
  if (isDevServer) {
  }

  return webpackConfig;
};
