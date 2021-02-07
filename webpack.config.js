module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: `./src/js/script.js`,
    output: {
        path: require('path').resolve(`./dist`),
        filename: `script.js`,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/, 
                exclude: /node_modules/,
                loader: `babel-loader`
            }
        ]
    }
};