module.exports = {
    context: __dirname + '/app',
    entry: './index.js',
    output: {
        path: __dirname + '/public/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel',
              query: {
                presets: ['react', 'es2015']
              }
            }
        ]
    }
}
