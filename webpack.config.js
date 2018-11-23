const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const publicPath = devMode ? "/" : "/botanist/";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

let config = {
  entry: {
    index: ["@babel/polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: devMode
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"]
      },
      // SCSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              publicPath: publicPath,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("postcss-flexbugs-fixes"),
                require("autoprefixer")({
                  browsers: ["last 3 versions"]
                })
              ]
            }
          },
          "sass-loader"
        ]
      },
      // FONTS/IMAGES
      {
        test: /\.(ttf|eot|otf|woff|woff2|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
              publicPath: publicPath
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jp(e?)g)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
          publicPath: publicPath,
          outputPath: "./"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      devMode
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "[name].css" : "styles/[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "styles/[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      filename: "index.html",
      title: require("./package").name,
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
