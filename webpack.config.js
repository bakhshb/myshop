var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: ['bootstrap-loader','./static/js/index',],
  output: {
      path: path.resolve('./static/assets/webpack_bundles/'),
      filename: "[name]-[hash].js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:['react', 'es2015']
        }
      }, // to transform JSX into JS
      {
        test: /\.scss?$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader!style-loader'),

      },
      { 
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, 
        loader: 'imports-loader?jQuery=jquery',
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' },
    ]
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin({filename: 'styles.css',  allChunks: false }),
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
    }),
  ]
}
