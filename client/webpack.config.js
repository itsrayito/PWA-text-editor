const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  path: path.resolve(__dirname, 'dist'),
},
plugins: [

  new HtmlWebpackPlugin({
    template: './index.html',
    title: 'Webpack Plugin',
  }),
  new MiniCssExtractPlugin(),
  new InjectManifest({
    swSrc: './src/sw.js',
    swDest: 'service-worker.js',
  }),
  new WebpackPwaManifest({

    filename: 'manifest.json',
    name: 'Just another text editor',
    short_name: 'JATE',
    description: 'Text editor progressive web app',
    background_color: '#225ca3',
    fingerprints: false,
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512], // different sizes
        destination: path.join('assets', 'icons'),
      },
    ]
  }),
],

module: {
  rules: [
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presents: ['@babel/preset-env'],
        },
      },
    },
  ],
};
