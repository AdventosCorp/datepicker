var webpack = require("webpack");

var config = {
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        path: __dirname + "/dist",
        filename: "datepicker.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: 'style!css?sourceMap!'
            },
            {
                test: /\.svg$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};

module.exports = config;
