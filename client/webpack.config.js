const path = require('path')
const merge = require('webpack-merge')
const parts = require('./webpack.parts')

process.env.BABEL_ENV = process.env.npm_lifecycle_event

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
}

const common = merge(
  {
    entry: {
      app: PATHS.app,
    },
    resolve: {
      modules: ['node_modules', PATHS.app],
      extensions: ['.js', '.jsx', '.json'],
    },
  },
  parts.indexTemplate({
    title: 'Huaraz Adventures',
    description: 'Climbing guides in the Peruvian Andes.',
    keyWords: ['andes', 'mountain', 'guides'],
    appMountId: 'app',
  }),
  parts.loaders({ include: PATHS.app }),
  parts.minify(),
)

let config

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js',
          publicPath: '/',
        },
      },
      parts.clean([PATHS.build]),
      parts.extractCSS({ include: PATHS.app }),
      parts.setFreeVariable('process.env.BACKEND_URL', 'https://api.huaraz-adventures.com/prod'),
      parts.analyze(),
    )
    break
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
        output: {
          filename: '[name].js',
          publicPath: '/',
        },
      },
      parts.devServer({ host: '0.0.0.0', port: 3000 }),
      parts.loadCSS({ include: PATHS.app }),
      parts.setFreeVariable('process.env.BACKEND_URL', 'http://localhost:4000'),
      parts.enableReactPerformanceTools(),
    )
}

module.exports = config
