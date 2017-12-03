"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('app-module-path').addPath(__dirname);
require('source-map-support').install();
const logger_1 = require("libs/logger");
const App_1 = require("./App");
const config = require("./libs/config");
const schemas_1 = require("schemas");
var Socket = require('socket.io');
var socketRoute = require('./sockets/route');
require("events/index");
var logger = new logger_1.Logger({
    graylogPort: 12201
});
var app = new App_1.default({
    routePath: './routes/index',
    debug: 'coupon',
    port: config.server.port,
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
schemas_1.sequelize.sync().then(() => {
    global.__dbReady = true;
}).catch(e => {
    console.error("Cannot connect to database");
});

//# sourceMappingURL=server.js.map
