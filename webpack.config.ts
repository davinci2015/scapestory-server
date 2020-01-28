import * as path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import * as nodeExternals from 'webpack-node-externals'

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.graphql'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.(graphql)$/, exclude: /node_modules/, loader: 'webpack-graphql-loader'},
        ],
    },
    node: {
        console: true,
        __filename: false,
        __dirname: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    target: 'node',
    externals: [nodeExternals()],
}
