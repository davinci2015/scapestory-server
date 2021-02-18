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
        rules: [{test: /\.tsx?$/, loader: 'ts-loader'}],
    },
    node: {
        __filename: false,
        __dirname: false,
    },
    target: 'node',
    externals: [nodeExternals()],
}
