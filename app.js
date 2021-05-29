var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser")
require('dotenv').config();

var authRouter = require('./routes/auth.route');
var usersRouter = require('./routes/users');
var centreformationRouter = require('./routes/centre_formation');
var formateurRouter =require('./routes/formateur');
var candidatRouter =require('./routes/candidat');
var adminRouter =require('./routes/admin');
var examenRouter = require('./routes/examen')
var formationRouter = require('./routes/formation')
var certificatRouter = require('./routes/certificat')
var evaluationRouter = require('./routes/evaluation')
var salleRouter= require('./routes/salle')
var contratformationRouter = require('./routes/Contrat_formation')
var contratformateurRouter = require('./routes/contrat_formateur')
//Instancier le serveur
var app = express();

//configuration de Body Parser
app.use(bodyParser.urlencoded({extended: true})); //pour forcer le parse dans le objects incluent dans d'autres 
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CROS VALIDATION HTTP HTTPS

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

//Configuration routes
app.use('/', authRouter);

app.use('/centre_formation', centreformationRouter);
app.use('/formateur', formateurRouter);
app.use('/candidat', candidatRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/examen', examenRouter);
app.use('/formation', formationRouter);
app.use('/certificat', certificatRouter);
app.use('/evaluation', evaluationRouter);
app.use('/salle',salleRouter)
app.use('/contrat_formation',contratformationRouter)
app.use('/contrat_formateur',contratformateurRouter)



//connection mongodb
mongoose.connect(process.env.DB_CONNECTION, 
{
  useNewUrlParser: true  ,
  useUnifiedTopology: true ,
  useCreateIndex: true
})
.then(() => {
  console.log('connected to db!');
  })
.catch((err) => {
  console.error('Error connecting to Mongo', err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = 5000
app.listen(port, () => console.log(`server started on port${port}`))
module.exports = app;