var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: ['bootstrap-loader','./static/js/index',],

  output: {
      path: path.resolve('./static/assets/bundles/'),
      filename: "[name]-[hash].js"
  },

  plugins: [
  ], // add all common plugins here

  module: {
    loaders: [] // add all common loaders here
  },

}