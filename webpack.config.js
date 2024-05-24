const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/calendar.ts',
    output: {
        filename: 'calendar.js',
        path: path.resolve(__dirname, 'htdocs'),
    },
}