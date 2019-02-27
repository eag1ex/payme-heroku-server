

//  OpenShift sample Node application
// authentication using web token
// https://devdactic.com/restful-api-user-authentication-1/

/// connect mongo server
//  mongod --dbpath c:/data/db
// openShift url : 
Object.assign = require('object-assign');
var express = require('express'),
  app = express(),
  morgan = require('morgan');
//const {cloneDeep} = require('lodash')
const _= require('lodash')      
var routerApp = express.Router();

var fs = require('fs');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var path = require('path');

var q = require('q');
var filters = require('./lib/filters.js');
var appRouter = require('./lib/app.router');
var Ctrl = require('./lib/ctrls.js');
var ejs = require('ejs');
var session = require('./lib/express-sess');
var invoiceApi = require('./lib/invoice-api/invoice-api')
app.use(morgan('dev'));
app.set('trust proxy', 1); // trust first proxy
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
routerApp.use(cors());

session(app);

/// user sessions 
// https://dzone.com/articles/securing-nodejs-managing-sessions-in-expressjs

/////////////////////////////////////
/**
 * https://codeforgeek.com/2015/12/reverse-proxy-using-expressjs/
 * setup proxy server for httpbin.org
 */

// for rendering html
app.engine('html', ejs.__express);  // ejs.renderFile
app.set('view engine', 'html');
app.set('views', path.join(__dirname, config.PUBLIC + '/app'));
app.set('views', path.join(__dirname, config.PUBLIC + '/admin'));

var port = config.port

var authenticate = require('./lib/authenticate.js')(app, jwt, config);
authenticate.postAuth();
authenticate.AppUseAuth();

authenticate.allowedGet.map((item) => { /// this does th magic 
  app.use(`/${item}`, express.static(path.join(__dirname, config.PUBLIC + '/admin')));
})

////////////////////////// RUN THE APP
appRouter(app, routerApp,config).init();

// init invoice api routes
invoiceApi(app)

var ctrls = Ctrl(q,_,filters,config,jwt);  
///////////////////////////

app.get('/login', ctrls.login);
app.get('/signout', ctrls.signout);
app.get('/checkSession', ctrls.checkSession); 

// error handling
app.use(ctrls.errorChecker);

app.listen(port);
console.log('Server running on http://%s:%s',port);

module.exports = app;
