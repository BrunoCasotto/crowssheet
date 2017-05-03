const path = require( 'path' )
const webpack = require("webpack")
const base_path = path.resolve(__dirname, 'resources/')
const base_js = path.resolve(base_path, 'assets/js')
const base_sass = path.resolve(__dirname, 'resources/assets/sass')

module.exports = {
    entry: [
        path.join(base_sass, 'main.scss'),
        path.join(base_js, 'app.js')
    ],
    output: {
        path: './dist/js',
        publicPath: '/dist/',
        filename: 'bundled.js'
    },
    devtool: 'source-map',
    resolve: {
        alias:{
            _components: path.join(base_js,'components'),
            _helpers: path.join(base_js,'helpers'),
            _common: path.join(base_js, 'common'),
            _service: path.join(base_js,'service'),
            _vuex: path.join(__dirname, 'resources', 'assets', 'js', 'vuex'),
            _config: path.join(base_sass,'config'),
            _image: path.join(base_path, 'img'),
            _npm: path.join(__dirname, 'node_modules'),
            _external: path.join(__dirname, 'config'),
            'vue$': path.join(__dirname, 'node_modules', 'vue/dist/vue.common.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 4 versions', 'IE 10']
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=dist/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
       new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       })
    ]
}