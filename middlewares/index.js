var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app){

  app.disable('x-powered-by');
  if(process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

};