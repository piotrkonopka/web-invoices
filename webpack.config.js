const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// paths
const appPath = path.resolve(__dirname, './client');
const distPath = path.resolve(__dirname, './dist');
const nodeModulesPath = path.resolve(__dirname, './node_modules');

module.exports = () => {
    const config = {
        entry: {
            index: `${appPath}/index.js`
        },
        output: {
            path: distPath,
            filename: `[name].js`
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js'],
            modules: [appPath, nodeModulesPath]
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.(pug|jade)$/,
                    loaders: ['html-loader', 'pug-html-loader']
                },
                {
                    test: /\.scss$/, 
                    loader: ['style-loader', 'css-loader', 'sass-loader']
                }, 
                {
                    test: /\.css$/, 
                    loader: ['style-loader', 'css-loader']
                }, 
                {
                    test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff(2)?)$/, 
                    loader: 'url-loader'
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: `${appPath}/index.html`,
                    to: distPath
                }
            ])
        ]
    };

    return config;
};
