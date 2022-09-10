const path = require('path');
const DotEnv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const aliases = require('./aliases');
const { paths, PROJECT_NAME, HOMEPAGE } = require('./constants');

module.exports = {
  entry: paths.entry,
  bail: true,
  mode: 'production',
  target: 'web',
  output: {
    path: paths.output,
    filename: 'bundle.[fullhash:6].js',
    chunkFilename: '[chunkhash].js',
    publicPath: HOMEPAGE
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 2018
        }
      })
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: aliases
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: PROJECT_NAME,
      template: paths.template,
      filename: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new DotEnv({
      path: paths.env,
      systemvars: true
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '[name][ext]',
          filter: (resourcePath) => {
            return !resourcePath.includes('index.html');
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: false,
      filename: '[name].[fullhash].css',
      chunkFilename: '[id].[fullhash].css'
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (path) => path.endsWith('.module.scss'),
                localIdentName: '[name]_[local]__[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (path) => path.endsWith('.module.css'),
                localIdentName: '[name]_[local]__[hash:base64:5]'
              }
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: paths.icons,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[hash:8][ext]'
        }
      },
      {
        test: /icons.*(?<!\.color)\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: (svgPath) => `sprite${svgPath.substr(-4)}`
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      convertShapeToPath: {
                        convertArcs: true
                      },
                      convertPathData: false
                    }
                  }
                }
              ]
            }
          }
        ]
      },
      {
        test: /icons.*\.color\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: (svgPath) => `sprite${svgPath.substr(-4)}`,
          symbolId: (filePath) => path.basename(filePath).slice(0, -10)
        }
      }
    ]
  }
};
