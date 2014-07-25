var express        = require('express');
var app            = express();
var hbs            = require('hbs');
var fs             = require('fs');
var favicon        = require('serve-favicon');
var cookieParser   = require('cookie-parser');
var cookieSession  = require('cookie-session');
var expressSession = require('express-session');

app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials('./views/partials');

app.use(express.static('./assets'));
app.use(cookieParser());
app.use(expressSession({secret: 'SEKR37' }));
app.use(favicon('./assets/images/favicon.ico'));

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    route.controller(app);
  }
});

var port = process.env.PORT || 3000;
app.listen(port);
