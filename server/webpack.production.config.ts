const path = require('path')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.graphql?$/,
                loader: 'webpack-graphql-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.mjs', '.js'],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        plugins: [new TsconfigPathsPlugin()]
    },
    node: {
        console: true,
        __filename: false,
        __dirname: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
}
