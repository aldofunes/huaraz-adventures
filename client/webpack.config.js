const path = require('path')
const merge = require('webpack-merge')
const parts = require('./webpack.parts')

process.env.BABEL_ENV = process.env.npm_lifecycle_event

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: {
    dev: path.join(__dirname, 'build-dev'),
    prod: path.join(__dirname, 'build-prod'),
  }
}

const common = merge(
  {
    entry: {
      app: PATHS.app,
    },
    resolve: {
      modules: [PATHS.app, 'node_modules'],
      extensions: ['.js', '.jsx', '.json'],
    },
  },
  parts.indexTemplate({
    title: 'Huaraz Adventures',
    description: 'Climbing guides in the Peruvian Andes.',
    keyWords: ['andes','mountain','guides'],
    appMountId: 'app'
  }),
  parts.loadImages({ include: PATHS.app }),
  parts.loadFonts({ include: [PATHS.app, /node_modules/] }),
  parts.loadJSX({ include: PATHS.app, exclude: /node_modules/ }),
  parts.loadJSON({ include: PATHS.app }),
  parts.loadYaml({ include: PATHS.app }),
  parts.loadGraphQL({ include: PATHS.app })
)

let config

switch (process.env.npm_lifecycle_event) {
  case 'build:dev':
    config = merge(
      common,
      {
        output: {
          path: PATHS.build.dev,
          filename: '[name].[chunkhash].js',
          publicPath: '/'
        }
      },
      parts.clean([PATHS.build.dev]),
      parts.extractCSS({ include: PATHS.app }),
      parts.setFreeVariable('process.env.NODE_ENV', 'development')
    )
    break
  case 'build:prod':
    config = merge(
      common,
      {
        output: {
          path: PATHS.build.prod,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js',
          publicPath: '/'
        }
      },
      parts.clean([PATHS.build.prod]),
      parts.extractCSS({ include: PATHS.app }),
      parts.setFreeVariable('process.env.NODE_ENV', 'production'),
      parts.analyze()
    )
    break
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
        output: {
          filename: '[name].js',
          publicPath: '/'
        }
      },
      parts.devServer({ host: '0.0.0.0', port: 3000 }),
      parts.loadCSS({ include: PATHS.app }),
      parts.setFreeVariable('process.env.NODE_ENV', 'local'),
      parts.enableReactPerformanceTools()
    )
}

module.exports = config
