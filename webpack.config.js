import url from 'url'
import infernoTsPlugin from 'ts-plugin-inferno';

const dir_name = url.fileURLToPath(new URL('.', import.meta.url));

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
        path: dir_name + 'htdocs',
    },
}
