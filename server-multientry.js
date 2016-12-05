var http = require('http');
var express = require('express');
var app = express();

app.use(require('morgan')('short'));

(function () {

    // 1: 创建一个webpack编译器
    var webpack = require('webpack');
    var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
    var compiler = webpack(webpackConfig);

    // 2: 添加dev middleware到编译器和server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    // 3: 添加hot middleware到编译器和server
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
})();

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get("/multientry", function (req, res) {
    res.sendFile(__dirname + '/index-multientry.html');
});

if (require.main === module) {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 1616, function () {
        console.log("Listening on %j", server.address());
    });
}
