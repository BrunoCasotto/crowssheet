'use strict'

const path = require( 'path' )
const webpack = require("webpack")

const base_path = path.resolve(__dirname, 'resources/assets/js')
const base_sass = path.resolve(__dirname, 'resources/assets/sass')

module.exports = {
    entry: [
        path.join(base_sass, 'main.scss'),
        path.join(base_path, 'app.js')
    ],
    output: {
        path: './dist/js',
        publicPath: './dist/',
        filename: 'bundled.js'
    },
    devtool: 'source-map',
    resolve: {
        alias:{
            _app: base_path,
            _common: path.join(base_path, 'common'),
            _components: path.join(base_path, 'components'),
            _services: path.join(base_path, 'services'),
            _util: path.join(__dirname, 'resources', 'assets', 'js', 'vuex'),
            _vuex: path.join(__dirname, 'resources', 'assets', 'js', 'vuex'),
            _image: path.join(base_path, 'img')
        }
    },
    module: {
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
                test: /\.scss$/,
                loader: "style!css!sass"
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=dist/fonts/[name].[ext]'
            }
        ],
        vue: {
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