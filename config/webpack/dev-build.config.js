const mergeThem = require('webpack-merge');
const baseConfig = require('./dev.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = mergeThem(baseConfig, {
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/bundle.css',
            chunkFilename: '[id].css'
        })
    ]
});
