

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
   
var routerApp = express.Router();

var fs = require('fs');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var bcrypt = require('bcrypt');
var config = require('./config');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var path = require('path');
var newsApi = require('./lib/newsapi-api')

var q = require('q');
var _ = require('lodash');
var filters = require('./lib/filters.js');
var appRouter = require('./lib/app.router');
var Ctrl = require('./lib/ctrls.js');
var ejs = require('ejs');
var session = require('./lib/express-sess');
var serverProxy = require('./lib/serverProxy');
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




//////////////////////////////////////////
/////////// authenticate all requests
// POST: /authenticate

app.get("/spike-api/news/headlines/:search", function(req, res) {
  var search = req.params.search || 'all';
  if(search==='all')search=''

  newsApi(search,'headlines',(resp)=>{
    if(resp.error){
      return res.status(400).json(resp.error);
    }else{
      return res.status(200).json(resp);
    } 
  }) 

});
app.get("/spike-api/news/everything/:search", function(req, res) {
  var search = req.params.search || 'all';
  if(search==='all')search='nasdaq'

  newsApi(search,'everything',(resp)=>{
    if(resp.error){
      return res.status(400).json(resp);
    }else{
      return res.status(200).json(resp);
    } 
  }) 
});



app.all("/spike-api/*", function(req, res) {
  return res.status(200).json({ success: true, message: 'accepted', response:true, query:req.url});
});

var authenticate = require('./lib/authenticate.js')(app, jwt, config);
authenticate.postAuth();
authenticate.AppUseAuth();


authenticate.allowedGet.map((item) => { /// this does th magic 
  app.use(`/${item}`, express.static(path.join(__dirname, config.PUBLIC + '/admin')));
})

////////////////////////// RUN THE APP
appRouter(app, routerApp,config,cors).init();

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
