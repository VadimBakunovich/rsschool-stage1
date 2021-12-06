const { resolve } = require('path');

const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getFileName = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: `${getFileName('js')}`,
    assetModuleFilename: 'assets/[name][ext]',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: resolve(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      minify: { collapseWhitespace: isProd }
    }),
    new MiniCssExtractPlugin({
      filename: `${getFileName('css')}`
    }),
    new ESLintPlugin()
  ],
  devtool: isDev ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
};