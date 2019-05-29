var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const VueLoaderPlugin = require('vue-loader/lib/plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
function assetsPath(_path) {
  return path.posix.join('static', _path)
}
const devMode = process.env.NODE_ENV
module.exports = {
  mode: devMode,
  entry: {
    main: resolve('src/main.js'),
    vendor: ['vue', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: assetsPath('js/[name].js'),
    chunkFilename: assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        use: [
          devMode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          devMode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: assetsPath('imgs/[name].[ext]?[hash]')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: assetsPath('fonts/[name].[ext]?[hash]')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode === 'development' ? '[name].css' : assetsPath('css/[name].css'),
      chunkFilename: devMode === 'development' ? '[name].css' : assetsPath('css/[name].[chunkhash].css')
    })
  ]
}
if (devMode === 'production') {
  // module.exports.devtool = '#source-map'
  module.exports.optimization = {
    splitChunks: {
      name: 'common',
      chunks: 'all'
    }
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin(),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new HtmlWebpackPlugin({
      title: 'xx',
      template: 'index.html',
      filename: path.resolve(__dirname, 'dist/index.html'),
      favicon: 'td_icon.ico'
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/about'],

      renderer: new Renderer({
        inject: {
          foo: 'bar'
        },
        headless: true,
        renderAfterDocumentEvent: 'render-event'
      })
    })
  ])
} else {
  // NODE_ENV === 'development'
  module.exports.devServer = {
    historyApiFallback: true,
    noInfo: false,
    port: 3123,
    // host: '192.168.1.122',
    open: true,
    hot: true,
    overlay: {
      errors: true
    }
  }
  module.exports.devtool = 'cheap-module-eval-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      title: 'xx',
      template: 'index.html',
      filename: 'index.html',
      favicon: 'td_icon.ico'
    })
  ])
}
