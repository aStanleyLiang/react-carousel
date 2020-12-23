const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: { landing: './src/landing.tsx' },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    writeToDisk: true,
  },
  watch: true,
  watchOptions: { poll: 1000 },
  output: {
    path: path.join(__dirname, '/static/build/'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/preset-env'],
          },
        },
      },
      {
        test: /.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
          },
        },
      },
      {
        test: /.(sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    alias: {
      '@components': path.resolve(__dirname, '/src/components/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Carousel by react',
      template: 'index.html',
    }),
  ],
}
