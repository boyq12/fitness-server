require('app-module-path').addPath(__dirname);
require('source-map-support').install();
import {Logger, LogType} from "libs/logger";
import App from "./App";
import * as config from "./libs/config";
import {sequelize} from "schemas";
var Socket = require('socket.io');
var socketRoute = require('./sockets/route');
require("events/index");

declare var global: any;
var logger = new Logger({
  graylogPort: 12201
});

var app = new App({
  routePath: './routes/index',
  debug: 'coupon',
  port: process.env.PORT || config.server.port,
  publicDirs: [{
    route: '/assets',
    path: '../client/dist/assets'
  }, {
    route: '/',
    path: 'public'
  }]
});

// Socket.IO "Routes"
var io = Socket(app.server);
io.of('/').on('connection', socketRoute);

sequelize.sync().then(() => {
  global.__dbReady = true;
}).catch(e => {
  console.error("Cannot connect to database");
});
