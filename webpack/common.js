import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const basePath = (file) => path.resolve(process.cwd(), file)

const webpackConfig = {

  entry: {
    'app': basePath('site/index.js'),
  },

  output: {
    path: basePath('build'),
    filename: '[name].[hash:6].js',
    chunkFilename: '[id].[hash:6].js',
    publicPath: '/',
  },

  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "env",
                                {
                                    "modules": false,
                                    "loose": true
                                }
                            ],
                            'react'
                        ],
                        plugins: ["transform-decorators-legacy"]
                    }
                }
            ]
        },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:4]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
    ],
  },

  resolve: {
    modules: [
      basePath('site'),
      'node_modules',
    ],
    extensions: [ '.js', '.scss' ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Scentbird',
      template: basePath('site/index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
}


export default webpackConfig
