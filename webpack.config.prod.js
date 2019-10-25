const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

process.env.NODE_ENV = "production";

module.exports = {
    mode: "production",
    target: "web",
    devtool: "source-map",
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        // Display bundle stats
        new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css"
        }),
    
        new webpack.DefinePlugin({
          // This global makes sure React is built in prod mode.
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
          template: "src/index.html",
          minify: {
            // see https://github.com/kangax/html-minifier#options-quick-reference
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
        })
      ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // fallback to style-loader in development
                  process.env.NODE_ENV !== 'production'
                    ? 'style-loader'
                    : MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
              },
        ]
    }
};
