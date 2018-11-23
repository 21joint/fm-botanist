const path = require("path");
const devMode = process.env.NODE_ENV !== "production";
const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");

let config = merge(common, {
  mode: "production",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [new CleanWebpackPlugin(["dist"])],
  devtool: "source-map"
});

if (!devMode) {
  config.plugins.push(
    new PurgecssPlugin({
      paths: () => glob.sync("./src/**/*", { nodir: true })
    })
  );
}

module.exports = config;
