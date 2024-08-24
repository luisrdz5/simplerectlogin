const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

// Carga las variables de entorno
dotenv.config();

let plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    template: './public/index.html',
    filename: './index.html'
  }),
];


if (isDevelopment) {
  plugins.push(new Dotenv({ path: './.env.development' }));
} else {
  if (isTest){
      plugins.push(new Dotenv({ path: './.env.test' }));
  }else{
      plugins.push(new Dotenv({ path: './.env.production' }));
  }
}


module.exports = {
  mode: 'development', // o 'production' según tu entorno
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Modificado para manejar archivos .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css|.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              //import: [path.resolve(__dirname, './src/styles/Variables.styl')]
            },
          },

        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Modificado para resolver extensiones .jsx
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    open: false,
    hot: true, 
  },
  plugins: plugins,
};