const { debug } = require("console");
const path = require("path");

const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "wordrelay-setting",

  mode: "development",

  devtool: "eval-source-map",

  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./src/client"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              { targets: { browsers: ["> 1% in KR"] }, debug: true },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
      },
    ],
  },

  plugins: [new RefreshWebpackPlugin()],

  output: {
    path: path.join(__dirname, "public"),
    filename: "app.js",
    publicPath: "/public",
  },
  devServer: {
    devMiddleware: { publicPath: "/public" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
