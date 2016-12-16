var webpack = require("webpack");

var build_production = false;
var sourceMaps = "?sourceMap";

process.argv.forEach(function (val) {
    if (val == "--production") {
        build_production = true;
        sourceMaps = "";
    }
});

console.log("Building for production: " + build_production);

var config = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "datepicker.js",
        libraryTarget: "umd",
        library: "datepicker",
        umdNamedDefine: true
    },
    externals: {
        "angular": "angular"
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: 'style!css' + sourceMaps + '!'
            },
            {
                test: /\.svg$/,
                loader: 'url-loader'
            }
        ]
    }
};

if (build_production === true) {
    config.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        })
    ];
} else {
    config.devtool = "inline-source-map";
    config.devServer = {
        inline: true,
        port: 4200
    };
}

module.exports = config;
