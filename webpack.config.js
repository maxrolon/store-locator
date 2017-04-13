const path = require('path')
const webpack = require('webpack')

const ENV = process.env.NODE_ENV

const isProd = ( ENV === 'production' || ENV === 'stage' ? true : false )

module.exports = {
  entry: {
    main: ( isProd ? './src/' : ['./test/browser', './css/main.css'] ),
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: ( isProd ? 'index.js' : 'test.js' ),
    library: 'StoreLocator',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['exports-loader', 'babel-loader', 'eslint-loader']
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
    ]
  },
  resolve: {
    alias: {},
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
