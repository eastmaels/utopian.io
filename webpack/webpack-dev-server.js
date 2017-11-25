const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssFlexbugs = require('postcss-flexbugs-fixes');

const baseDir = path.resolve(__dirname, '..');

require('dotenv').config();

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
        STEEMCONNECT_IMG_HOST: JSON.stringify(process.env.STEEMCONNECT_IMG_HOST || 'https://img.busy.org'),
        SENTRY_PUBLIC_DSN: null,
        STEEMCONNECT_HOST: JSON.stringify(process.env.STEEMCONNECT_HOST || 'https://v2.steemconnect.com'),
        STEEMCONNECT_REDIRECT_URL: JSON.stringify(process.env.STEEMCONNECT_REDIRECT_URL || 'http://localhost:3000/callback'),
        STEEM_NODE: JSON.stringify(process.env.STEEM_NODE || 'https://api.steemit.com'),
        UTOPIAN_STEEM_ACCOUNT: JSON.stringify(process.env.UTOPIAN_STEEM_ACCOUNT || 'utopian-io'),
        UTOPIAN_CATEGORY: JSON.stringify(process.env.UTOPIAN_CATEGORY || 'test-category'),
        UTOPIAN_LANDING_URL: JSON.stringify(process.env.UTOPIAN_CATEGORY || 'http://join.utopian.io'),
        UTOPIAN_API: JSON.stringify(process.env.UTOPIAN_API || 'http://localhost:4040/api/'),
        UTOPIAN_GITHUB_CLIENT_ID: JSON.stringify(process.env.UTOPIAN_GITHUB_CLIENT_ID || '1ed58da028b638550c03'),
        UTOPIAN_GITHUB_REDIRECT_URL: JSON.stringify(process.env.UTOPIAN_GITHUB_REDIRECT_URL || 'http://localhost:3000/github/callback'),
        STEEMJS_URL: JSON.stringify(process.env.STEEMJS_URL),
        IS_BROWSER: JSON.stringify(true),
        PUSHPAD_PROJECT_ID: process.env.PUSHPAD_PROJECT_ID,
        BUSYPUSH_ENDPOINT: process.env.BUSYPUSH_ENDPOINT,
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
        test: /\.css|.less$/,
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
    port: 3000,
    contentBase: path.resolve(baseDir, 'dist'),
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/callback': 'http://localhost:3001',
    },
  },
};
