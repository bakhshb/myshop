var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ENV = process.env.NODE_ENV;

var config = require('./webpack.config.base.js')

// Use webpack dev server
config.entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    './static/js/index',
    ]

// override django's STATIC_URL for webpack bundles
config.output.publicPath = 'http://localhost:3000/static/assets/webpack_bundles/'

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats.json'}),
  new ExtractTextPlugin({filename: '[name].css',  allChunks: false }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV':JSON.stringify(ENV)
  }),

  ])

// Add a loader for JSX files with react-hot enabled
config.module.loaders.push(
  { test: /\.js?$/, exclude: /node_modules/, loaders: ['react-hot-loader', 'babel-loader'] },
  { test: /\.scss?$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader!style-loader')},
  { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery'},
  { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
  { test: /\.(ttf|eot)$/, loader: 'file-loader' },
  { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets:['react', 'es2015']}}) // to transform JSX into JS



module.exports = config
