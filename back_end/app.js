let createError = require('http-errors');
let express = require('express');
let path = require('path');
require('./setup/connect_db')();
const cors = require('cors');

let indexRouter = require('./routes/index');
let app = express();

app.use(cors())

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// app.set('views', __dirname + '/views'); // general config
// app.set('view engine', 'html');


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
