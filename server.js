const http = require('http');
const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const webpackConfig = require('./webpack/common.config');
// const config = require('./config');

const compiler = webpack(webpackConfig);
const app = express();

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHot(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));
app.use(morgan('short'));
app.use(express.static(__dirname + '/'));
app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 7070, function onListen() {
  console.log(' --> Server started: http://localhost:%d', server.address().port);
});
