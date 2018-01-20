const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

exports.indexTemplate = ({ title, description, appMountId }) => ({
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title,
      appMountId,
      mobile: true,
      meta: [
        { name: 'description', content: description }
      ],
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    }),
    new CopyWebpackPlugin([{ from: 'assets', to: '.' }]),
  ],
})

exports.loaders = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              ['env', { targets: { browsers: ['last 2 versions'] }, modules: false }],
            ],
            plugins: [
              'syntax-dynamic-import',
              'transform-class-properties',
              'transform-object-rest-spread',
              'transform-runtime',
            ],
            env: {
              start: { presets: ['react-hmre'] },
            },
          },
        },
      },
      { test: /\.json$/, use: 'json-loader', include, exclude },
      { test: /\.(yml|yaml)$/, use: 'yaml-import-loader', include, exclude },
      { test: /\.(graphql|gql)$/, use: 'graphql-tag/loader', include, exclude },
      {
        test: /\.(svg|jpg|png)$/,
        use: [{ loader: 'file-loader', options: { outputPath: 'images/' } }],
        include,
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader', options: { outputPath: 'fonts/' } }],
        include,
      },
    ],
  },
})

exports.minify = () => ({
  resolve: {
    alias: {
      '@fortawesome/fontawesome-free-brands$': '@fortawesome/fontawesome-free-brands/shakable.es.js',
      '@fortawesome/fontawesome-free-regular$': '@fortawesome/fontawesome-free-regular/shakable.es.js',
      '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js',
    }
  }
})

exports.enableReactPerformanceTools = () => ({
  module: {
    rules: [
      { test: require.resolve('react'), use: 'expose-loader?React' },
    ],
  },
})

exports.devServer = ({ host = 'localhost', port = 8080 }) => ({
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    disableHostCheck: true,
    host,
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({ multiStep: false }),
    // new webpack.NamedModulesPlugin(),
  ],
})

exports.setFreeVariable = (key, value) => ({
  plugins: [
    new webpack.DefinePlugin({ [key]: JSON.stringify(value) }),
  ],
})

exports.clean = paths => ({
  plugins: [
    new CleanWebpackPlugin(paths, { root: process.cwd() }),
  ],
})

exports.extractCSS = ({ include }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({ filename: '[name].[chunkhash].css' })

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /\.global\.scss$/,
          use: plugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 2,
                  sourceMap: true,
                  localIdentName: '[hash]',
                }
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'sass-loader',
                options: { includePaths: ['./node_modules', include], sourceMap: true }
              },
            ],
          }),
          include,
        },
        {
          test: /\.global\.scss$/,
          use: plugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'sass-loader',
                options: { includePaths: ['./node_modules', include], sourceMap: true },
              },
            ],
          }),
          include,
        },
        {
          test: /\.css$/,
          use: plugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'postcss-loader', options: { sourceMap: true } },
            ],
          }),
          include,
        },
      ],
    },
    plugins: [plugin],
  }
}

exports.loadCSS = ({ include }) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /\.global\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[name]_[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { includePaths: ['./node_modules', include], sourceMap: true }
          },
        ],
        include,
      },
      {
        test: /\.global\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { includePaths: ['./node_modules', include], sourceMap: true },
          },
        ],
        include,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
        include,
      },
    ],
  },
})

exports.analyze = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundleReport.html',
      defaultSizes: 'gzip', // `stat`, `parsed` or `gzip`.
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    }),
  ],
})