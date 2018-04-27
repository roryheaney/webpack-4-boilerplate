const isdev = require('isdev')
const stylelint = require("stylelint")
const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require('../app.config')
// const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    test: /\.s[ac]ss$/,
    include: config.paths.sass,
    loader: ExtractTextPlugin.extract({
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    url: false
                }
            },

            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: () => [autoprefixer({
                        browsers: [
                            "> 2%",
                            "last 2 versions",
                            "IE 10"
                        ]
                    })]
                }
            },

            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ],
        fallback: 'style-loader'
    })
}

