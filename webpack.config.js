var path = require('path');
var prod = process.env.NODE_ENV === 'production'

module.exports = {
    entry: './app.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },

    context: here('app'),

    devtool: prod? 'source-map' : 'eval',

    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css'},
            { test: /\.html$/, loader: 'raw', exclude: '/node_modules/'},
            { test: /\.js$/, loader: 'babel!jshint', exclude: '/node_modules/'}
        ]
    }
}

function here(p){
    return resolve(__dirname, p)
}

