const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';
const baseDir = path.resolve(__dirname, '..');

require('dotenv').config();

module.exports = {

  entry: path.resolve(baseDir, './server/index.js'),

  output: {
    filename: 'utopian.server.js',
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(baseDir, 'node_modules'))
    .concat([
      'react-dom/server', 'react/addons',
    ]).reduce((ext, mod) => {
      ext[mod] = `commonjs ${mod}`; // eslint-disable-line
      return ext;
    }, {}),

  node: {
    __filename: true,
    __dirname: true,
  },
  watch: isDevelopment,

  module: {
    loaders: [
      {
        test: /\.(eot|ttf|woff|woff2|svg)(\?.+)?$/,
        loader: 'url-loader',
        options: {
          name: '../fonts/[name].[ext]',
          limit: isDevelopment ? 500000 : 1,
        },
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
            plugins: ['transform-decorators-legacy', 'transform-runtime'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          'isomorphic-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        IMG_HOST: JSON.stringify(process.env.IMG_HOST || 'https://img.busy.org'),
        STEEMCONNECT_HOST: JSON.stringify(process.env.STEEMCONNECT_HOST || 'https://v2.steemconnect.com'),
        STEEMCONNECT_REDIRECT_URL: JSON.stringify(process.env.STEEMCONNECT_REDIRECT_URL || 'https://utopian.io/callback'),
        STEEM_NODE: JSON.stringify(process.env.STEEM_NODE || 'https://api.steemit.com'),
        SERVER_SSL_CERT: JSON.stringify(process.env.SERVER_SSL_CERT || '/etc/letsencrypt/live/utopian.io/fullchain.pem'),
        SERVER_SSL_KEY: JSON.stringify(process.env.SERVER_SSL_KEY || '/etc/letsencrypt/live/utopian.io/privkey.pem'),
        UTOPIAN_CATEGORY: JSON.stringify(process.env.UTOPIAN_CATEGORY || 'utopian-io'),
        UTOPIAN_LANDING_URL: JSON.stringify(process.env.UTOPIAN_CATEGORY || 'http://join.utopian.io'),
        UTOPIAN_API: JSON.stringify(process.env.UTOPIAN_API || 'https://api.utopian.io/api/'),
        UTOPIAN_STEEM_ACCOUNT: JSON.stringify(process.env.UTOPIAN_STEEM_ACCOUNT || 'utopian-io'),
        UTOPIAN_GITHUB_CLIENT_ID: JSON.stringify(process.env.UTOPIAN_GITHUB_CLIENT_ID || '06b0ef5509fc7de00493'),
        UTOPIAN_GITHUB_REDIRECT_URL: JSON.stringify(process.env.UTOPIAN_GITHUB_REDIRECT_URL || 'https://utopian.io/github/callback'),
        STEEMJS_URL: JSON.stringify(process.env.STEEMJS_URL),
        IS_BROWSER: JSON.stringify(false),
      },
    }),
  ],

};
