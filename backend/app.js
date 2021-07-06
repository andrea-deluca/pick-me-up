var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var tokenRouter = require('./routes/token');
var autenticazioneRouter = require('./routes/autenticazione');
var profiloRouter = require("./routes/profilo");
var walletRouter = require("./routes/wallet");
var patenteRouter = require("./routes/patente")
var prenotazioneRouter = require("./routes/prenotazione")
var gestionePrenotazioneRouter = require("./routes/gestionePrenotazione")
var gestioneMezziRouter = require("./routes/gestioneMezzi")
var gestioneImpiegatiRouter = require("./routes/gestioneImpiegati")
var gestioneUtentiRouter = require("./routes/gestioneUtenti")

var app = express();

// view engine setup 
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/token', tokenRouter);
app.use('/autenticazione', autenticazioneRouter);
app.use('/profilo', profiloRouter);
app.use('/wallet', walletRouter);
app.use('/patente', patenteRouter);
app.use('/prenotazione', prenotazioneRouter);
app.use('/gestione-prenotazione', gestionePrenotazioneRouter);
app.use('/gestione-mezzi', gestioneMezziRouter);
app.use('/gestione-impiegati', gestioneImpiegatiRouter);
app.use('/gestione-utenti', gestioneUtentiRouter);

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
  res.render('error');
});

module.exports = app;
