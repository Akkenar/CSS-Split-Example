import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const criticalCss = new ExtractTextPlugin({
  filename: '[name].critical.css',
  allChunks: true,
});

export default {
  mode: 'development',
  target: 'web',
  entry: './entry.js',
  context: path.join(__dirname, 'src'),

  output: {
    path: path.join(__dirname, 'target', 'build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.critical\.scss$/,
        use: criticalCss.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /(?!\.critical)\.scss$/,
        exclude: /critical/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    criticalCss,
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
      },
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
