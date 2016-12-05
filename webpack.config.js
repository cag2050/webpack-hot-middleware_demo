var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
    context: __dirname,
    entry: {
        // Add the client which connects to our middleware
        client: ['./client.js', hotMiddlewareScript]
    },
    //entry: [
    //  // Add the client which connects to our middleware
    //  // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    //  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    //  './client.js'
    //],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
