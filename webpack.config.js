const path = require( 'path' )
const webpack = require("webpack")

const base_path = path.resolve(__dirname, 'resources/assets/js')

// webpack.config.js
module.exports = {
    // entry point of our application
    entry: path.join(base_path, 'app.js'),
    // where to place the compiled bundle
    output: {
        path: './dist/js',
        publicPath: './dist/',
        filename: 'bundled.js'
    },
    devtool: 'source-map',
    resolve: {
    // add alias for application code directory
        alias:{
            _app: base_path,
            _common: path.join(base_path, 'common'),
            _components: path.join(base_path, 'components'),
            _services: path.join(base_path, 'services'),
            _util: path.join(base_path, 'util'),
            _vuex: path.join(base_path, 'vuex'),
            _image: path.join(base_path, 'img')

            // jquery: path.resolve(__dirname, 'node_modules', 'jquery')
        }
    },
    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [
            {
                test: /\.vue$/, // a regex for matching all files that end in `.vue`
                exclude: /node_modules/,
                loader: 'vue'   // loader to use for matched files
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=dist/fonts/[name].[ext]'
            }
        ],
        vue: {
            // configure autoprefixer
            autoprefixer: {
                browsers: ['last 2 versions', 'IE 10']
            }
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
       new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       })
    ]
}