import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const vendor = ['react', 'react-dom'];

export default {
  name: 'client',
  mode: 'production',
  target: 'web',
  entry: {
    bundle: './entry.js',
    vendor,
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

  optimization: {
    splitChunks: {
      cacheGroups: {
        // Don't generate automatic common chunks
        default: false,
        // Don't generate automatic vendor chunks
        vendors: false,
        // Custom common chunk
        bundle: {
          name: 'commons',
          chunks: 'all',
          minChunks: 3,
          reuseExistingChunk: false,
          // This priority must be lower than the styles one.
          priority: -30,
        },
        // Custom vendor chunk by name
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
        },
        // Extract the critical CSS into a dedicated file
        styles: {
          name: 'critical',
          test: /(\.critical)\.s?css$/,
          chunks: 'all',
          minChunks: 1,
          enforce: true,
          // It's essential that the priority of the critical styles is
          // greater than the priority of the commons, otherwise
          // Webpack will put critical styles in commons.css.
          priority: -20,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
