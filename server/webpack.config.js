module.exports = {
    entry: './server/src/main.js',
    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    target: 'node',
    node: {
        fs: 'empty',
        net: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
