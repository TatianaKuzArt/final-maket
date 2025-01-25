const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './js/bundle.js',
    },

    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            //Компилируем шаблоны в html
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            // Компилируем SCSS в CSS
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract css to separate file
                    'css-loader', // translates CSS into CommonJS
                    'postcss-loader', // parse CSS and add vendor prefixes to CSS rules
                    'sass-loader'
                ]
            },
            // Подключаем шрифты из css
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('fonts', '[name][ext]'),
                },
            },
            // Подключаем картинки из css
            {
                test: /\.(svg|png|jpg|jpeg|webp)$/,
                generator: {
                    filename: path.join('img', '[name][ext]'),
                },
            }
        ],
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
        // Подключаем файл html, стили и скрипты встроятся автоматически
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.pug'),
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: './style.css'
        }),
        // Копируем картинки
        new CopyPlugin({
            patterns: [
                {
                    from: './src/img',
                    to: 'img'
                }
            ]
        })
    ],
    devServer:
        {
            watchFiles: path.join(__dirname, 'src'),
            port: 9000,
        }
};
