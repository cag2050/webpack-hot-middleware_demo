var webpack = require('webpack');
// 也可以配置全路径：'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
    context: __dirname,
    entry: {
        client: ['./client.js', hotMiddlewareScript],
        extra: ['./extra.js', hotMiddlewareScript]
    },
    output: {
        path: __dirname,
        publicPath: '/',
        filename: '[name].js'
    },
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
