const path = require('path')
const { lib } = require('serverless-webpack')

module.exports = {
  entry: lib.entries,
  target: 'node',
  externals: ['aws-sdk'],
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src')],
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'stage-3',
              ['env', { targets: { node: '6.10' }, modules: false }],
            ],
          },
        },
      },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.(yml|yaml)$/, use: ['json-loader', 'yaml-loader'] },
    ],
  },
}