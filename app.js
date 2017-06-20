const EXPRESS = require('express');
const APP = EXPRESS();
const MORGAN = require('morgan');
const LOGGER = MORGAN('dev');
const NUNJUCKS = require('nunjucks');
const ROUTES = require('./routes');
const BODYPARSER = require('body-parser');

APP.set('view engine', 'html'); // have res.render work with html files
APP.engine('html', NUNJUCKS.render); // when giving html files to res.render, tell it to use nunjucks
NUNJUCKS.configure('views'); // point nunjucks to the proper directory for templates
// body parsing middleware
APP.use(BODYPARSER.urlencoded({ extended: true })); // for HTML form submits
APP.use(BODYPARSER.json()); // would be for AJAX requests

APP.use(EXPRESS.static('public'));

APP.get('/stylesheets/style.css', function(req, res, err) {
  res.sendFile('./public');
})
APP.use('/', ROUTES);




APP.listen(3000, function() {
  console.log('Twitter App is Listening on Port 3000');
});
