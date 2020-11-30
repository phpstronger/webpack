const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js',
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [ // Плагины
        new CleanWebpackPlugin(), // Очистка
        new HtmlWebpackPlugin({ // Создание файла html
            template: './src/index.html',
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/img/static/favicon.ico'),
                    to: path.resolve(__dirname, './dist/img/static'),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
    ],
    module: {  // Модули
        rules: [ // Правила
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../../",
                        }
                    },
                    'css-loader',
                    "resolve-url-loader",
                    "postcss-loader",
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            }
        ]
    },
    optimization: { // Оптимизация
        splitChunks: {
            chunks: "initial",
        }
    }
}