import * as path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import * as nodeExternals from 'webpack-node-externals'

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.graphql'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: 'graphql-tag/loader'},
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
