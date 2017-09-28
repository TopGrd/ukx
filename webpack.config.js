const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve(__dirname, './src')],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve(__dirname, './src')],
      },
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    inline: true,
    clientLogLevel: 'none',
    progress: true,
  },
}
