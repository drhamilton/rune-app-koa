module.exports = {
    context: __dirname,
    entry: './index.js',
    output: {
        path: __dirname + '/',
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
