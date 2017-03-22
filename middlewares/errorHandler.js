module.exports = function(app){
  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    err = process.env.NODE_ENV === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err);
  });
};
