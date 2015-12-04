var render = require('./lib/render');

var fs = require('fs');
var parse = require('co-body');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-router');
var koa = require('koa');
var app = koa();

app.use(logger());
app.use(route(app));
app.use(serve(__dirname + '/public'));

/**
 * Index page
 */
app.get('/', function *(next) {
  var indexHTML = fs.readFileSync(__dirname + '/public/index.html', 'utf-8');

  this.body = indexHTML;
});

/**
 * Simple test for GET request
 */
app.get('/get-test', function *(next) {
  var data = {
    'title': 'Koa test application',
    'body': 'Hello World!'
  };

  this.body = data;
});

/**
 * Simple test for POST request
 */
app.post('/post-test', function *(next) {
  // parse POST request
  var body = yield parse.json(this);

  var data = {
    'title': body.title,
    'body' : body.body
  };

  this.body = data;
});

// app.get('/robo', function *(next) {
//   this.body = yield render('app');
// });

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening to %s', port);
