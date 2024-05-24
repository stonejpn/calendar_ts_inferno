const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/calendar.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'calendar.js',
        path: path.resolve(__dirname, 'htdocs'),
    },
}