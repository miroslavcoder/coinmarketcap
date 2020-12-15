const path = require('path');
const webpack = require('webpack');
const outputPath = path.resolve(__dirname, './build');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        entry: {
            app: [
                path.resolve(__dirname, './src/index.js')
            ]
        },
        output: {
            path: outputPath,
            filename: 'bundle.js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        rootMode: "root"
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    loader: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, './index.html'),
                filename: 'index.html',
                path: outputPath
            })
        ],
        watchOptions: {
            ignored: '/node_modules/'
        },
        devServer: {
            contentBase: outputPath,
            port: 8080,
            historyApiFallback: true,
            inline: true,
            hot: true,
            host: '0.0.0.0'
        }
    }
};