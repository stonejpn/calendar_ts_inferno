import url from 'url'
import infernoTsPlugin from 'ts-plugin-inferno';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const dir_name = url.fileURLToPath(new URL('.', import.meta.url));

export default [
    {
        mode: 'development',
        entry: './src/calendar.tsx',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.tsx$/,
                    loader: 'ts-loader',
                    options: {
                        getCustomTransformers: () => ({
                            after: [infernoTsPlugin.default()],
                        }),
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'calendar.js',
            path: dir_name + 'htdocs',
        },
    },
    {
        mode: 'development',
        entry: './src/calendar.sass',
        module: {
            rules: [
                {
                    test: /\.sass/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({filename: 'calendar.css'}),
        ],
        output: {
            /*
             * このファイルは使わないけど、Webpackの仕様なので仕方がない
             * https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
             */
            filename: 'calendar.css.js',
            path: dir_name + 'htdocs'
        },
    },
]
