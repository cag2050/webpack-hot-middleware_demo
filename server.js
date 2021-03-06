var http = require('http');
var express = require('express');
var app = express();

app.use(require('morgan')('short'));

(function () {

    // Step 1: Create & configure a webpack compiler
    var webpack = require('webpack');
    // 使用 webpack.config.js
    var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
    var compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
})();

// Do anything you like with the rest of your express application.

// server.js 使用
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// server.multientry.js 使用
app.get("/multientry", function (req, res) {
    res.sendFile(__dirname + '/index-multientry.html');
});

if (require.main === module) {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 1616, function () {
        console.log("Listening on %j", server.address());
    });
}
