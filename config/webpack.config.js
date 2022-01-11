const path = require('path');
const MiniCssLoader = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = (process.env.NODE_ENV = 'production');

const srcPath = path.resolve(__dirname, '../src');
const publicPath = path.resolve(__dirname, '../public');

const getStyleLoaders = function (preLoaders) {
  return [isProd ? MiniCssLoader.loader : 'style-loader', 'css-loader', 'postcss-loader'].concat(preLoaders || []);
};

const config = {
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(srcPath, './index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: isProd ? '[name].[contenthash:8].js' : '[name].banbel.js',
    assetModuleFilename: 'image/[hash][ext][query]',
    clean: true,
  },
  devServer: {
    port: 8088,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '...'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify/'),
      vm: require.resolve('vm-browserify'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /\\node_modules/,
          name: 'modules',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    maxAssetSize: 1024 * 1024,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/i,
            use: getStyleLoaders(['less-loader']),
          },
          {
            test: /\.(jpe?g|png|bmp)$/i,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
          },
          {
            test: /\.(js|jsx)$/i,
            loader: require.resolve('babel-loader'),
            include: srcPath,
            options: {
              presets: [[require.resolve('babel-preset-react-app')]],
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: publicPath,
    //       to: './',
    //       globOptions: {
    //         ignore: ['**/index.html'],
    //       },
    //     },
    //   ],
    // }),
    isProd && new MiniCssLoader(),
  ].filter(Boolean),
};

module.exports = config;
