const path = require('path');
const DotEnv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const aliases = require('./aliases');
const { paths, host, PROJECT_NAME } = require('./constants');

module.exports = {
  entry: paths.entry,
  mode: 'development',
  target: 'web',
  devServer: {
    host,
    hot: true,
    port: 3000,
    compress: true,
    historyApiFallback: true
  },
  output: {
    path: paths.output,
    filename: 'bundle.[fullhash:6].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: aliases
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: PROJECT_NAME,
      template: paths.template,
      filename: './index.html'
    }),
    new DotEnv({
      path: paths.env,
      systemvars: true
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader'
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
            loader: 'style-loader'
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
          {
            loader: 'postcss-loader'
          }
        ]
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
      },
      {
        test: /\.(png|jpg|gif|woff|svg|woff2|eot|ttf|otf)$/,
        exclude: path.resolve(process.cwd(), paths.icons),
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[hash:8][ext]'
        }
      }
    ]
  }
};
