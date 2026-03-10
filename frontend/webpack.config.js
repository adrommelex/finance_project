const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9002,
    historyApiFallback: true,
    hot: true,
    watchFiles: ['./src/**/*'],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env')
    }),
    /*new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),*/
    new webpack.ProvidePlugin({
      bootstrap: 'bootstrap',
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new CopyPlugin({
      patterns: [
        {from: "./src/templates", to: "templates"},
        {from: "./src/static/images", to: "images"},
        {from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "css"},
        {from: "./node_modules/bootstrap/dist/css/bootstrap.min.css.map", to: "css"},
        {from: "./node_modules/bootstrap-icons/font/bootstrap-icons.min.css", to: "css"},
        {from: "./node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff", to: "css/fonts"},
        {from: "./node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2", to: "css/fonts"},
        {from: "./node_modules/flatpickr/dist/flatpickr.min.css", to: "css"},
        {from: "./src/styles/sidebars.css", to: "css"},
        {from: "./src/styles/sign-in.css", to: "css"},
        {from: "./src/utils/sidebars.js", to: "js"},
        {from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", to: "js"},
      ],
    }),
  ]
};