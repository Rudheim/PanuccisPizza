const path = require('path');

module.exports = {
  entry: {
    app: './src/App.js',
    adminApp: './src/Admin.js'}
    ,
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
};

