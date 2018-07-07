const path = require('path');
const webpack = require('webpack');

const config = {
  mode: 'production',
  entry: {
    mycal: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].min.js',
    library: 'mycal',
    libraryTarget: 'window'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true
  }
};

module.exports = config;
