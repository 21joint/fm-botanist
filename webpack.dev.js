const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";
const contentBase = "./dist";
const publicPath = devMode ? "/" : "/botanist/";

module.exports = merge(common, {
    mode: "development",
    devServer: {
        host: "localhost",
        port: process.env.PORT || 3000,
        publicPath: publicPath,
        contentBase: contentBase,
        watchContentBase: true,
        hot: true
    },
    devtool: "inline-source-map"
});
