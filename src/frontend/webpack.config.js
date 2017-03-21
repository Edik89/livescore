const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';
const isProd = NODE_ENV === 'production';

module.exports = {

  context: __dirname,

  entry: {
    main: [
      'webpack-hot-middleware/client?http://localhost:3000/__webpack_hmr&reload=true',
      './app/index'
    ],
    vendor:['react-dom', 'react', 'react-relay', 'react-bootstrap']
  },

  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: "[name].js"
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

  devtool: isProd ? 'cheap-module-source-map' : "cheap-inline-module-source-map",

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles/style.css', {
      allChunks: true,
      disable: !isProd
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: Infinity

    }),
    new webpack.HotModuleReplacementPlugin(),

  ],

  resolve: {
    modulesDirectories: ['./frontend', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.scss']
  }


};

if (isProd) {
  module.exports.plugins.push(

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // don't show unreachable variables etc
        warnings:     false,
        drop_console: true,
        unsafe:       true
      }
    }),

    new webpack.DefinePlugin({
      IN_BROWSER: true,
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),

    new webpack.NoErrorsPlugin()

  );
}
