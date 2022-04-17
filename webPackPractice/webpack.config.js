const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const { NODE_ENV } = env;
  console.log(`[NODE_ENV] >>> ${NODE_ENV}`);
  dotenv.config();
  return {
    entry: "./src/app.js",
    output: {
      clean: true,
      filename: "bundle.js",
      path: path.resolve(__dirname, "public"),
    },
    mode: NODE_ENV,
    devtool: "eval-source-map",
    plugins: [
      new webpack.DefinePlugin({
        APP_NAME: JSON.stringify(process.env.APP_NAME),
      }),
      new webpack.EnvironmentPlugin({ test: "on" }),
      new HtmlWebpackPlugin(),
    ],
    devServer: {
      devMiddleware: { publicPath: "/public" },
      static: {
        directory: path.join(__dirname),
      },
      hot: true,
    },
  };
};
