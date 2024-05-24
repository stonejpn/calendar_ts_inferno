import url from 'url'
import infernoTsPlugin from 'ts-plugin-inferno';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {
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
        path: __dirname + 'htdocs',
    },
}
