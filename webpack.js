const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'demoApp', 'app.js'),
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'redux-boom': path.join(__dirname, 'redux-boom'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'env'],
            compact: false,
            plugins: ['transform-object-assign'],
          },
        },
      }
    ],
  },
  target: 'web'
}