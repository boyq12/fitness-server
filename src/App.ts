import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import * as session from "express-session";

require("./libs/extend");
var serveStatic = require('serve-static');
var upload = require('multer')({dest: 'public/uploads/'}).any();
var port;

export default class App {
  public express: express.Application;
  public server: http.Server;

  constructor(options) {


    var debugName = options.debug ||
      (__filename.split('/').pop().split('.').shift());

    this.express = express();
    this.viewEngine(options);
    this.middleware(options);
    this.routes(options);
    this.serverInit(options);
  }

  private viewEngine(options) {
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.set('view engine', 'jade');
  }

  private middleware(options): void {
    this.express.use(acceptCors);
    this.express.use(logger('dev'));
    this.express.use(upload);
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(cookieParser());
    this.express.use(session({secret: 'eyeteam.vn', cookie: {maxAge: 60 * 60000}}));
  }

  private routes(options): void {

    var routes = require(options.routePath);

    this.express.get('/hello', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });

    if (!options.staticFirst) {
      this.express.use('/', routes);
    }

    if (!options.publicDirs) {
      console.log('Server public default:', path.join(__dirname, 'public'));
      this.express.use(serveStatic(path.join(__dirname, 'public')));
    } else {
      for (var dir of options.publicDirs) {
        let fullPath = path.join(__dirname, dir.path);
        let opts = Object.assign({}, {}, dir.opts);
        console.log('Server static:', dir.route, 'to', fullPath);
        this.express.use(dir.route, serveStatic(fullPath, opts));
      }
    }

    if (options.staticFirst) {
      this.express.use('/', routes);
    }
  }

  private serverInit(options) {
    var debugName = options.debug ||
      (__filename.split('/').pop().split('.').shift());
    var debug = require('debug')(debugName);

    port = normalizePort(options.port);
    this.express.set('port', port);

    this.server = http.createServer(this.express);
    this.server.listen(port);
    console.log("Listening to port ", port);
    this.server.on('error', onError);
    this.server.on('listening', onListening(debug));
  }
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = ((typeof port) === 'string' ? 'Pipe ' + port : 'Port ' + port);

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(debug) {
  return function () {
    var server = this;
    var addr = server.address();
    var bind = typeof addr === 'string' ?
      'pipe ' + addr :
      'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}


function notFound(req, res, next) {
  var err = new Error('Not Found');
  res.status = 404;
  next(err);
}

function errorDevelopment(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
}

function errorProduction(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}

function acceptCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTION");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
