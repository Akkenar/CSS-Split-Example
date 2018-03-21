import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const vendors = ['react', 'react-dom'];

export default {
  mode: 'production',
  target: 'web',
  entry: {
    main: './entry.js',
    vendors,
  },
  context: path.join(__dirname, 'src'),

  stats: {
    // Disable the verbose output on build
    children: false,
  },

  output: {
    path: path.join(__dirname, 'target', 'build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        // Custom common chunk
        bundle: {
          name: 'commons',
          chunks: 'all',
          minChunks: 3,
          reuseExistingChunk: false,
        },
        // Customer vendor
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          test: 'vendors',
        },
        // Extract the critical CSS into a dedicated file
        styles: {
          name: 'critical',
          test: /(\.critical)\.s?css$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new OptimizeCSSAssetsPlugin(),
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
