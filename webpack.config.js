const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  target: "node",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js"
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })]
  }
};
