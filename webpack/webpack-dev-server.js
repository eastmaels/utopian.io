const postcssFlexbugs = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const baseDir = path.resolve(__dirname, '..');

require('dotenv').config();

const USE_SSL = process.env.SERVER_SSL_CERT && process.env.SERVER_SSL_KEY;
let STEEMCONNECT_REDIRECT_URL = process.env.STEEMCONNECT_REDIRECT_URL;
let UTOPIAN_API = process.env.UTOPIAN_API;
let UTOPIAN_GITHUB_REDIRECT_URL = process.env.UTOPIAN_GITHUB_REDIRECT_URL;

if (!STEEMCONNECT_REDIRECT_URL) {
  if (USE_SSL) {
    STEEMCONNECT_REDIRECT_URL = 'https://localhost:3000/callback';
    UTOPIAN_API = 'https://localhost:4040/api/';
    UTOPIAN_GITHUB_REDIRECT_URL = 'https://localhost:3000/github/callback';
  } else {
    STEEMCONNECT_REDIRECT_URL = 'http://localhost:3000/callback';
    UTOPIAN_API = 'http://localhost:4040/api/';
    UTOPIAN_GITHUB_REDIRECT_URL = 'http://localhost:3000/github/callback';
  }
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve(baseDir, './src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(baseDir, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        ENABLE_LOGGER: JSON.stringify(process.env.ENABLE_LOGGER),
        IMG_HOST: JSON.stringify(process.env.IMG_HOST || 'https://img.busy.org'),
        SENTRY_PUBLIC_DSN: null,
        STEEMCONNECT_HOST: JSON.stringify(process.env.STEEMCONNECT_HOST || 'https://v2.steemconnect.com'),
        STEEMCONNECT_REDIRECT_URL: JSON.stringify(STEEMCONNECT_REDIRECT_URL),
        STEEM_NODE: JSON.stringify(process.env.STEEM_NODE || 'https://api.steemit.com'),
        SERVER_SSL_CERT: JSON.stringify(process.env.SERVER_SSL_CERT),
        SERVER_SSL_KEY: JSON.stringify(process.env.SERVER_SSL_KEY),
        UTOPIAN_STEEM_ACCOUNT: JSON.stringify(process.env.UTOPIAN_STEEM_ACCOUNT || 'utopian-io'),
        UTOPIAN_CATEGORY: JSON.stringify(process.env.UTOPIAN_CATEGORY || 'test-category'),
        UTOPIAN_LANDING_URL: JSON.stringify(process.env.UTOPIAN_LANDING_URL),
        UTOPIAN_API: JSON.stringify(UTOPIAN_API),
        UTOPIAN_GITHUB_CLIENT_ID: JSON.stringify(process.env.UTOPIAN_GITHUB_CLIENT_ID || '1ed58da028b638550c03'),
        UTOPIAN_GITHUB_REDIRECT_URL: JSON.stringify(UTOPIAN_GITHUB_REDIRECT_URL),
        STEEMJS_URL: JSON.stringify(process.env.STEEMJS_URL),
        IS_BROWSER: JSON.stringify(true),
        PUSHPAD_PROJECT_ID: process.env.PUSHPAD_PROJECT_ID,
        BUSYPUSH_ENDPOINT: process.env.BUSYPUSH_ENDPOINT
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)(\?.+)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                postcssFlexbugs,
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                }),
              ],
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  devServer: {
    https: !!USE_SSL,
    cert: USE_SSL ? fs.readFileSync(process.env.SERVER_SSL_CERT) : undefined,
    key: USE_SSL ? fs.readFileSync(process.env.SERVER_SSL_KEY) : undefined,
    port: 3000,
    contentBase: path.resolve(baseDir, 'dist'),
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/callback': {
        target: USE_SSL ? 'https://localhost:3001' : 'http://localhost:3001',
        secure: false
      }
    }
  }
};
