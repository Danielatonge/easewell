const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: '/',
    filename: 'main.[contenthash].js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: 'src/about.html',
    //   filename: 'about/index.html',
    // }),

    new CopyPlugin({
      patterns: [
        { from: 'src/images/icons', to: 'icons' },
        { from: 'src/images', to: 'images' },
        { from: 'src/files/sitemap.xml', to: 'sitemap.xml' },
        { from: 'src/files/robots.txt', to: 'robots.txt' },
      ],
    }),
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader',
    },
    {
      test: /.(sa|sc|c)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
      ],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[hash][ext][query]',
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[hash][ext][query]',
      },
    },
    ],
  },

  devServer: {
    open: true,
    host: 'localhost',
  },
};
