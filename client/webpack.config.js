const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {

plugins: [

  new HtmlWebpackPlugin({
    template: './index.html',
    title: 'Just another text editor',
  }),

  new InjectManifest({
    swSrc: './src-sw.js',
    swDest: 'src-sw.js',
  }),
  new WebpackPwaManifest({
    filename: 'manifest.json',
    fingerprints: false,
    inject: true,
    name: 'Just another text editor',
    short_name: 'J.A.T.E.',
    description: 'Text editor progressive web app',
    background_color: '#225ca3',
    start_url: './',
    publicPath: './',
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512], // different sizes
        destination: path.join('assets', 'icons'),
      },
    ]
  }),
],

  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', "css-loader"]
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presents: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
        },
      },
    },
  ],
};
