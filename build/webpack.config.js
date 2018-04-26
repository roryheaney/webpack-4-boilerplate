const path = require('path')
const isdev = require('isdev')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const CopyPlugin = require('copy-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { default: ImageminPlugin } = require('imagemin-webpack-plugin')

const sassRule = require('./rules/sass')
const fontsRule = require('./rules/fonts')
const imagesRule = require('./rules/images')
const javascriptRule = require('./rules/javascript')
const externalFontsRule = require('./rules/external.fonts')
const externalImagesRule = require('./rules/external.images')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const config = require('./app.config')

const MODE_BEING_RUN = process.env.npm_lifecycle_event


module.exports = {

    /**
     * Should the source map be generated?
     * @type {string|undefined}
     */
    devtool: (!MODE_BEING_RUN === 'production' && config.settings.sourceMaps) ? 'source-map' : undefined,

    /**
     * Application entry files for building.
     * @type {Object}
     */
    entry: config.assets,

    /**
     * Output settings for application scripts.
     * @type {Object}
     */
    output: {
        path: config.paths.public,
        filename: config.outputs.javascript.filename
    },

    /**
     * split js for production js optimimzation
     * @type {Object}
     */
    /**
        ,
    */
    optimization: {},

    /**
     * External objects which should be accessible inside application scripts.
     * @type {Object}
     */
    externals: config.externals,

    /**
     * Performance settings to speed up build times.
     * @type {Object}
     */
    performance: {
        hints: false
    },

    /**
     * Build rules to handle application assset files.
     * @type {Object}
     */
    module: {
        rules: [
            sassRule,
            fontsRule,
            imagesRule,
            javascriptRule,
            externalFontsRule,
            externalImagesRule,
        ]
    },
    
    /**
     * Common plugins which should run on every build.
     * @type {Array}
     */
    plugins: [
        new webpack.LoaderOptionsPlugin({ 
            minimize: !isdev,
            // postcss: {}
        }),
        new ExtractTextPlugin(config.outputs.css),
        new CleanPlugin(config.paths.public, { root: config.paths.root }),
        // new StyleLintPlugin(),
        new CopyPlugin([{
            from: {
                glob: `${config.paths.images}/**/*`,
                flatten: true,
                dot: false
            },
            to: config.outputs.image.filename,
        }]),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                proxy: 'http://default-timber---wordpress.local/',
                files: [
                    {
                        match:[
                            "*.php", 
                            "templates/*.php",
                            "partials/**/*.php", 
                            "lib/**/*.php",
                            "*.twig",
                            "templates/**/**/*.twig",
                        ]
                    },
                    
                ],
                reload: false
            },
            {
                injectCss: true
            }
        )
    ]
}


if(MODE_BEING_RUN === 'production'){

    module.exports.plugins.push(
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true
            }
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: { optimizationLevel: 7 },
            gifsicle: { optimizationLevel: 3 },
            pngquant: { quality: '65-90', speed: 4 },
            svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false }
        })
    );
    Object.assign(module.exports.optimization,{
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        },
        runtimeChunk: true
    })

}