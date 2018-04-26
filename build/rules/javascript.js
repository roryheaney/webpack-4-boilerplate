const config = require('../app.config')

/**
 * Internal application javascript files.
 * Supports ES6 by compiling scripts with Babel.
 */
module.exports = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        "babel-loader",
        "eslint-loader",
    ],
}
