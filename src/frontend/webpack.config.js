const NODE_ENV = process.env.NODE_ENV == 'development';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  context: __dirname,

  entry: {
    main: [
      'webpack-hot-middleware/client?http://localhost:3000/__webpack_hmr&reload=true',
      './app/index'
    ]
  },

  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: "build.js"
  },

  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx$/,
        loaders: ['react-hot-loader/webpack', 'jsx', 'babel-loader']
      },
      {
        test: /\.(png|img|gif)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
      }]
  },

  devtool: "cheap-inline-module-source-map",

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
      disable: NODE_ENV
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      IN_BROWSER: true,
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],

  resolve: {
    modulesDirectories: ['./frontend', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.scss']
  }


};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // don't show unreachable variables etc
        warnings:     false,
        drop_console: true,
        unsafe:       true
      }
    })
  );
}
